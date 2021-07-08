var mysql = require('mysql');
var connection = require('../condb');
const uploadImage = require('./upload-image');
const crypto = require('./cypto');

const moment = require('moment');

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
    mysqlQuery('SELECT * FROM foundation ORDER BY id DESC')
        .then((rows) => {
            res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.getList = (req, res) => {
    mysqlQuery('SELECT id,name FROM foundation')
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
    let foundation = crypto.decrypt(req.params.foundation);
    foundation = foundation == 'admin' ? '': `WHERE name = '${foundation}'`;
    mysqlQuery(`SELECT * FROM foundation ${foundation}`)
        .then(function (rows) {
            return res.send(rows);
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.create = async (req, res) => {
    const file = req.files.file;
    let file_name = await uploadImage.upload(file);
    const body = JSON.parse(req.body.data);
    let data = {
        name: body.name,
        url: body.url,
        address: body.address,
        img: file_name,
    };
    await mysqlQuery('INSERT INTO foundation SET ?', data)
        .then(function (rows) {
            res.send({ id: rows.insertId });
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
        'UPDATE foundation SET id_foundation= ? ,id_category= ? ,datetime= ?  ,id_option= ? ,description= ?,sub_line_id= ?,tel= ? , WHERE id = ?',
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

exports.delete = (req, res) => {
    mysqlQuery('DELETE FROM foundation WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};
