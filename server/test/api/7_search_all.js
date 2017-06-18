/* eslint-env mocha */
const Assert = require('assert')
const Supertest = require('supertest')
const pluralize = require('pluralize')

/**
 * faz uma pesquisa de todas as entidades no banco
 * checando o tamanho do body e o status do request
 *
 * @module test/api/search_all
 */
module.exports = (App, e, cookie, obj, done) => {
	Supertest(App)
		.get('/api/' + pluralize(e) + '/')
		.set('Cookie', cookie)
		.expect(200)
		.end((err, result) => {
			if (err)
				throw err

			Assert(result.body.length > 0)

			done()
		})
}

