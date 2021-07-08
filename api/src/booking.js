const moment = require('moment');
var mysql = require('mysql');
var connection = require('../condb');
const uploadImage = require('./upload-image');
const crypto = require('./cypto');

const BANQUET = 'เลี้ยงอาหารเด็ก';
const REQUEST = 'จัดหาให้';
const BYMYSELF = 'นำมาเอง';

async function mysqlQuery(query, req) {
    return new Promise(function (resolve, reject) {
        connection.query(query, req, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

exports.getAll = (req, res) => {
    mysqlQuery('SELECT * FROM booking')
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getById = (req, res) => {
    mysqlQuery('SELECT * FROM booking WHERE id = ?', req.params.id)
        .then(function (rows) {
            res.end(JSON.stringify(rows[0]));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};


exports.sendMail = (req, res) => {
    console.log('sendmail');
    mysqlQuery("SELECT * FROM `booking` INNER JOIN member ON member.id = booking.member_id WHERE date <= NOW() AND date > NOW() - INTERVAL 1 DAY")
        .then(function (rows) {
            rows.forEach(row => {
                console.log('send:'+ row.name + ':' + row.email);
                const subject = 'การจองของคุณ' + row.name + 'ได้มาถึงแล้ว'; 
                const message = 'คุณได้จองการ ' + row.category + 'ที่มูลนิธิ' +row.foundation + ' เวลานัดหมาย :' + row.date ;
                mailer.SendEmail(row.email, subject,message);
            });
            res.send(true);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
}


exports.getByFoundation = (req, res) => {
    let where = ``;
    const foundation = crypto.decrypt(req.body.foundation);
    if (foundation != 'admin') {
        where = `AND foundation = '${foundation}'`;
    }
    let search = `booking.name LIKE '%${req.body.search ? req.body.search : ''}%'`;
    mysqlQuery(
        `SELECT *,booking.id as booking_id,booking.name as booking_name,member.name as member_name FROM booking 
        INNER JOIN member ON member.id = booking.member_id 
        LEFT JOIN banquet ON booking.id = banquet.booking_id
        WHERE ${search} ${where}`,
    )
        .then(function (rows) {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getByMemberId = (req, res) => {
    mysqlQuery("SELECT * FROM booking WHERE member_id = ? AND is_success = '0'", req.params.id)
        .then(function (rows) {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getSuccessByMemberId = (req, res) => {
    mysqlQuery("SELECT * FROM booking WHERE member_id = ? AND is_success = '1'", req.params.id)
        .then(function (rows) {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.create = async (req, res) => {
    let body = JSON.parse(req.body.data);
    const data = {
        member_id: body.member_id,
        foundation: body.foundation,
        category: body.category,
        option: body.option,
        name: body.name,
        tel: body.tel,
        date: body.date,
        description: body.description,
    };
    let file_name = '';
    if (body.option == REQUEST) {
        const file = req.files.file;
        file_name = await uploadImage.upload(file);
    }

    mysqlQuery('INSERT INTO booking SET ?', data)
        .then(function (rows) {
            if (body.category === BANQUET) {
                const bookingId = rows.insertId;

                const banquet = {
                    duration: body.duration,
                    budget: body.budget,
                    slip: file_name,
                    booking_id: bookingId,
                };
                mysqlQuery('INSERT INTO banquet SET ?', banquet)
                    .then(function (rows) {})
                    .catch((err) =>
                        setImmediate(() => {
                            throw err;
                        }),
                    );
            }
            res.end('last ID: ' + rows.insertId);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.edit = (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let data = [
        body.id_foundation,
        body.id_category,
        body.datetime,
        body.id_option,
        body.description,
        body.tel,
        body.sub_line_id,
        id,
    ];

    mysqlQuery(
        'UPDATE booking SET id_foundation= ? ,id_category= ? ,datetime= ?  ,id_option= ? ,description= ?,sub_line_id= ?,tel= ? , WHERE id = ?',
        data,
    )
        .then(function (rows) {
            // res.send(true);
            res.end(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.setSuccess = (req, res) => {
    const id = req.params.id;

    mysqlQuery("UPDATE booking SET is_success = '1' WHERE id = ?", [id])
        .then(function (rows) {
            res.send(true);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.delete = (req, res) => {
    mysqlQuery('DELETE FROM booking WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};
