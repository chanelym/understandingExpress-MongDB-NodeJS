const mongoose = require('mongoose');

const countriesModel = new mongoose.Schema({
    name:{ type:String, required:true },
    population:{ type:Number, required:true },
    language:{ type:String, required:true },
    gbp:{ type:Number, required:true }
});

const countries = mongoose.model('countries', countriesModel);

module.exports = countries;