const async = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

// var port = process.env.PORT || 8080;
var port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    console.log('Server running');
});
// app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const member = require('./src/member');
app.post('/member/login-admin', member.loginAdmin);
app.get('/members', urlencodedParser, member.getAll);
app.get('/member/:id', member.getById);
app.post('/register', urlencodedParser, member.register);
app.post('/login', urlencodedParser, member.login);
app.put('/member/:id', urlencodedParser, member.edit);
app.delete('/member/:id', urlencodedParser, member.delete);
app.post('/upload', urlencodedParser, member.upload);
app.get('/member/mailer/send', urlencodedParser, member.mailer);
app.post('/member/uploadtest/asdasd', urlencodedParser, member.upload);

const activity = require('./src/activity');
app.post('/join-activity', activity.joinActivity);
app.get('/activities', activity.getAll);
app.get('/activities/now', activity.getActivityNow);
app.get('/activities/coming-soon', activity.getActivityComingSoon);

app.get('/activities', activity.getAll);
app.post('/activities/foundation/', activity.getByFoundation);
app.get('/activity/:id', activity.getById);
app.post('/activity', urlencodedParser, activity.create);
app.get('/activity-home', urlencodedParser, activity.gethome);
app.put('/activity/:id', urlencodedParser, activity.edit);
app.delete('/activity/:id', urlencodedParser, activity.delete);
app.get('/activity/member/:id', activity.getActivityByMemberId);
app.get('/activity/member/success/:id', activity.getActivitySuccessByMemberId);
app.delete('/activity/member/:id', activity.deleteActivity);

const donate = require('./src/donation');
app.get('/donates', donate.getAll);
app.get('/donation/sendmail', donate.sendMail);
app.get('/donation/:id', donate.getById);
app.get('/donation/member/:id', donate.getByMemberId);
app.get('/donation/member/success/:id', donate.getSuccessByMemberId);
app.post('/donation/foundation/', donate.getByFoundation);
app.post('/donation', urlencodedParser, donate.create);
app.put('/donation/:id', urlencodedParser, donate.edit);
app.put('/donation/success/:id', urlencodedParser, donate.setSuccess);
app.delete('/donation/:id', urlencodedParser, donate.delete);

const join_activity = require('./src/join_activity');
app.get('/join_activity', join_activity.getAll);
app.get('/join_activity/sendmail', join_activity.sendMail);
app.get('/join_activity/:id', join_activity.getById);
app.post('/join_activity/foundation/', join_activity.getByFoundation);
app.post('/join_activity', urlencodedParser, join_activity.create);
app.put('/join_activity/:id', urlencodedParser, join_activity.edit);
app.put('/join_activity/success/:id', urlencodedParser, join_activity.setSuccess);
app.delete('/join_activity/:id', urlencodedParser, join_activity.delete);

const booking = require('./src/booking');
app.get('/booking', booking.getAll);
app.get('/booking/sendmail', booking.sendMail);
app.get('/booking/:id', booking.getById);
app.post('/booking/foundation/', booking.getByFoundation);
app.get('/booking/member/:id', booking.getByMemberId);
app.get('/booking/member/success/:id', booking.getSuccessByMemberId);
app.post('/booking', urlencodedParser, booking.create);
app.put('/booking/success/:id', urlencodedParser, booking.setSuccess);
app.put('/booking/:id', urlencodedParser, booking.edit);
app.delete('/booking/:id', urlencodedParser, booking.delete);

const foundation = require('./src/foundation');
app.get('/foundation', foundation.getAll);
app.get('/foundation-list', foundation.getList);
app.get('/foundation/:foundation', foundation.getById);
app.post('/foundation', urlencodedParser, foundation.create);
app.put('/foundation/:id', urlencodedParser, foundation.edit);
app.delete('/foundation/:id', urlencodedParser, foundation.delete);

const admin = require('./src/admin');
app.get('/admin', admin.getAll);
app.get('/admin/:id', admin.getById);
app.get('/admin/foundation/:foundation', admin.getByFoundation);
app.post('/admin', urlencodedParser, admin.create);
app.post('/admin/login', urlencodedParser, admin.login);
app.put('/admin/:id', urlencodedParser, admin.edit);
app.delete('/admin/:id', urlencodedParser, admin.delete);

const foundationCat = require('./src/foundation-catagory');
app.get('/foundation-catagory', foundationCat.getAll);
app.get('/foundation-catagory/:name', foundationCat.getById);
app.post('/foundation-catagory', urlencodedParser, foundationCat.create);
app.put('/foundation-catagory/:id', urlencodedParser, foundationCat.edit);
app.delete('/foundation-catagory/:id', urlencodedParser, foundationCat.delete);

const foundationOp = require('./src/foundation-option');
app.get('/foundation-option', foundationOp.getAll);
app.get('/foundation-option/:name', foundationOp.getById);
app.post('/foundation-option', urlencodedParser, foundationOp.create);
app.put('/foundation-option/:id', urlencodedParser, foundationOp.edit);
app.delete('/foundation-option/:id', urlencodedParser, foundationOp.delete);

app.get('/testcre', foundationOp.testCre);
