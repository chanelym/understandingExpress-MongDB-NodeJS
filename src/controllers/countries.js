const countries = require('../models/countries');

function validateURL(req, res) {
    const id = req.params.id;
    
    if (id.length != 24) {
        res.status(403).json({message: 'URLs ID needs 24 characters' });
        return true;
    } 
};

function validateInput(req, res) {
    if (!req.body.name) {
        res.status(403).json({ message: 'Name is Missing' });
        return true;
    } else if (!req.body.population) {
        res.status(403).json({ message: 'Population Number is Missing' });
        return true;
    } else if (!req.body.language) {
        res.status(403).json({ message: 'Mother Language is Missing' });
        return true;
    } else if (!req.body.gbp) {
        res.status(403).json({ message: 'Countrys GBP is Missing' });
        return true;
    }
};

exports.getAll = async (req, res) => {
    await countries.find({}).then((countries) => {
        res.status(200).json(countries);
    }).catch((err) => {
        res.status(404).json({ message: 'Nothing Found Here' });
        console.error(err);
    });
};

exports.getUnique = async (req, res) => {
    validateURL(req, res);

    await countries.findOne({ name: req.params.name }).then((countries) => {
        if (countries == null) { 
            res.status(404).json({ message: 'Country Not Found' });
        } else {
            res.status(200).json(countries);
        }
        }).catch((err) => {
            res.status(404).json({ message: 'Nothing Found Here' });
    });
};

exports.create = async (req, res) => {
    validateInput(req, res);

    await countries.create(req.body).then(() => {
        res.status(200).json({ message: 'Country Successfully Created' });
    }).catch((err) => {
        res.status(400).json({ message: 'Oops! Something went Wrong' });
        console.error(err);
    });
};

exports.update = async (req,res) => {
    validateURL(req, res);
    validateInput(req, res);

    await countries.findByIdAndUpdate( req.params.id, req.bod ).then(() => { 
        res.status(200).json({ message: 'Country Successfully Updated' });
    }).catch((err) => {
        console.error(err);
        res.status(400).json( {message: 'Oops! Something went wrong'});
    });
};

exports.delete = async (req,res) => {
    validateURL(req, res);
    
    await countries.findByIdAndDelete( req.params.id ).then(() => { 
        res.status(200).json({ message: 'Country Successfully Removed!' });
    }).catch((err) => {
        console.error(err);
        res.status(400).json({ message: 'Oops! Something went wrong' });
    });
}