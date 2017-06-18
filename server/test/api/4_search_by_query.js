/* eslint-env mocha */
const Assert = require('assert')
const Supertest = require('supertest')
const { isArray, isDate, isEqual } = require('lodash')
const _ = require('lodash')

_.mixin(require('lodash-inflection'))
_.plural('stuff', 'stuffs')

/**
 * procura no banco usando uma string de texto,
 * testa todos os campos da entidade retornada
 *
 * @module test/api/search_by_query
 */
module.exports = (App, e, cookie, obj, done) => {


	let p
	for (let k in obj) {
		switch (k) {
			case 'firstName':
			case 'lastName':
			case 'name':
			case 'cpf':
			case 'phone':
			case 'email':
			case 'username':
				p = k
				break
			default:
				continue
		}
	}

	if (!p)
		return done()

	Supertest(App)
		.get('/api/' + _.pluralize(e) + '?query=' + obj[p])
		.set('Cookie', cookie)
		.expect(200)
		.end((err, res) => {
			if (err)
				throw (err)

			Assert(res.body.length > 0)

			res.body = res.body[0]

			delete res.body.__v

			delete obj.password
			delete res.body.password

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

