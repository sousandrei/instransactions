/* eslint-env mocha */
const Supertest = require('supertest')
const Mongoose = require('mongoose')

/**
 * testa a procura por id invalido em uma
 * entidade no sistema
 *
 * @module test/api/search_by_wrong_id
 */
module.exports = (App, e, cookie, obj, done) => {
	Supertest(App)
		.get('/api/' + e + '/' + Mongoose.Types.ObjectId())
		.set('Cookie', cookie)
		.expect(404)
		.end((err) => {
			if (err)
				throw (err)

			done()
		})
}