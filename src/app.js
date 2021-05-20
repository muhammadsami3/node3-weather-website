const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)

//Define paths for Express config 
const PULIC_DIR_PATH = path.join(__dirname, '../public')
const VIEWS_DIR_PATH = path.join(__dirname, '../templates/views')
const PARTIALS_DIR_PATH = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', VIEWS_DIR_PATH)

hbs.registerPartials(PARTIALS_DIR_PATH)

// setup static dir to serve
app.use(express.static(PULIC_DIR_PATH))

//app.com

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'melsheshtawi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Helpful message',
        title: 'help',
        name: 'melsheshtawi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'melsheshtawi'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'you must provide address'
        })
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })

        }

        forecast(longitude, latitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                address,
                forecastData

            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        msg: 'Help article not found',
        name: 'melsheshtawi'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        msg: 'Page not found',
        name: 'melsheshtawi'
    })
})


app.listen(3000, () => {
    console.log('server is up on port 3000.')
})