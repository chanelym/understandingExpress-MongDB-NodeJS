const cities = require('../models/cities');
// const validations = require('../helpers/validations');

function validateInput(req, res) {
    if (!req.body.name || !req.body.district || !req.body.population || !req.body.minwage) {
        res.status(403).json({ message: 'One or more fields is missing.' });
        return true;
    } 
};

function validateURLID(req, res) {
    const id = req.params.id;
        
    if (id.length != 24) {
        res.status(403).json({message: 'ID URL needs 24 characters' });
        return true;
    } 
};

class cityController {

    getCities = async (req, res) => {
        await cities.find({}).then((cities) => {
            res.status(200).json(cities);
        })
    };

    getCityByName = async (req, res) => {
        await cities.findOne({ name: req.params.name }).then((cities) => {
            if (cities == null) { 
                res.status(404).json({ message: 'City Not Found' });
            } else {
                res.status(200).json(cities);
            }})
    };

    createCity = async (req, res) => {
        validateInput(req, res);

        await cities.create(req.body).then(() => {
            res.status(200).json({ message: 'City Successfully Created' });
        }).catch((err) => {
            res.status(400).json({ message: 'Oops! Something went Wrong' });
            console.error(err);
        });
    };

    updateCityByID = async (req,res) => {
        validateURLID(req, res);
        validateInput(req, res);

        await cities.findByIdAndUpdate( req.params.id, req.bod ).then(() => { 
            res.status(200).json({ message: 'City Successfully Updated' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json( {message: 'Oops! Something went wrong'});
        });
    };

    deleteCityByID = async (req,res) => {
        validateURLID(req, res);
        
        await cities.findByIdAndDelete( req.params.id ).then(() => { 
            res.status(200).json({ message: 'City Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    }
}

module.exports = cityController;