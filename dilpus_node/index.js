// IMPORTS
const https = require('https')
const fs = require('fs')
const express = require('express');
const cors = require('cors');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
const monk = require('monk');
const log = require('./modules/logger')

// CALLS
const app = express();
const filter = new Filter();
app.use(cors());
app.use(express.json());
// changed localhost/dilpus to database name
const db = monk('localhost/dilpus');

const users = db.get('users');
const products = db.get('products')
const receipt = db.get('receipt')

// Functions and Classes

function getList(json_list) {
	var list = []
	for (var i in json_list) {
		list.push(json_list[i])
	}
	return list
}

class Constants {
	constructor() {}
}

Constants.essentials = 'Essentials'
Constants.travel = 'Travel'
Constants.sweets = 'Sweets'
Constants.clothing = 'Clothing'

// -============START=============-

app.get('/test', (req, res) => {
	console.log(Constants.essentials)
	res.send('yo dude')
})

app.get('/products', (req, res) => {
	products.find().then((products) => {
		res.code = 200
		res.json(products)
	});
})

app.post('/products', (req, res) => {
	products.insert(req.body).then(product => {
		console.log(product)
	})
	res.code = 200
	res.send(req.body)
}) 

app.get('/deleteall', (req, res) => {
	products.drop()
	res.json('All products deleted')
})

app.get('/', (req, res) => {
	console.log(req)
	res.send('App running! Congrats! You good!')
})

const server = app.listen(process.env.PORT || 8080, () => {
	const host = server.address().address
	const port = server.address().port

	console.log(`App listening at http://${host}:${port}`)
})