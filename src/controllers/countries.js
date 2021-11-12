const countries = require('../models/countries');
const validations = require('../helpers/validations');

class countryController {

    getCountries = async (req, res) => {
        await countries.find({}).then((countries) => {
            res.status(200).json(countries);
        })
    };

    getCountryByName = async (req, res) => {
        await countries.findOne({ name: req.params.name }).then((countries) => {
            if (countries == null) { 
                res.status(404).json({ message: 'Country Not Found' });
            } else {
                res.status(200).json(countries);
            }})
    };

    createCountry = async (req, res) => {
        validations.validateInput(req, res);

        await countries.create(req.body).then(() => {
            res.status(200).json({ message: 'Country Successfully Created' });
        }).catch((err) => {
            res.status(400).json({ message: 'Oops! Something went Wrong' });
            console.error(err);
        });
    };

    updateCountryByID = async (req,res) => {
        validations.validateURLID(req, res);
        validations.validateInput(req, res);

        await countries.findByIdAndUpdate( req.params.id, req.bod ).then(() => { 
            res.status(200).json({ message: 'Country Successfully Updated' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json( {message: 'Oops! Something went wrong'});
        });
    };

    deleteCountryByID = async (req,res) => {
        validations.validateURLID(req, res);
        
        await countries.findByIdAndDelete( req.params.id ).then(() => { 
            res.status(200).json({ message: 'Country Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    }
}

module.exports = countryController;