// const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
var Client = require('ftp');
const fs = require('fs');

// const BUCKET_NAME = 'give-for-child';
// const IAM_USER_KEY = 'AKIAJROEPUJ26JSNWGBQ';
// const IAM_USER_SECRET = '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';

exports.upload = async (file) => {
    const fileName = uuidv4() + '.jpg';
    const filePath = `${__dirname}/temp/${fileName}`;
    var c = new Client();
    return new Promise((resolve, reject) => {
            // file.mv(filePath, (err) => {
            //     if (err) reject(err);
            //     c.on('ready', () => {
            //         c.put(filePath, `/uploads/${fileName}`, (err) => {
            //             fs.unlink(filePath, () => {
            //                 console.log('upload & unlink success.');
            //             });
            //             if (err) reject(err);
            //             c.end();
            //             resolve(true);
            //         });
            //     });
            //     c.connect({
            //         host: 'web3.vpsthai.net',
            //         user: 'give-child@aowdtech.com',
            //         password: 'asdasd',
            //     });
            // });
        // });

        file.mv(`../give-for-child/public/resources/uploads/${fileName}`, (err) => {
            if (err) reject(err);
            resolve(fileName);
        });
    });
};

// exports.uploadToS3 = async (file) => {
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
