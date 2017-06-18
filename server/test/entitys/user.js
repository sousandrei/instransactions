const Faker = require('faker')
const Mongoose = require('mongoose')

/**
 * gera um mock de usuario completo e
 * retorna o json preenchido
 *
 * @module test/entitys/user
 */
module.exports = function () {
	return {
		firstName: Faker.name.firstName(),
		lastName: Faker.name.firstName(),

		cpf: Faker.random.number(),
		phone: Faker.random.number(),
		
		photo: Faker.image.people(),

		email: Faker.internet.email(),

		username: Faker.internet.userName(),
		password: Faker.internet.password(),

		routes: {
			'/api/user/:_id': {
				get: true,
				patch: true,
				delete: true
			},
			'/api/users': {
				get: true,
				post: true
			},
			'/api/offer/:_id': {
				get: true,
				patch: true,
				put: true,
				delete: true
			},
			'/api/offers': {
				get: true,
				post: true
			}
		},

		blocked: false,

		deleted: false
	}
}