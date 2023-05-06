const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGODB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
conn.on('connected', function () {
    console.log('mongodb:::: connected to ', this.name)
});
conn.on('disconnected', function () {
    console.log('monodb:::: disconnected');
});
conn.on('eror', function () {
    console.log('mongodb:::: error')
});
process.on('SIGNT', async () => {
    await conn.close();
    process.exit(0);
})
module.exports = conn;