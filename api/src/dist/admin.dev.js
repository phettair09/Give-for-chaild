"use strict";

var mysql = require('mysql');

var connection = require('../condb');

var uploadImage = require('./upload-image');

var crypto = require('./cypto');

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
  mysqlQuery('SELECT * FROM admin').then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getById = function (req, res) {
  mysqlQuery('SELECT * FROM admin WHERE id = ?', req.params.id).then(function (rows) {
    res.end(JSON.stringify(rows[0]));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getByFoundation = function (req, res) {
  var where = "";
  var foundation = crypto.decrypt(req.params.foundation);

  if (foundation != 'admin') {
    where = 'AND foundation = ?';
  }

  mysqlQuery("SELECT * FROM admin WHERE foundation != 'admin' ".concat(where), foundation).then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.create = function (req, res) {
  mysqlQuery('INSERT INTO admin SET ?', req.body).then(function (rows) {
    // res.end(JSON.stringify(row));
    res.end('last ID: ' + rows.insertId);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.login = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  mysqlQuery('SELECT * FROM admin WHERE username = ? AND password = ? LIMIT 1', [username, password]).then(function (rows) {
    var data = rows[0];
    console.log(data);
    data['foundation'] = crypto.encrypt(data.foundation);
    res.send(data);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.edit = function (req, res) {
  var body = req.body;
  var id = req.params.id;
  var data = [body.id_foundation, body.id_category, body.datetime, body.id_option, body.description, body.tel, body.sub_line_id, id];
  mysqlQuery('UPDATE admin SET id_foundation= ? ,id_category= ? ,datetime= ?  ,id_option= ? ,description= ?,sub_line_id= ?,tel= ? , WHERE id = ?', data).then(function (rows) {
    // res.send(true);
    res.end(JSON.stringify(rows));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports["delete"] = function (req, res) {
  mysqlQuery('DELETE FROM admin WHERE id = ?', req.params.id).then(function (result) {
    res.end(JSON.stringify(result));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};