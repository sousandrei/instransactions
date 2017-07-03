/* eslint-env mocha */
process.env.NODE_ENV = 'test'
const { DB } = require('../config/config')

const { readdirSync } = require('fs')
const Mongoose = require('mongoose')
const Supertest = require('supertest')
const async = require('async')

let cookie
let mongo
let App = require('../index')

let User = Mongoose.model('User')

let user = require('./entitys/user')()
let objs = readdirSync('test/entitys')
let api = readdirSync('test/api')


describe('Testing CRUD', function () {
	this.timeout(100000)

	describe('Prepare', () => {

		/**
		 * conecta no banco de dados
		 *
		 * @function connectDB
		 */
		it('Connect DB', async (done) => {
			if (Mongoose.connection.readyState) {
				mongo = Mongoose
				return done()
			}

			await Mongoose.connect(DB)
			await Mongoose.connection.db.dropDatabase()
			done()
		})

		/**
		 * cria um usuario
		 *
		 * @function createUser
		 */
		it('Create user', (done) => {
			new User(user)
				.save((err, result) => {
					if (err)
						throw (err)

					user._id = result._id

					done()
				})
		})

		/**
		 * faz login com o usuario criado
		 *
		 * @function login
		 */
		it('Login', (done) => {
			Supertest(App)
				.post('/api/login')
				.expect(200)
				.send({ username: user.username, password: user.password })
				.end((err, res) => {
					if (err)
						throw err

					cookie = res.headers['set-cookie']

					done()
				})
		})
	})

	/**
	 * roda todas as funcoes de teste de crud
	 *
	 * @function running
	 */
	describe('Running', () => {
		for (let e of objs) {
			e = e.replace('.js', '')

			let obj = require('./entitys/' + e)()

			describe(e.charAt(0).toUpperCase() + e.slice(1), () => {
				for (let a of api) {
					let name = a.slice(2).charAt(0).toUpperCase() +
						a.slice(3).replace('.js', '').replace(/_/g, ' ')

					it(name, (done) =>
						require('./api/' + a)(App, e, cookie, obj, done))
				}
			})
		}
	})

	/**
	 * limpa o banco de dados novamente apos finalizar os testes
	 *
	 * @function finishing
	 */
	describe('Finishing', () => {
		it('Clear DB', (done) => {
			async.auto([
				function (callback) {
					mongo.connection.db.dropDatabase()
						.then(() => callback())
						.catch(e => { throw e })
				}
			], e => {
				if (e) throw e

				done()
			})
		})
	})

})
