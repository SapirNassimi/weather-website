const request = require('request');

const getGeocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3RhbSIsImEiOiJjazdscGtpMDYwOW5qM2xyMGk2MmwzaXF1In0.mPxMy7R49atNLb9bt6uXvg&limit=1`;
    const options = {
        url,
        json: true
    };

    request(options, (error, { body }) => {
        if(error) {
            callback('Error connecting to geocode server');
        }  else if (!body.features) {
                callback('Invalid location given');
        } else {
            let data = body.features[0];
            callback(undefined, {
                latitude: data.center[1],
                longtitude: data.center[0],
                location: data.place_name
            });
        }
    });
}

module.exports = {
    getGeocode
}