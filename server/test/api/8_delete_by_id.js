/* eslint-env mocha */
const Assert = require('assert')
const Supertest = require('supertest')

/**
 * exclui uma entidade do banco de dados e
 * pesquisa ela novamente verificando a delecao logica
 *
 * @module test/api/search_all
 */
module.exports = (App, e, cookie, obj, done) => {
	Supertest(App)
		.delete('/api/' + e + '/' + obj._id)
		.set('Cookie', cookie)
		.expect(200)
		.end((err, res) => {
			if (err)
				throw err

			Assert(res.body._id)

			Supertest(App)
				.get('/api/' + e + '/' + obj._id)
				.set('Cookie', cookie)
				.expect(200)
				.end((err, res) => {
					if (err)
						console.error(err)

					Assert(res.body.deleted == true)

					done()
				})
		})
}


