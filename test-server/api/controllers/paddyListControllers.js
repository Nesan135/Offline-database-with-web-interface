'use strict';

var mongoose = require('mongoose'),
    Paddy = mongoose.model('Paddy');

exports.list_paddy_items = function (_req, res) {
    Paddy.find({get_type:"paddy"}, function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.create_paddy_item = function (req, res) {
    var new_item = new Paddy(req.body);
    new_item.save(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.change_status = function (req, res) {
    Paddy.findByIdAndUpdate(req.body.ids, { status: req.body.stat },function (err, docs) {
    if (err){
        res.send(err)
    }
    else{
        res.json(docs);
    }})};

exports.delete_item = function (req, res) {
    Paddy.findByIdAndDelete(req.body.data, function (err, docs) {
    if (err){
        res.send(err)
    }
    else{
        res.json(docs);
    }})};