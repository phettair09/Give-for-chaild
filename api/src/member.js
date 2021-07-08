var mysql = require('mysql');
var connection = require('../condb');
const uploadImage = require('./upload-image');
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
    mysqlQuery('SELECT * FROM member')
        .then((rows) => {
            res.end(JSON.stringify(rows));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getById = (req, res) => {
    mysqlQuery('SELECT * FROM member WHERE id = ?', req.params.id)
        .then(function (rows) {
            res.end(JSON.stringify(rows[0]));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.register = (req, res) => {
    mysqlQuery('INSERT INTO member SET ?', req.body)
        .then(function (rows) {
            // res.end(JSON.stringify(row));
            res.end('last ID: ' + rows.insertId);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};



exports.login = (req, res) => {
    const sub_line_id = req.body.sub_line_id;
    
    mysqlQuery('SELECT * FROM member WHERE sub_line_id = ?', [sub_line_id])
        .then(function (rows) {
            if (rows[0]) {
                console.log('old');
                let data = [req.body.img, req.body.sub_line_id];
                mysqlQuery('UPDATE member SET img = ? WHERE sub_line_id = ?', data);
                res.send({
                    id: rows[0].id,
                    name: req.body.name,
                    img: req.body.img,
                });
            } else {
                console.log('new account');
                const data = {
                    sub_line_id: req.body.sub_line_id,
                    img: req.body.img,
                    name: req.body.name,
                    email: req.body.email,
                };
                mysqlQuery('INSERT INTO member SET ?', data)
                    .then(function (rows) {
                        res.send({
                            id: rows.insertId,
                            name: req.body.name,
                            img: req.body.img,
                        });
                    })
                    .catch((err) =>
                        setImmediate(() => {
                            throw err;
                        }),
                    );
            }
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.loginAdmin = (req, res) => {
    const account = req.body;

    mysqlQuery(`SELECT * FROM admin WHERE username = '${account.username}' AND password = '${account.password}'`)
        .then(function (rows) {
            if (rows[0]) {
                res.send(rows[0]);
            } else {
                res.send('Not found');
            }
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
    let data = [body.username, body.password, body.name, id];

    mysqlQuery('UPDATE member SET username = ?, password = ?, name = ? WHERE id = ?', data)
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

exports.delete = (req, res) => {
    mysqlQuery('DELETE FROM member WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.upload = async (req, res) => {
    const file = req.files.file;

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }
    var result = await uploadImage.upload(file);
    return res.send(result);
};

exports.mailer = (req, res) => {
    mailer.SendEmail('mick.skyd@gmail.com', 'asdhawiudhoawhdo;iawhd');
    res.json('asdoahosdh');
};
