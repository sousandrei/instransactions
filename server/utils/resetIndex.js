process.env.NODE_ENV = process.env.NODE_ENV || /* istanbul ignore next */ 'development'

const async = require('async')
const {DB} = require('../config/config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(DB, err => {
	if (err)
		throw err

	mongoose.connection.db.listCollections().toArray()
		.then(r => {
			if (r.length > 0)
				return async.each(r.map(c => c.name), (c, callback) => {
					console.log(c)
					mongoose.connection.db.collection(c).dropIndexes()
						.then(() => callback())
						.catch(e => callback(e))
				}, e => {
					if (e) throw e

					mongoose.connection.close()
				})

			return mongoose.connection.close()

		})
		.catch(e => { throw e })
})