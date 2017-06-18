process.env.NODE_ENV = process.env.NODE_ENV || /* istanbul ignore next */ 'production'
const fs = require('fs')
const mid = require('express')()
const {CERT, KEY} = require('../config/config')

let low_id = 0
let panic = 0


mid.get('/panic/', (req, res) => {
	console.log('get ', req.path)
	return res.status(200).json({ panic })
})

mid.put('/panic/:id', (req, res) => {
	console.log('put ', req.path)
	panic = req.params.id
	return res.status(200).json({ panic })
})

mid.get('*', (req, res) => {
	console.log('get ', req.path)
	return res.status(200).end()
})

mid.post('*', (req, res) => {
	console.log('posto ', req.path)
	return res.status(201).json({ id: low_id++ })
})

mid.patch('*', (req, res) => {
	console.log('patch ', req.path)
	return res.status(200).end()
})

mid.put('*', (req, res) => {
	console.log('put ', req.path)
	return res.status(200).end()
})

mid.delete('*', (req, res) => {
	console.log('put ', req.path)
	return res.status(200).end()
})

require('https').createServer({
	cert: fs.readFileSync(CERT),
	key: fs.readFileSync(KEY)
}, mid).listen(9423, () => console.log('Mid Online'))