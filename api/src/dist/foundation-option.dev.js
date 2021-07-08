"use strict";

var mysql = require('mysql');

var connection = require('../condb');

var moment = require('moment');

function mysqlQuery(query, req) {
  return regeneratorRuntime.async(function mysqlQuery$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            connection.query(query, req, function (err, rows, fields) {
              if (err) {
                return reject(err);
              }

              resolve(rows);
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

exports.getAll = function (req, res) {
  mysqlQuery('SELECT * FROM fou_option ORDER BY id DESC').then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getById = function (req, res) {
  mysqlQuery('SELECT * FROM fou_option WHERE fou_cat_name = ? ORDER BY id DESC', req.params.name).then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.create = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mysqlQuery('INSERT INTO fou_option SET ?', req.body).then(function (rows) {
            // res.end(JSON.stringify(row));
            res.send({
              id: rows.insertId
            });
          })["catch"](function (err) {
            return setImmediate(function () {
              throw err;
            });
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.edit = function (req, res) {
  var body = req.body;
  var id = req.params.id;
  var data = [body.name, id];
  mysqlQuery('UPDATE fou_option SET name = ? WHERE id = ?', data).then(function (rows) {
    // res.send(true);
    res.end(JSON.stringify(rows));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports["delete"] = function (req, res) {
  mysqlQuery('DELETE FROM fou_option WHERE id = ?', req.params.id).then(function (result) {
    res.end(JSON.stringify(result));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.testCre = function (req, res) {
  var sql = 'INSERT INTO aaa (id, name) VALUES ?';
  var values = [['1', 'demian@gmail.com'], ['2', 'john@gmail.com'], ['3', 'mark@gmail.com'], ['4', 'pete@gmail.com']];
  var result = new Promise(function (resolve, reject) {
    connection.query(sql, [values], function (err, rows) {
      if (err) {
        return reject(err);
      }

      resolve(rows);
    });
  });
  res.send(result);
};