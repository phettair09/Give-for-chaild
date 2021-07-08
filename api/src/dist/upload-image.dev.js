"use strict";

// const AWS = require('aws-sdk');
var _require = require('uuid'),
    uuidv4 = _require.v4;

var Client = require('ftp');

var fs = require('fs'); // const BUCKET_NAME = 'give-for-child';
// const IAM_USER_KEY = 'AKIAJROEPUJ26JSNWGBQ';
// const IAM_USER_SECRET = '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';


exports.upload = function _callee(file) {
  var fileName, filePath, c;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fileName = uuidv4() + '.jpg';
          filePath = "".concat(__dirname, "/temp/").concat(fileName);
          c = new Client();
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            //     file.mv(filePath, (err) => {
            //         if (err) reject(err);
            //         c.on('ready', () => {
            //             c.put(filePath, `/uploads/${fileName}`, (err) => {
            //                 fs.unlink(filePath, () => {
            //                     console.log('upload & unlink success.');
            //                 });
            //                 if (err) reject(err);
            //                 c.end();
            //                 resolve(true);
            //             });
            //         });
            //         c.connect({
            //             host: 'web3.vpsthai.net',
            //             user: 'give-child@aowdtech.com',
            //             password: 'asdasd',
            //         });
            //     });
            // });
            file.mv("C:/Users/micky/Desktop/Thesis all/real/give-for-child/public/resources/uploads/".concat(fileName), function (err) {
              if (err) reject(err);
              resolve(fileName);
            });
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // exports.uploadToS3 = async (file) => {
//     const file_name = uuidv4() + '.jpg';
//     let s3bucket = new AWS.S3({
//         accessKeyId: IAM_USER_KEY,
//         secretAccessKey: IAM_USER_SECRET,
//         Bucket: BUCKET_NAME,
//     });
//     var params = {
//         Bucket: BUCKET_NAME,
//         Key: file_name,
//         Body: file.data,
//         ACL: 'public-read',
//     };
//     return new Promise(function (resolve, reject) {
//         s3bucket.upload(params, function (err, data) {
//             if (err) {
//                 throw err;
//             } else {
//                 resolve(data.Location);
//             }
//         });
//     });
// };