exports.validateInputCountry = (req, res) => {
    if (!req.body.name || !req.body.population || !req.body.language || !req.body.gbp) {
        res.status(403).json({ message: 'One or more fields is missing.' });
        return true;
    }
};
    
exports.validateInputState = (req, res) => {
    if (!req.body.name || !req.body.district || !req.body.population || !req.body.minwage) {
        res.status(403).json({ message: 'One or more fields is missing.' });
        return true;
    } 
};
    
exports.validateInputCity = (req, res) => {
    if (!req.body.name || !req.body.qttydistricts || !req.body.population || !req.body.birthday) {
        res.status(403).json({ message: 'One or more fields is missing.' });
        return true;
    } 
};

exports.validateURLID = (req, res) => {
    const id = req.params.id;
        
    if (id.length != 24) {
        res.status(403).json({message: 'ID URL needs 24 characters' });
        return true;
    } 
};