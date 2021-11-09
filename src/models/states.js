const mongoose = require('mongoose');

const statesModel = new mongoose.Schema({
    name: { type: String, required: true },
    district: { type: String, required: true },
    population: { type: Number, required: true },
    minwage: { type: Number, required: true },
    dataCriacao: { type: Date, default: Date.now }
});

const states = mongoose.model('states', statesModel);

module.exports = states;