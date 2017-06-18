process.env.NODE_ENV = process.env.NODE_ENV || /* istanbul ignore next */ 'production'
const kit = require('express')()


kit.get('/kit/:protocol', (req, res) => {
	console.log('get ', req.path)
	return res.status(200).json({ value: '' + Math.random() })
})

require('http').createServer(kit).listen(10000, () => console.log('Kit Online'))