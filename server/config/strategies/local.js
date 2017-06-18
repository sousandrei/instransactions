const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')

/**
 * declara a estrategia local de autenticacao do sistema.
 * <br>
 * procura no banco um usuario com as credenciais recebidas e
 * compara com os resultados da pesquisa por username.
 * por ultimo autentica a senha conforme a funcao de model de user
 *
 * @module config/strategies/local
 */
module.exports = () => {
	Passport.use('local', new LocalStrategy((username, password, done) => {
		User.findOne({
			username: username
		}, (err, user) => {
			/* istanbul ignore next */
			if (err)
				return done(err)

			if (!user)
				return done(null, false, {
					message: 'Invalid Username'
				})

			if (!user.authenticate(user, password))
				return done(null, false, {
					message: 'Invalid password'
				})

			return done(null, user)
		})
	}))
}