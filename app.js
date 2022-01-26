const express = require('express');
const morgan = require('morgan');
const indexRoutes = require('./server/routes/index')
const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));


// 3) ROUTES
app.use('/api/v1', indexRoutes)
// Base route
app.get('/', function (req, res) {
    res.status(200).send({
        health_check: 'Ok',
        message: 'base endpoint for the starwars api is up and running'
    })
})

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "Failed",
        error: `Can't find this route: ${req.originalUrl} on the server`
    })
});

module.exports = app;
