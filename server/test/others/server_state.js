const Faker = require('faker')

module.exports = function () {
	return {
		panic: Faker.random.boolean(),
		mid_last_ping: Faker.date.past()
	}
}
