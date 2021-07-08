"use strict";

var base64 = require('base-64');

var utf8 = require('utf8');

exports.encrypt = function (text) {
  var bytes = utf8.encode(text);
  var encoded = base64.encode(bytes);
  return encoded;
};

exports.decrypt = function (encoded) {
  var bytes = base64.decode(encoded);
  var text = utf8.decode(bytes);
  return text;
};