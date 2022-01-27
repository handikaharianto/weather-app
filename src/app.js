const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // custom views path
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs') // use hbs as default view engine
app.set('views', viewsPath) // set views path
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather app',
    name: 'handika harianto',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    name: 'handika harianto',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'handika harianto',
    message: 'hello, this is a help page',
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query

  if (!address) {
    return res.send({
      error: 'You must provide an address',
    })
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error })
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        address,
        location: data.location,
        forecast: forecastData,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provde a search term' })
  }

  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help page',
    errorMessage: 'help article not found',
    name: 'handikaharianto',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error page',
    error: 'page not found',
    name: 'handikaharianto',
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
