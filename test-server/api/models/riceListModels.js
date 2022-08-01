'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RiceSchema = new Schema({
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
    rice_type: {
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
        
        default:'rice'
    },
    sold_to_whom:{
        type: String,
        required:false,
        default:'Not yet sold'
    }
});

module.exports = mongoose.model('Rice', RiceSchema);