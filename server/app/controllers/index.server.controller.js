/**
 * @module controller/index
 */

/**
 * trata os parametros passados na URL
 * para query e text search e limpa
 * campos proibidos.
 * apos terminar, segue com a proxima
 * funcao da rota
 *
 * @function queryClean
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.queryClean = (req, res, next) => {

	if (!req.query.page)
		req.query.page = 0

	req.page = req.query.page

	delete req.query._id
	delete req.query.__v
	delete req.query.salt
	delete req.query.blocked
	delete req.query.password
	delete req.query.page

	if (req.query.query)
		req.query = { $text: { $search: req.query.query } }

	return next()
}

/**
 * checka permissao do usuario
 *
 * @function apiLoggedIn
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.isAuthorized = (req, res, next) => {
	if (process.env.NODE_ENV == 'development')
		return next()

	if (!req.user.routes[req.route.path][String(req.method).toLowerCase()])
		return res.status(403).end()

	return next()
}

/**
 * retorna o resultado da query passada,
 * caso nao ha query, retorna todas as entidades
 *
 * @function apiLoggedIn
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated() || process.env.NODE_ENV == 'development')
		return next()

	return res.status(401).end()
}

/**
 * renderiza o sistema no requerente
 *
 * @function render
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @static
 * @deprecated nao usamos site ainda
 */
exports.render = (req, res) => {

	return res.end('pagina web')

	// return res.sendFile(require('path')
	// 	.join(__dirname, '../../public/index.html'))
}