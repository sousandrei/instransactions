const Passport = require('passport')
const Mongoose = require('mongoose')
const User = Mongoose.model('User')

/**
 * implementa as funcoes nativas da
 * bibloteca passport: 'serializeUser' e 'deserializeUser'
 * <br>
 * ao serializar, guarda o id, ap padrao daquele usuario e seu kit padrao
 *
 * @module config/passport
 */
module.exports = () => {

	Passport.serializeUser((user, done) => {
		done(null, {
			id: user.id,
			routes: user.routes
		})
	})

	Passport.deserializeUser((user, done) => {
		User.findOne({
			_id: user.id
		}, '-password -salt', (err, user) => {
			done(err, user)
		})
	})

	require('./strategies/local.js')()
}