var mysql = require('mysql');
var connection = require('../condb');
const uploadImage = require('./upload-image');
const crypto = require('./cypto');

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
    mysqlQuery(
        'SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act ORDER BY act.id DESC',
    )
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getActivityNow = (req, res) => {
    mysqlQuery(
        'SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act WHERE start_time < NOW() ORDER BY act.id DESC',
    )
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.gethome = (req, res) => {
    mysqlQuery(
        'SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act WHERE start_time < NOW() ORDER BY act.id DESC LIMIT 3',
    )
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};



exports.getActivityComingSoon = (req, res) => {
    mysqlQuery(
        'SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act WHERE start_time > NOW() ORDER BY act.id DESC',
    )
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getActivityByMemberId = (req, res) => {
    mysqlQuery(
        "SELECT *,act.id as act_id,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act JOIN join_activity ON join_activity.activity_id = act.id WHERE join_activity.member_id = ? AND join_activity.is_success = '0' ORDER BY act_id desc ",
        req.params.id,
    )
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getActivitySuccessByMemberId = (req, res) => {
    mysqlQuery(
        "SELECT *,act.id as act_id,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act JOIN join_activity ON join_activity.activity_id = act.id WHERE join_activity.member_id = ? AND join_activity.is_success = '1'",
        req.params.id,
    )
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.deleteActivity = (req, res) => {
    mysqlQuery('DELETE FROM join_activity WHERE id = ?', [req.params.id])
        .then(function (result) {
            if (result) {
                console.log('success');
            }
            res.end(JSON.stringify(result));
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
    let search = `name LIKE '%${req.body.search ? req.body.search : ''}%'`;
    
    mysqlQuery(`SELECT * FROM activity WHERE ${search} ${where}`)
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
    mysqlQuery(
        'SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act WHERE id = ?',
        req.params.id,
    )
        .then(function (rows) {
            res.end(JSON.stringify(rows[0]));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.create = async (req, res) => {
    const file = req.files.file;

    let url = await uploadImage.upload(file);
    let body = JSON.parse(req.body.body);
    body = { ...body, ...{ image: url } };
    body.foundation = crypto.decrypt(body.foundation);
    mysqlQuery('INSERT INTO activity SET ?', body)
        .then(function (rows) {
            res.end('last ID: ' + rows.insertId);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.joinActivity = (req, res) => {
    const data = {
        activity_id: req.body.activity_id,
        member_id: parseInt(req.body.member_id),
    };
    console.log(data);
    mysqlQuery(
        `SELECT id FROM join_activity WHERE activity_id = '${data.activity_id}' AND member_id = ${data.member_id}`,
    )
        .then(function (rows) {
            if (rows.length > 0) {
                res.send('เข้าร่วมแล้ว');
            } else {
                mysqlQuery('INSERT INTO join_activity SET ?', data)
                    .then(function (rows) {
                        res.send('เข้าร่วมสำเร็จ');
                    })
                    .catch((err) =>
                        setImmediate(() => {
                            res.send('ผิดพลาด');
                        }),
                    );
            }
        })
        .catch((err) =>
            setImmediate(() => {
                res.send('ผิดพลาด');
            }),
        );
};

exports.edit = async (req, res) => {
    let image_name = '';

    if (req.files != null) {
        const file = req.files.file;
        let fileName = await uploadImage.upload(file);
        image_name = `, image = '${fileName}'`;
    }

    const body = JSON.parse(req.body.data);
    const id = req.params.id;

    let data = [
        body.name,
        body.tel,
        body.start_time,
        body.end_time,
        body.person_max,
        body.location,
        body.description,
        body.admin_id,
        id,
    ];
    mysqlQuery(
        `UPDATE activity SET name= ? ,tel= ? ,start_time= ? ,end_time= ? ,person_max= ? ,location= ? ,description= ? ,admin_id = ? ${image_name} WHERE id = ?`,
        data,
    )
        .then(function (rows) {
            res.send(true);
            // res.end(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.delete = (req, res) => {
    mysqlQuery('DELETE FROM activity WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.upload = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;
    uploadImage.uploadToS3(file);
    // file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    // });
};
