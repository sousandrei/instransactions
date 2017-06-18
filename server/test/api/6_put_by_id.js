/* eslint-env mocha */
const Assert = require('assert')
const Supertest = require('supertest')
const {isArray, isEqual, isDate} = require('lodash')

/**
 * atualiza uma entidade e pesquisa ela novamente
 * para verificar se os campos foram alterados.
 * verifica todos os campos e o status do request
 *
 * @module test/api/put_by_id
 * @deprecated put implementado com a mesma logica do patch
 */
module.exports = (App, e, cookie, obj, done) => {
	let obj_Old = obj
	obj = require('../entitys/' + e)()

	Supertest(App)
		.put('/api/' + e + '/' + obj_Old._id)
		.set('Cookie', cookie)
		.send(obj)
		.expect(200)
		.end((err, res) => {
			if (err)
				throw err

			Assert(res.body._id)

			Supertest(App)
				.get('/api/' + e + '/' + res.body._id)
				.set('Cookie', cookie)
				.expect(200)
				.end((err, res) => {
					if (err)
						console.error(err)

					delete res.body.__v
					delete res.body._id
					
					delete obj.password
					delete res.body.password

					for (let k in obj)
						if (isArray(obj[k]))
							Assert(isEqual(String(obj[k]), String(res.body[k])))
						else if (isDate(obj[k]))
							Assert(res.body[k])
						else
							Assert(String(obj[k]) == String(res.body[k]))

					obj = obj_Old
					done()
				})
		})
}
