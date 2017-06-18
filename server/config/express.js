const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express()

process.session = session({
	saveUninitialized: true,
	resave: true,
	secret: require('./config').SECRET,
	cookie: {
		maxAge: 12 * 60 * 60 * 1000,
		httpOnly: true
	},
	store: new MongoStore({
		mongooseConnection: global.DB.connection,
		autoRemove: 'interval',
		autoRemoveInterval: 1
	})
})

/**
 * configura a instancia do 'express' usada:
 * <br> declara o modo de logging das requisicoes
 * <br> adiciona compressao nos requests
 * <br> declara o parseador de jsons e urls
 * <br> declara method-override, suportando clientes antigos
 * <br> declara as pastas de arquivos estaticos
 * <br> declara o modulo se registro de sessao
 * <br> seta os headers do sistema
 * <br> inicializa o modulo de autenticacao
 * <br> inicializa todas as todas do sistema
 *
 * @module config/mongoose
 */
module.exports = () => {
	/* istanbul ignore if */
	if (process.env.NODE_ENV != 'test')
		// app.use(require('morgan')('dev'))
		app.use(require('morgan')('common', {
			skip: function (req, res) {
				if (req.originalUrl.indexOf('.') > -1)
					return res.statusCode
				// if (res.statusCode == 200 || res.statusCode == 304)
				// return res.statusCode
			}
		}))

	app.use(require('compression')())

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	app.use(require('method-override')())

	app.use(process.session)

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept')

		next()
	})

	app.use(passport.initialize())
	app.use(passport.session())

	require('../app/routes/offer.server.routes.js')(app)
	require('../app/routes/user.server.routes.js')(app)
	require('../app/routes/index.server.routes.js')(app)

	return app
}	