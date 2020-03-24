const request = require('request');

const getForecast = ({ latitude, longtitude }, callback) => {
    const url = `https://api.darksky.net/forecast/eeb5b47336e0704108214e9aca7763aa/${latitude},${longtitude}?units=si`;
    const options = {
        url,
        json: true
    };

    request(options, (error, { body }) => {
        if(error) {
            callback('Error connecting to skydark server');
        } else if (body.error) {
            callback(body.error);
        } else {
            let { currently } = body;
            callback(undefined, `It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = {
    getForecast
}