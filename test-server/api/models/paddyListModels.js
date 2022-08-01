'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaddySchema = new Schema({
    weight: {
        required:true,
        trim:true,
        type: Number
    },
    number_of_bags: {
        required:true,
        trim:true,
        type: Number
    },
    paddy_type: {
        required:true,
        trim:true,
        type: String
    },
    order_type: {
        required:true,
        trim:true,
        type: String
    },
    cost: {
        required:true,
        trim:true,
        type: Number
    },
    rate: {
        required:true,
        trim:true,
        type: Number
    },
    sale: {
        required:true,
        trim:true,
        type: Number
    },
    tag: {
        required:true,
        type: Array
    },
    status: {
        required:true,
        trim:true,
        type: String
    },
    supplier: {
        required:true,
        trim:true,
        type: String
    },
    get_type:{
        type: String,
        
        default:'paddy'
    }
});

module.exports = mongoose.model('Paddy', PaddySchema);