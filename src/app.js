const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { getGeocode } = require('./utils/geocode');
const { getForecast } = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sapir Nassimi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sapir Nassimi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For any question contact us on sapir.nassimi@sap.com',
        title: 'Help',
        name: 'Sapir Nassimi'
    });
});

app.get('/weather', (req, res) => {
    address = req.query.address;
    
    if (!address) {
        return res.send({
            error: 'No address provided'
        });
    }
    
    getGeocode(address, (error, geocodeData) => {
        if (error) {
            return res.send(error);
        }

        getForecast(geocodeData, (error, forecastData) => {
            if (error) {
                return res.send(error);
            }

            res.send({
                forecast: forecastData,
                location: geocodeData.location,
                address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sapir Nassimi',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sapir Nassimi',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});