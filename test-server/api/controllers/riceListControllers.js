'use strict';

var mongoose = require('mongoose'),
    Rice = mongoose.model('Rice');

exports.list_rice_items = function (_req, res) {
    Rice.find({get_type:"rice"}, function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.create_rice_item = function (req, res) {
    var new_item = new Rice(req.body);
    new_item.save(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.change_status = function (req, res) {
    Rice.findByIdAndUpdate(req.body.ids, { status: req.body.stat, sold_to_whom: req.body.stat1 },function (err, docs) {
    if (err){
        res.send(err)
    }
    else{
        res.json(docs);
    }})};

exports.delete_item = function (req, res) {
    Rice.findByIdAndDelete(req.body.data, function (err, docs) {
    if (err){
        res.send(err)
    }
    else{
        res.json(docs);
    }})};