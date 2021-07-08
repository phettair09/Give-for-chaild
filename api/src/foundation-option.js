var mysql = require('mysql');
var connection = require('../condb');
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
    mysqlQuery('SELECT * FROM fou_option ORDER BY id DESC')
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
    mysqlQuery('SELECT * FROM fou_option WHERE fou_cat_name = ? ORDER BY id DESC', req.params.name)
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
    mysqlQuery('INSERT INTO fou_option SET ?', req.body)
        .then(function (rows) {
            // res.end(JSON.stringify(row));
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
    let data = [body.name, id];

    mysqlQuery('UPDATE fou_option SET name = ? WHERE id = ?', data)
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
    mysqlQuery('DELETE FROM fou_option WHERE id = ?', req.params.id)
        .then(function (result) {
            res.end(JSON.stringify(result));
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            }),
        );
};

exports.testCre = (req, res) => {
    var sql = 'INSERT INTO aaa (id, name) VALUES ?';
    var values = [
        ['1', 'demian@gmail.com'],
        ['2', 'john@gmail.com'],
        ['3', 'mark@gmail.com'],
        ['4', 'pete@gmail.com'],
    ];
    let result = new Promise(function (resolve, reject) {
        connection.query(sql, [values], function (err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
    res.send(result);
};
