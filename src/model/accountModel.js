const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = require('../helper/connect_mongodb')


const AcountSchema = new Schema({
    id: {
        type: String,
        default: null
    },
    username: String,
    password: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    }
},
    {
        collection: 'account'
    })

const AcountModel = conn.model('account', AcountSchema)

module.exports = { AcountModel };