const express = require('express');
const router = express.Router();
const countriesModel = require('../models/countries');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Countries Route'});
});

router.get('/listAll', async (req, res) => {
    await countriesModel.find({}).then((countries) => {
        res.status(200).json(countries);
    }).catch((err) => {
        res.status(404).json({ message: 'Nothing Found Here' });
        console.error(err);
    });
});

router.get('/listName/:name', async (req, res) => {
    const name = req.params.name;

    await countriesModel.findOne({ name: name }).then((countries) => {
        if (countries == null) { 
            res.status(404).json({ message: 'Country Not Found' });
        } else {
            res.status(200).json(countries);
        }
        }).catch((err) => {
            res.status(404).json({ message: 'Nothing Found Here' });
    });
});

router.post('/add', async (req,res) => { 

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
});

router.put('/update/:id', async (req,res) => {
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
});

router.delete('/del/:id', async (req,res) => {
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
});

module.exports = router;