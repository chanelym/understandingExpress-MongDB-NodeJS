require('dotenv').config();

const express = require('express');
const app = express();

const Conn = require('./src/config/db');
Conn();

const port = process.env.PORT || 3000;

const countriesRoutes = require('./src/routes/countries.js');
app.use('/countries', countriesRoutes);

const statesRoutes = require('./src/routes/states.js');
app.use('/states', statesRoutes);

const citiesRoutes = require('./src/routes/cities');
app.use('/cities', citiesRoutes);

app.listen(port, () => {
    console.info(`Server listening at http://localhost:${port}`);
});