const countries = require('../models/countries');

function validID(res, id) {
    if (!req.params.id) {
        res.status(400).json({message: 'URLs ID is Missing' });
        return;
    }
};

exports.getAll = async (req, res) => {
    await countriesModel.find({}).then((countries) => {
        res.status(200).json(countries);
    }).catch((err) => {
        res.status(404).json({ message: 'Nothing Found Here' });
        console.error(err);
    });
};

exports.getUnique = async (req, res) => {
    await countriesModel.findOne({ name: req.params.name }).then((countries) => {
        if (countries == null) { 
            res.status(404).json({ message: 'Country Not Found' });
        } else {
            res.status(200).json(countries);
        }
        }).catch((err) => {
            res.status(404).json({ message: 'Nothing Found Here' });
    });
};

exports.create = async (req,res) => { 
    validID(res, req.params.id);

    if (!req.body.name) {
        res.status(400).json({ message: 'Name is Missing' });
        return;
    } else if (!req.body.population) {
        res.status(400).json({ message: 'Population Number is Missing' });
        return;
    } else if (!req.body.language) {
        res.status(400).json({ message: 'Mother Language is Missing' });
        return; 
    } else if (!req.body.gbp) {
        res.status(400).json({ message: 'Countrys GBP is Missing' });
        return;
    }

    await countriesModel.create(req.body).then(() => {
        res.status(200).json({ message: 'Country Successfully Created' });
    }).catch((err) => {
        res.status(400).json({ message: 'Oops! Something went Wrong' });
        console.error(err);
    });
};

exports.update = async (req,res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'URLs ID is Missing' });
        return;
    } else if (!req.body.name) {
        res.status(400).json({ message: 'Name is Missing' });
        return;
    } else if (!req.body.population) {
        res.status(400).json({ message: 'Population Number is Missing' });
        return;
    } else if (!req.body.language) {
        res.status(400).json({ message: 'Mother Language is Missing' });
        return; 
    } else if (!req.body.gbp) {
        res.status(400).json({ message: 'Countrys GBP is Missing' });
        return;
    }

    await countriesModel.updateOne({ _id:id}, req.body).then(() => { 
        res.status(200).json({ message: 'Country Successfully Updated' });
    }).catch((err) => {
        console.error(err);
        res.status(400).json( {message: 'Oops! Something went wrong'});
    });
};

exports.delete = async (req,res) => {
    if (req.params.id.length == 24) { 
        await countriesModel.deleteOne({_id:req.params.id}).then(() => { 
            res.status(200).json({ message: 'Country Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    } else {
        res.status(400).json({ message: 'ID Needs At Least 24 characters' });
    }
};