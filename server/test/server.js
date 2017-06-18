/*eslint-env mocha */
process.env.NODE_ENV = 'test'

const faker = require('faker')
const assert = require('assert')
const app = require('../index.js')
const supertest = require('supertest')
const { HTTP } = require('../config/config')
const { isArray, isEqual } = require('lodash')

const User = require('mongoose').model('User')

let user = require('./entitys/user')()
let cookie

/**
 * @module test/server
 */

describe('servidor', () => {
	/**
	 * antes de cada teste, deleta os usuarios
	 *
	 * @function before
	 */
	before(() => {
		require('mongoose').model('User').remove().exec()
	})

	/**
	 * depois de cada teste deleta os usuarios
	 *
	 * @function after
	 */
	after(() => {
		require('mongoose').model('User').remove().exec()
	})

	/**
	 * testa se a porta de HTTPs do servidor esta online
	 *
	 * @function httpPortOnline
	 */
	it('porta HTTPS online', (done) => {
		supertest(app)
			.get('/')
			.end((err) => {
				if (err)
					throw err

				done()
			})
	})

	/**
	 * cria um usuario para operacoes futuras
	 *
	 * @function createUser
	 */
	it('create user', (done) => {
		new User(user).save((err, result) => {
			if (err)
				assert.ifError(err)

			result.password = user.password
			user = result

			done()
		})
	})


	describe('rotas API', () => {
		/**
		 * testa o redirecionamento ao requisitar uma rota de api desconhecida
		 *
		 * @function unknownApiRoute
		 */
		it('unknown api route', function (done) {
			supertest(app)
				.get('/api/rotaAleatoria')
				.expect(404)
				.end((err) => {
					if (err)
						throw err

					done()
				})

		})
		/**
		 * testa o redirecionamento ao requisitar uma rota de api protegida
		 * sem se autenticar
		 *
		 * @function unAuthApiRoute
		 */
		it('unAuth api route', function (done) {
			supertest(app)
				.get('/api/users')
				.expect(401)
				.end((err) => {
					if (err)
						throw err

					done()
				})

		})

		/**
		 * testa o login com username errado
		 *
		 * @function loginWrongUsername
		 */
		it('login wrong username', (done) => {
			supertest(app)
				.post('/api/login')
				.expect(401)
				.send({
					username: faker.internet.userName(),
					password: user.password
				})
				.end((err) => {
					if (err)
						throw err

					done()
				})
		})

		/**
		 * testa o login com password errado
		 *
		 * @function loginWrongPassword
		 */
		it('login wrong password', (done) => {
			supertest(app)
				.post('/api/login')
				.expect(401)
				.send({
					username: user.username,
					password: faker.internet.password()
				})
				.end((err) => {
					if (err)
						throw err

					done()
				})
		})

		/**
		 * testa o login
		 *
		 * @function login
		 */
		it('login', (done) => {
			supertest(app)
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

		/**
		 * testa a rota de retornar ao usuario logado seus proprios dados
		 * sem estar logado
		 *
		 * @function selfUnAuth
		 */
		it('self unAuth', function (done) {
			supertest(app)
				.get('/api/self')
				.expect(401)
				.end((err) => {
					if (err)
						throw err

					done()
				})
		})

		/**
		 * testa a rota de retornar ao usuario logado seus proprios dados
		 *
		 * @function selfAuth
		 */
		it('self', function (done) {
			supertest(app)
				.get('/api/self')
				.set('Cookie', cookie)
				.expect(200)
				.end((err, res) => {
					if (err)
						throw err

					for (let k in res.body)
						if (isArray(res.body[k]))
							assert(isEqual(String(res.body[k]),
								String(user[k])))
						else
							assert(String(res.body[k]) == String(user[k]))

					done()
				})
		})

	})

	describe('rotas UI', () => {
		/**
		 * testa redirecionamento em rota desconhecida
		 *
		 * @function unAuthRoute
		 */
		it('unknown route', function (done) {
			supertest(app)
				.get('/rotaAleatoria')
				.expect(302)
				.end((err) => {
					if (err)
						throw err

					done()
				})

		})

	})

})
