const Mongoose = require('mongoose')
const Faker = require('faker')

/**
 * gera um mock de offer completo e
 * retorna o json preenchido
 *
 * @module test/entitys/card
 */
module.exports = function () {
	return {
		seller: Mongoose.Types.ObjectId(),

		buyer: Mongoose.Types.ObjectId(),

		value: Faker.random.number(),

		state: Faker.random.boolean() ?
			Faker.random.boolean() ? 'open' : 'closed' :
			Faker.random.boolean() ? 'pending' : 'done',


		name: Faker.name.firstName(),

		photo: Faker.image.avatar(),

		desc: Faker.lorem.lines(1),

		deleted: false
	}
}