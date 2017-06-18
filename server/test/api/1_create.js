/* eslint-env mocha */
const Assert = require('assert')
const Supertest = require('supertest')
const pluralize = require('pluralize')


/**
 * testa a criacao de uma entidade no sistema,
 * o status retornado e o retordo a requisicao
 *
 * @module test/api/create
 */
module.exports = (App, e, cookie, obj, done) => {
	Supertest(App)
		.post('/api/' + pluralize(e))
		.set('Cookie', cookie)
		.send(obj)
		.expect(200)
		.end((err, res) => {
			if (err)
				throw (err)

			Assert(res.body._id)
			obj._id = res.body._id

			done()
		})
}
