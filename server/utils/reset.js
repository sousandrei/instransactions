process.env.NODE_ENV = process.env.NODE_ENV ||
/* istanbul ignore next */ 'development'

const Async = require('async')
const { DB } = require('../config/config')
const Mongoose = require('mongoose')

Mongoose.Promise = global.Promise
Mongoose.connect(DB)

require('../app/models/user.server.model.js')
const User = require('mongoose').model('User')

Async.series([
	(callback) => {
		Mongoose.connection.once('connected', () => {
			Mongoose.connection.db.dropDatabase()
			return callback()
		})
	},
	(callback) => {
		let user = require('../test/entitys/user.js')()

		user.username = 'admin'
		user.password = 'admin123456'

		new User(user).save((err, result) => {
			if (err)
				console.error(err)
			else
				console.log(result._id)

			callback()
		})
	}

], (err) => {
	if (err)
		console.error(err)

	Mongoose.connection.close()
})
