require('dotenv').config();

const mongoose = require('mongoose');

async function Conn(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_BASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.info('Database Online!');
    }).catch((err) => {
        console.info(err);
    });
};

module.exports = Conn;