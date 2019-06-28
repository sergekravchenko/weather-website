const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/60385d872d22e096d57efd8c65e82a36/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=uk'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,
                body.daily.data[0].summary + ' Зараз ' + body.currently.temperature +
                ' градусів, відчувається як ' + body.currently.apparentTemperature + ', '
                + body.currently.precipProbability + '% що буде дощ.\n Mаксимальна температура сьогодні: ' +
                body.daily.data[0].temperatureHigh + ', мінімальна температура сьогодні: ' + 
                body.daily.data[0].temperatureLow
            )
        }
    })
}



module.exports = forecast