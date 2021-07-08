"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  mysqlQuery('SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act ORDER BY act.id DESC').then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getActivityNow = function (req, res) {
  mysqlQuery('SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act WHERE start_time < NOW() ORDER BY act.id DESC').then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getActivityComingSoon = function (req, res) {
  mysqlQuery('SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM `activity` as act WHERE start_time > NOW() ORDER BY act.id DESC').then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getActivityByMemberId = function (req, res) {
  mysqlQuery("SELECT *,act.id as act_id,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act JOIN join_activity ON join_activity.activity_id = act.id WHERE join_activity.member_id = ? AND join_activity.is_success = '0' ORDER BY act_id desc ", req.params.id).then(function (rows) {
    console.log(rows.length);
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getActivitySuccessByMemberId = function (req, res) {
  mysqlQuery("SELECT *,act.id as act_id,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act JOIN join_activity ON join_activity.activity_id = act.id WHERE join_activity.member_id = ? AND join_activity.is_success = '1'", req.params.id).then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.deleteActivity = function (req, res) {
  mysqlQuery('DELETE FROM join_activity WHERE id = ?', [req.params.id]).then(function (result) {
    if (result) {
      console.log('success');
    }

    res.end(JSON.stringify(result));
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
    where = "AND foundation = '".concat(foundation, "'");
  }

  var search = "name LIKE '%".concat(req.query.search ? req.query.search : '', "%'"); // mysqlQuery(`SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act WHERE ${search} ${where}`)

  mysqlQuery("SELECT * FROM activity WHERE ".concat(search, " ").concat(where)).then(function (rows) {
    res.send(rows);
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.getById = function (req, res) {
  mysqlQuery('SELECT *,( SELECT COUNT(id) FROM join_activity WHERE activity_id = act.id) as person FROM activity as act WHERE id = ?', req.params.id).then(function (rows) {
    res.end(JSON.stringify(rows[0]));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.create = function _callee(req, res) {
  var file, url, body;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          file = req.files.file;
          _context2.next = 3;
          return regeneratorRuntime.awrap(uploadImage.upload(file));

        case 3:
          url = _context2.sent;
          body = JSON.parse(req.body.body);
          body = _objectSpread({}, body, {}, {
            image: url
          });
          body.foundation = crypto.decrypt(body.foundation);
          mysqlQuery('INSERT INTO activity SET ?', body).then(function (rows) {
            res.end('last ID: ' + rows.insertId);
          })["catch"](function (err) {
            return setImmediate(function () {
              throw err;
            });
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.joinActivity = function (req, res) {
  var data = {
    activity_id: req.body.activity_id,
    member_id: parseInt(req.body.member_id)
  };
  mysqlQuery("SELECT id FROM join_activity WHERE activity_id = '".concat(data.activity_id, "' AND member_id = ").concat(data.member_id)).then(function (rows) {
    if (rows.length > 0) {
      res.send('เข้าร่วมแล้ว');
    } else {
      mysqlQuery('INSERT INTO join_activity SET ?', data).then(function (rows) {
        res.send('เข้าร่วมสำเร็จ');
      })["catch"](function (err) {
        return setImmediate(function () {
          res.send('ผิดพลาด');
        });
      });
    }
  })["catch"](function (err) {
    return setImmediate(function () {
      res.send('ผิดพลาด');
    });
  });
};

exports.edit = function _callee2(req, res) {
  var image_name, file, fileName, body, id, data;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          image_name = '';

          if (!(req.files != null)) {
            _context3.next = 7;
            break;
          }

          file = req.files.file;
          _context3.next = 5;
          return regeneratorRuntime.awrap(uploadImage.upload(file));

        case 5:
          fileName = _context3.sent;
          image_name = ", image = '".concat(fileName, "'");

        case 7:
          body = JSON.parse(req.body.data);
          id = req.params.id;
          data = [body.name, body.tel, body.start_time, body.end_time, body.person_max, body.location, body.description, body.admin_id, id];
          mysqlQuery("UPDATE activity SET name= ? ,tel= ? ,start_time= ? ,end_time= ? ,person_max= ? ,location= ? ,description= ? ,admin_id = ? ".concat(image_name, " WHERE id = ?"), data).then(function (rows) {
            res.send(true); // res.end(JSON.stringify(rows));
          })["catch"](function (err) {
            return setImmediate(function () {
              throw err;
            });
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports["delete"] = function (req, res) {
  mysqlQuery('DELETE FROM activity WHERE id = ?', req.params.id).then(function (result) {
    res.end(JSON.stringify(result));
  })["catch"](function (err) {
    return setImmediate(function () {
      throw err;
    });
  });
};

exports.upload = function (req, res) {
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file was uploaded'
    });
  }

  var file = req.files.file;
  uploadImage.uploadToS3(file); // file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
  //     if (err) {
  //         console.error(err);
  //         return res.status(500).send(err);
  //     }
  //     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  // });
};