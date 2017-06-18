const DB = process.env.MONGO_URI || require('./config').DB
const Mongoose = require('mongoose')

/**
 * conecta no banco de dados, matando o processo
 * em caso de falha, apaga sessoes antigas e
 * carrega todos os models no banco 
 *
 * @module config/mongoose
 */
module.exports = () => {
	Mongoose.Promise = global.Promise

	global.DB = Mongoose.connect(DB)

	global.DB.connection.on('error', err => {
		console.error(err)
		process.exit(0)
	})

	global.DB.connection.on('disconnected', () => {
		console.error('MongoDB disconnected')
		process.exit(0)
	})

	global.DB.connection.on('connected', function () {
		Mongoose.connection.db.listCollections().toArray()
			.then(r => {
				if (r.map(c => c.name).indexOf('sessions') != -1)
					return Mongoose.connection.db.dropCollection('sessions')
			})
	})

	require('../app/models/offer.server.model')
	require('../app/models/user.server.model')
}