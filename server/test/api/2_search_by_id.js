/* eslint-env mocha */
const Assert = require('assert')
const Supertest = require('supertest')
const { isArray, isDate, isEqual } = require('lodash')

/**
 * testa a procura por id de uma entidade no sistema,
 * o status retornado e todos os campos do json
 * retornado com o enviado
 *
 * @module test/api/search_by_id
 */
module.exports = (App, e, cookie, obj, done) => {
	Supertest(App)
		.get('/api/' + e + '/' + obj._id)
		.set('Cookie', cookie)
		// .expect(200)
		.end((err, res) => {
			if (err)
				throw (err)

			Assert(res.body._id)
			obj = res.body

			for (let k in obj)
				if (isArray(obj[k]))
					Assert(isEqual(String(obj[k]), String(res.body[k])))
				else if (isDate(obj[k]))
					Assert(res.body[k])
				else
					Assert(String(obj[k]) == String(res.body[k]))

			done()
		})
}

