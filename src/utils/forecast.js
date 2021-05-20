const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=541225481d82206beb7dabdaffc9250b&query=' + latitude + "," + longitude
    request({ url, json: true }, (error, { body: responseBody }) => {
        if (error) {
            callback("Unable to access Weather service!", undefined)
        } else if (responseBody.error) {
            callback("Unable to find location", undefined)

        } else {
            callback(undefined, responseBody.current.weather_descriptions[0] + '. Temperature is ' + responseBody.current.temperature + ' and it feels like ' + responseBody.current.feelslike)
        }
    })
}

module.exports = forecast