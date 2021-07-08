var mysql = require('mysql');
var connection = require('../condb');
const uploadImage = require('./upload-image');
const crypto = require('./cypto');
const mailer = require('./mailer');

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
    mysqlQuery('SELECT * FROM join_activity')
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
    mysqlQuery('SELECT * FROM join_activity WHERE id = ?', req.params.id)
        .then(function (rows) {
            res.end(JSON.stringify(rows[0]));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getByFoundation = (req, res) => {
    let where = ``;
    const foundation = crypto.decrypt(req.body.foundation);
    if (foundation != 'admin') {
        where = `AND foundation = '${foundation}'`;
    }
    let search = `member.name LIKE '%${req.body.search ? req.body.search : ''}%'`;

    mysqlQuery(
        `SELECT *, member.name as member_name,activity.name as activity_name,join_activity.id as join_id FROM join_activity INNER JOIN activity ON activity.id = join_activity.activity_id INNER JOIN foundation ON foundation.name = activity.foundation INNER JOIN member ON member.id = join_activity.member_id WHERE ${search} ${where} `,
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
    mysqlQuery("SELECT * FROM join_activity WHERE member_id = ? AND is_success = '0'", req.params.id)
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
    mysqlQuery("SELECT * FROM join_activity WHERE member_id = ? AND is_success = '1'", req.params.id)
        .then(function (rows) {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.sendMail = (req, res) => {
    console.log('sendmail');
    mysqlQuery("SELECT *,ac.name as activity_name,member.name as member_name FROM `activity` as `ac` INNER JOIN join_activity as `jc` ON jc.activity_id = ac.id INNER JOIN member ON member.id = jc.member_id WHERE ac.start_time < NOW() AND ac.end_time < NOW()")
        .then(function (rows) {
            rows.forEach(row => {
                console.log('send:'+ row.member_name + ':' + row.email);
                const subject = 'กิจกรรม' + row.activity_name + 'ได้มาถึงแล้ว';
                const message = 'จากมูลนิธิ ' + row.foundation + ' เวลานัดหมาย :' + row.start_time + ' ถึง ' + row.end_time;
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

exports.create = (req, res) => {
    mysqlQuery('INSERT INTO join_activity SET ?', req.body)
        .then(function (rows) {
            return res.send('เรียบร้อย')
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
    let data = [body.activity_id, body.member_id, id];

    mysqlQuery('UPDATE join_activity SET 	activity_id= ? ,	member_id= ?  WHERE id = ?', data)
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
    console.log(id);
    mysqlQuery("UPDATE join_activity SET is_success = '1' WHERE id = ?", [id])
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
    console.log('delete');
    mysqlQuery('DELETE FROM join_activity WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};
