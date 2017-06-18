process.env.NODE_ENV = process.env.NODE_ENV ||
//  /* istanbul ignore next */ 'production'
 /* istanbul ignore next */ 'development'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const fs = require('fs')
const { CERT, KEY, HTTPS } = require('./config/config')

const EventEmitter = require('events')
process.events = new EventEmitter()

require('./config/mongoose')()
require('./config/passport')()

let app = require('./config/express')()

const server = require('https').createServer({
	cert: fs.readFileSync(CERT),
	key: fs.readFileSync(KEY)
}, app)

process.io = require('socket.io')(server)

server.listen(HTTPS, () => {
	/* istanbul ignore if */
	if (process.env.NODE_ENV != 'test')
		console.log('Online ' + HTTPS)
})

process.on('uncaughtException', (err) => {
	console.log(err)
})

module.exports = app