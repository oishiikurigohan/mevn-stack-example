var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var user = require('./userModel');

var app = express();
var config = require('./config.json')[app.get('env')];

// connecting mongoDB
var mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    user: config.user,
    pass: config.pass,
    dbName: config.dbName
};

mongoose.connect(config.uri, mongoOptions)
    .then(() => {
        console.log("successfully connected to the database.");
    })
    .catch((err) => {
        console.log("error connecting to the database.");
        console.log(err);
        process.exit();
    });

app.use(bodyParser.json());

// routing
// 全件取得
app.get('/api/cat/all', function (req, res) {
    user.find({}, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// idで1件取得
app.post('/api/cat/get', function (req, res) {
    user.findById(req.body.id, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// 追加(複数可)
app.put('/api/cat/create', function (req, res) {
    user.create(req.body, function(err, result) {
        if (err) throw err;
        console.log(req.body.id + ': successfully created.');
        res.json(result);
    });
});

// idで1件更新
app.put('/api/cat/update', function (req, res) {
    user.findByIdAndUpdate(req.body._id, req.body, {"new": true}, function(err, result) {
        if (err) throw err;
        console.log(req.body.id + ': successfully updated.');
        res.json(result);
    });
});

// idで1件削除
app.delete('/api/cat/delete', function (req, res) {
    user.findByIdAndDelete(req.body.id, function(err, result) {
        if (err) throw err;
        console.log(req.body.id + ': successfully deleted.');
        res.json(result);
    });
});

app.listen(3000);
