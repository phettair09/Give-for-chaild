"use strict";

var mysql = require('mysql');

var connection = require('../condb');

var uploadImage = require('./upload-image');

var mailer = require('./mailer');

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
  mysqlQuery('SELECT * FROM member').then(function (rows) {
    res.end(JSON.stringify(rows));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getById = function (req, res) {
  mysqlQuery('SELECT * FROM member WHERE id = ?', req.params.id).then(function (rows) {
    res.end(JSON.stringify(rows[0]));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.register = function (req, res) {
  mysqlQuery('INSERT INTO member SET ?', req.body).then(function (rows) {
    // res.end(JSON.stringify(row));
    res.end('last ID: ' + rows.insertId);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.login = function (req, res) {
  console.log('asdasd');
  var sub_line_id = req.body.sub_line_id;
  console.log(sub_line_id);
  mysqlQuery('SELECT * FROM member WHERE sub_line_id = ?', [sub_line_id]).then(function (rows) {
    if (rows[0]) {
      console.log('old');
      var data = [req.body.img, req.body.sub_line_id];
      mysqlQuery('UPDATE member SET img = ? WHERE sub_line_id = ?', data);
      res.send({
        id: rows[0].id,
        name: req.body.name,
        img: req.body.img
      });
    } else {
      console.log('new account');
      var _data = {
        sub_line_id: req.body.sub_line_id,
        img: req.body.img,
        name: req.body.name
      };
      mysqlQuery('INSERT INTO member SET ?', _data).then(function (rows) {
        res.send({
          id: rows[0].insertId,
          name: req.body.name,
          img: req.body.img
        });
      })["catch"](function (err) {
        return setImmediate(function () {
          throw err;
        });
      });
    }
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.loginAdmin = function (req, res) {
  var account = req.body;
  mysqlQuery("SELECT * FROM admin WHERE username = '".concat(account.username, "' AND password = '").concat(account.password, "'")).then(function (rows) {
    if (rows[0]) {
      res.send(rows[0]);
    } else {
      res.send('Not found');
    }
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.edit = function (req, res) {
  var body = req.body;
  var id = req.params.id;
  var data = [body.username, body.password, body.name, id];
  mysqlQuery('UPDATE member SET username = ?, password = ?, name = ? WHERE id = ?', data).then(function (rows) {
    // res.send(true);
    res.end(JSON.stringify(rows));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports["delete"] = function (req, res) {
  mysqlQuery('DELETE FROM member WHERE id = ?', req.params.id).then(function (result) {
    res.end(JSON.stringify(result));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.upload = function _callee(req, res) {
  var file, result;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          file = req.files.file;

          if (!(req.files === null)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'No file was uploaded'
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(uploadImage.upload(file));

        case 5:
          result = _context2.sent;
          return _context2.abrupt("return", res.send(result));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.mailer = function (req, res) {
  mailer.SendEmail('mick.skyd@gmail.com', 'asdhawiudhoawhdo;iawhd');
  res.json('asdoahosdh');
};