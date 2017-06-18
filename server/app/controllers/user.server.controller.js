const User = require('mongoose').model('User')
const Passport = require('passport')
const { pageSize } = require('../../config/config')

/**
 * @module controller/user 
 */

/**
 * retorna o resultado da query passada,
 * caso nao ha query, retorna todas as entidades
 *
 * @function get
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @static
 */
exports.get = (req, res) => {
	User.find(req.query, '-password -salt')
		.limit(pageSize)
		.skip(req.page * pageSize)
		.exec((err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)
			else
				return res.json(result)
		})
}

/**
 * retorna o resultado da query com os parametros passados.
 *
 * @function getOne
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @static
 */
exports.getOne = (req, res) => {
	User.find(req.params, '-password -salt',
		(err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)
			else if (result.length > 0)
				return res.json(result[0])
			else
				return res.status(404).end()
		})
}

/**
 * recebe uma entidade e cria no banco a entrada.
 * <br>
 * caso seja enviado com o header 'mid-monkey',
 * converte os ids para ids usados pelo mid
 *
 * @function post
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.post = (req, res) => {
	new User(req.body).save((err, result) => {
		/* istanbul ignore if  */
		if (err)
			return res.status(500).json(err)
		else
			return res.json({ _id: result._id })
	})
}

/**
 * recebe uma entidade, podendo ser alguns campos apenas,
 * faz a atualizacao no banco com os dados novos
 *
 * @function patch
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.patch = (req, res) => {
	User.findOneAndUpdate(req.params,
		req.body, { new: true }, (err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)
			else{
				delete result.password
				delete result.salt
				
				return res.json(result)
			}
		})
}

/**
 * recebe uma entidade
 * faz a atualizacao no banco com os dados novos
 *
 * @function patch
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 * @deprecated funcao com processamento igual a de patch
 */
exports.put = (req, res) => {
	User.findOneAndUpdate(req.params,
		req.body, { new: true }, (err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)
			else
				return res.json(result)
		})
}

/**
 * deleta logicamente a entidade no banco de dados,
 * marcando como 'deleted'
 * envia o resultado da operacao para o requerente
 *
 * @function delete
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.delete = (req, res) => {
	User.findByIdAndUpdate(req.params,
		{ deleted: true }, (err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)
			else
				return res.json(result)
		})
}

/**
 * retorna para o requerente o usuario que ele usou
 * para adquirir permissao no sistema
 *
 * @function self
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @static
 */
exports.self = (req, res) => {
	if (req.user)
		return res.json(req.user)
	else
		return res.status(401).end()
}

/**
 * destroi a sessao do requerente
 * eredireciona paraa home do client
 *
 * @function logOut
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @static
 */
exports.logOut = (req, res) => {
	req.logOut()
	req.session.destroy(() => {
		return res.status(200).redirect('/')
	})
}

exports.loginApi = (req, res) => res.end()

/**
 * autentica o requerente no banco de dados
 * e chama a proxima funcao na rota ou retorna 401
 * caso as credenciais sejam invalidas
 *
 * @function localAuth
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.localAuth = (req, res, next) => {
	Passport.authenticate('local', (err, user) => {
		/* istanbul ignore if */
		if (err)
			return next(err)

		/* istanbul ignore if */
		if (!user)
			return res.status(401).end()

		req.logIn(user, (err) => {
			/* istanbul ignore if */
			if (err)
				return next(err)

			// return res.redirect('/home')
			return next()
		})

	})(req, res, next)
}