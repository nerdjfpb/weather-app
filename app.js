const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 4000

// path configrations
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

// setup handlebars and views location with partial path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static public path
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		creatorName: 'nerdjfpb'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		creatorName: 'nerdjfpb'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		creatorName: 'nerdjfpb'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
	}
	geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({ err })
		}

		forecast(latitude, longitude, (err, forecastData) => {
			if (err) {
				return res.send({ err })
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found!',
		creatorName: 'nerdjfpb'
	})
})

app.listen(port, () => console.log('Running on port ' + port))
