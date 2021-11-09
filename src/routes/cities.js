const express = require('express');
const router = express.Router();
const citiesModel = require('../models/cities');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Cities Route'});
});

router.get('/listAll', async (req, res) => {
    await citiesModel.find({}).then((cities) => {
        res.status(200).json(cities);
    }).catch((err) => {
        res.status(404).json({ message: 'Nothing Found Here' });
        console.error(err);
    });
});

router.get('/listName/:name', async (req, res) => {
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
});

router.post('/add', async (req,res) => { 

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
});

router.put('/update/:id', async (req,res) => {
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
});

router.delete('/del/:id', async (req,res) => {
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
});

module.exports = router;