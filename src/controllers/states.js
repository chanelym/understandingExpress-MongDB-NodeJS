const states = require('../models/states');
const validations = require('../helpers/validations');

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
        validations.validateInputState(req, res);

        await states.create(req.body).then(() => {
            res.status(201).json({ message: 'State Successfully Created' });
        }).catch((err) => {
            res.status(400).json({ message: 'Oops! Something went Wrong' });
            console.error(err);
        });
    };

    updateStateByID = async (req,res) => {
        validations.validateURLID(req, res);
        validations.validateInputState(req, res);

        await states.findByIdAndUpdate( req.params.id, req.bod ).then(() => { 
            res.status(201).json({ message: 'State Successfully Updated' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json( {message: 'Oops! Something went wrong'});
        });
    };

    deleteStateByID = async (req,res) => {
        validations.validateURLID(req, res);
        
        await states.findByIdAndDelete( req.params.id ).then(() => { 
            res.status(201).json({ message: 'State Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    }
}

module.exports = stateController;