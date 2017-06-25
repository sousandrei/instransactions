process.env.NODE_ENV = process.env.NODE_ENV ||
/* istanbul ignore next */ 'development'

const Async = require('async')
const { DB } = require('../config/config')

const Mongoose = require('mongoose')
Mongoose.Promise = global.Promise
Mongoose.connect(DB)

require('../app/models/user.server.model.js')
require('../app/models/offer.server.model.js')

const User = require('mongoose').model('User')
const Offer = require('mongoose').model('Offer')


let db = {}
const DB_SIZE = 100

Async.series([
	(callback) => {
		Mongoose.connection.once('connected', () => {
			Mongoose.connection.db.dropDatabase()
			callback()
		})
	},
	(callback) => {
		db.users = []

		for (let i = 0; i < DB_SIZE; i++)
			db.users.push(require('../test/entitys/user.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.users[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		db.offers = []

		for (let i = 0; i < DB_SIZE / 2; i++)
			db.offers.push(require('../test/entitys/offer.js')())

		for (let i = 0; i < DB_SIZE / 2; i++)
			db.offers[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		for (let i = 0, j = 0; i < DB_SIZE / 2; i++ , j += 2) {
			db.offers[i].seller = db.users[j]
			db.offers[i].buyer = db.users[j + 1]
		}

		db.users[0].username = 'admin'
		db.users[0].password = 'admin123456'

		callback()
	},
	(callback) => {
		for (let i = 0; i < DB_SIZE - 1; i++)
			db.user[i].friends = db.user[i + 1]._id

		db.user[DB_SIZE - 1].friends = db.user[0]._id

		callback()
	},
	(callback) => {
		console.log('\nUsers')
		Async.each(db.users,
			(u, callback) => {
				new User(u).save((err, result) => {
					if (err)
						console.error(err)
					else
						console.log(result._id)

					callback()
				})
			},
			() => {
				callback()
			}
		)
	},
	(callback) => {
		console.log('\Offers')
		Async.each(db.offers,
			(o, callback) => {
				new Offer(o).save((err, result) => {
					if (err)
						console.error(err)
					else
						console.log(result._id)

					callback()
				})
			},
			() => {
				callback()
			}
		)
	}

], (err) => {
	if (err)
		console.error(err)

	Mongoose.connection.close()
})
