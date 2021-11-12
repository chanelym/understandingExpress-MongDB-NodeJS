const states = require('../models/states');
// const validations = require('../helpers/validations');

function validateInput(req, res) {
    if (!req.body.name || !req.body.qttydistricts || !req.body.population || !req.body.birthday) {
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

class stateController {

    getStates = async (req, res) => {
        await states.find({}).then((states) => {
            res.status(200).json(states);
        })
    };

    getStateByName = async (req, res) => {
        await states.findOne({ name: req.params.name }).then((states) => {
            if (states == null) { 
                res.status(404).json({ message: 'State Not Found' });
            } else {
                res.status(200).json(states);
            }})
    };

    createState = async (req, res) => {
        validateInput(req, res);

        await states.create(req.body).then(() => {
            res.status(200).json({ message: 'State Successfully Created' });
        }).catch((err) => {
            res.status(400).json({ message: 'Oops! Something went Wrong' });
            console.error(err);
        });
    };

    updateStateByID = async (req,res) => {
        validateURLID(req, res);
        validateInput(req, res);

        await states.findByIdAndUpdate( req.params.id, req.bod ).then(() => { 
            res.status(200).json({ message: 'State Successfully Updated' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json( {message: 'Oops! Something went wrong'});
        });
    };

    deleteStateByID = async (req,res) => {
        validateURLID(req, res);
        
        await states.findByIdAndDelete( req.params.id ).then(() => { 
            res.status(200).json({ message: 'State Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    }
}

module.exports = stateController;