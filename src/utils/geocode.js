const request = require('request')

const geocode = (address, callback) => {

    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVoYW1tYWRlbHNoZXNodGF3aSIsImEiOiJja29zdGdhZHIwNHVmMnVsazUxcDJoeWxtIn0.lEIpsUPzuVYMNoEF0moYxA&limit=1'
    request({ url: geocodeUrl, json: true }, (error, {body:responseBody}) => {
        if (error) {
            callback("Unable to access location service!", undefined)
        }
        else if (responseBody.features.length == 0) {
            callback("Unable to find location", undefined)

        } else {

            const data = responseBody.features[0].center
            callback(undefined, {
                longitude: responseBody.features[0].center[0],
             latitude: responseBody.features[0].center[1],
             location: responseBody.features[0].place_name
            })
        }
    })
}



module.exports = geocode