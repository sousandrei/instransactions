const Offer = require('mongoose').model('Offer')
const { pageSize } = require('../../config/config')

/**
 * @module controller/offer 
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
	Offer.find(req.query)
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
	Offer.find(req.params,
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
 *
 * @function post
 * @param {JSON} req request object
 * @param {JSON} res response object
 * @param {function} next next function
 * @static
 */
exports.post = (req, res) => {
	new Offer(req.body).save((err, result) => {
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
exports.patch = (req, res, next) => {
	Offer.findOneAndUpdate(req.params,
		req.body, { new: true }, (err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)

			res.json(result)

			req.result = result.toJSON()
			return next()
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
exports.put = (req, res, next) => {
	Offer.findOneAndUpdate(req.params,
		req.body, { new: true }, (err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)

			res.json(result)

			req.result = result.toJSON()
			return next()
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
exports.delete = (req, res, next) => {
	Offer.findByIdAndUpdate(req.params,
		{ deleted: true }, (err, result) => {
			/* istanbul ignore if  */
			if (err)
				return res.status(500).json(err)

			res.json(result)

			req.result = result.toJSON()
			return next()
		})
}