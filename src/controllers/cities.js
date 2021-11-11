const cities = require('../models/cities');

exports.getAll = async (req, res) => {
    await citiesModel.find({}).then((cities) => {
        res.status(200).json(cities);
    }).catch((err) => {
        res.status(404).json({ message: 'Nothing Found Here' });
        console.error(err);
    });
};

exports.getUnique = async (req, res) => {
    const name = req.params.name;

    await citiesModel.findOne({ name: name }).then((cities) => {
        if (cities == null) { 
            res.status(404).json({ message: 'City Not Found' });
        } else {
            res.status(200).json(cities);
        }
        }).catch((err) => {
            res.status(404).json({ message: 'Nothing Found Here' });
    });
};

exports.create = async (req,res) => { 

    if (!req.body.name) {
        res.status(400).json({ message: 'Name is Missing' });
        return;
    } else if (!req.body.qttydistricts) {
        res.status(400).json({ message: 'Districts Quantity is Missing' });
        return;
    } else if (!req.body.population) {
        res.status(400).json({ message: 'Population Number is Missing' });
        return; 
    } else if (!req.body.birthday) {
        res.status(400).json({ message: 'City Birthday is Missing' });
        return;
    }

    await citiesModel.create(req.body).then(() => {
        res.status(200).json({ message: 'City Successfully Created' });
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
    } else if (!req.body.qttydistricts) {
        res.status(400).json({ message: 'Districts Quantity is Missing' });
        return;
    } else if (!req.body.population) {
        res.status(400).json({ message: 'Population Number is Missing' });
        return; 
    } else if (!req.body.birthday) {
        res.status(400).json({ message: 'City Birthday is Missing' });
        return;
    }

    await citiesModel.updateOne({ _id:id}, req.body).then(() => { 
        res.status(200).json({ message: 'City Successfully Updated' });
    }).catch((err) => {
        console.error(err);
        res.status(400).json( {message: 'Oops! Something went wrong'});
    });
};

exports.delete = async (req,res) => {
    if (req.params.id.length == 24) { 
        await citiesModel.deleteOne({_id:req.params.id}).then(() => { 
            res.status(200).json({ message: 'City Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    } else {
        res.status(400).json({ message: 'ID Needs At Least 24 characters' });
    }
};