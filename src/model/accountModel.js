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
    authGoogleId: {
        type: String,
        default: null
    },
    authFacebookId: {
        type: String,
        default: null
    },
    authType: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
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