const mongoose = require('mongoose');

const citiesModel = new mongoose.Schema({
    name:{ type: String, required: true },
    qttydistricts:{ type: Number, required: true },
    population: { type:Number, required:true },
    birthday:{ type:Date, required:true }
});

const cities = mongoose.model('cities', citiesModel);

module.exports = cities;