const request = require('request')

const geocoding = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		address +
		'.json?access_token=pk.eyJ1IjoicmFqdWtoYW5yYWFqa2hhbiIsImEiOiJjazViY29pc3IwcnZjM2RwZDhmdHR6MHJjIn0.l42AEstPqze45UXmng6dkQ'

	request({ url, json: true }, (error, response) => {
		if (!error) {
			if (response.body.features.length === 0) {
				callback("Sorry this address doesn't have anything on database")
			} else {
				const data = {
					longitude: response.body.features[0].center[0],
					latitude: response.body.features[0].center[1],
					location: response.body.features[0].place_name
				}
				callback(undefined, data)
			}
		} else {
			callback('Unable to connect')
		}
	})
}

module.exports = geocoding
