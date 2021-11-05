require('dotenv').config();

const mongoose = require('mongoose');

async function Conn(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fpxtn.mongodb.net/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.info('Database Online!');
    }).catch((err) => {
        console.info(err);
    });
};

module.exports = Conn;