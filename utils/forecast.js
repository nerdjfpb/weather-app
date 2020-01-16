const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/ea70a381aaeaa2c79b7c532944ae9b02/' +
		latitude +
		',' +
		longitude

	request({ url, json: true }, (error, response) => {
		if (!error) {
			if (response.body.error) {
				callback(response.body.error)
			} else {
				callback(
					undefined,
					`${response.body.currently.summary}. It's currently ${response.body.currently.temperature}F out. There is a ${response.body.currently.precipProbability}% chance of rain.`
				)
			}
		} else {
			callback('Unable to connect...')
		}
	})
}

module.exports = forecast
