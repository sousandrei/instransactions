process.env.NODE_ENV = process.env.NODE_ENV || /* istanbul ignore next */ 'development'

const Async = require('async')
const {DB} = require('../config/config')

const Mongoose = require('mongoose')
Mongoose.Promise = global.Promise
Mongoose.connect(DB)

require('../app/models/user.server.model.js')
require('../app/models/person.server.model.js')
require('../app/models/access_point.server.model.js')
require('../app/models/access.server.model.js')
require('../app/models/kit.server.model.js')
require('../app/models/card.server.model.js')

const User = require('mongoose').model('User')
const Person = require('mongoose').model('Person')
const AccessPoint = require('mongoose').model('AccessPoint')
const Access = require('mongoose').model('Access')
const Kit = require('mongoose').model('Kit')
const Card = require('mongoose').model('Card')


let db = {}
const DB_SIZE = 600

Async.series([
	(callback) => {
		Mongoose.connection.once('connected', () => {
			Mongoose.connection.db.dropDatabase()
			callback()
		})
	},
	(callback) => {
		db.kits = []

		for (let i = 0; i < DB_SIZE; i++)
			db.kits.push(require('../test/entitys/kit.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.kits[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		db.cards = []

		for (let i = 0; i < DB_SIZE; i++)
			db.cards.push(require('../test/entitys/card.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.cards[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		db.users = [{
			username: 'admin',
			password: 'admin123456',
			permission: 0
		}]

		for (let i = 1; i < DB_SIZE; i++)
			db.users.push(require('../test/entitys/user.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.users[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		db.people = []

		for (let i = 0; i < DB_SIZE; i++)
			db.people.push(require('../test/entitys/person.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.people[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		db.access_points = []

		for (let i = 0; i < DB_SIZE; i++)
			db.access_points.push(require('../test/entitys/access_point.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.access_points[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		db.accesses = []

		for (let i = 0; i < DB_SIZE; i++)
			db.accesses.push(require('../test/entitys/access.js')())

		for (let i = 0; i < DB_SIZE; i++)
			db.accesses[i]._id = Mongoose.Types.ObjectId()

		callback()
	},
	(callback) => {
		for (let i = 0; i < DB_SIZE; i++){
			db.people[i].access_points[0].access_point = db.access_points[i]._id
			db.people[i].cards[0] = db.cards[i]._id
		}

		callback()
	},
	(callback) => {
		for (let i = 0; i < DB_SIZE; i++) {
			db.accesses[i].access_point = db.access_points[i]._id
			db.accesses[i].person = db.people[i]._id

			db.users[i].person = db.people[i]._id
		}

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
		console.log('\nPeople')
		Async.each(db.people,
			(p, callback) => {
				new Person(p).save((err, result) => {
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
		console.log('\nAccess Points')
		Async.each(db.access_points,
			(ap, callback) => {
				new AccessPoint(ap).save((err, result) => {
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
		console.log('\nAccess')
		Async.each(db.accesses,
			(a, callback) => {
				new Access(a).save((err, result) => {
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
		console.log('\nKits')
		Async.each(db.kits,
			(a, callback) => {
				new Kit(a).save((err, result) => {
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
		console.log('\nCards')
		Async.each(db.cards,
			(a, callback) => {
				new Card(a).save((err, result) => {
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
