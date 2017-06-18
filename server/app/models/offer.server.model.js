const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @class Offer
 * @param {json} body json contendo os campos
 */
const Offer = new Schema({

	/**
	 * id do vendedor
	 * @memberof User
	 * @instance
	 */
	seller: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	
	/**
	 * id do comprador
	 * @memberof User
	 * @instance
	 */
	buyer: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	/**
	 * valor da oferta
	 * @memberof Offer
	 * @instance
	 */		
	value: String,

	/**
	 * estado da oferta
	 * @memberof Offer
	 * @instance
	 */		
	state: {
		type: String,
		enum: [
			'open',
			'closed',
			'pending',
			'done'
		]
	},

	/**
	 * nome atribuido pelo usuario
	 * @memberof Offer
	 * @instance
	 */	
	name: String,

	/**
	 * foto da oferta
	 * @memberof Offer
	 * @instance
	 */	
	photo: String,

	/**
	 * variavel de delecao logica
	 * @memberof Offer
	 * @instance
	 */	
	deleted: Boolean
})


/**
 * funcao de tratamento de dados antes de salvar no banco de dados.
 * inicia a variavel de delecao como falsa
 * @memberof Offer
 * @function pre_save
 */	
Offer.pre('save', function (next) {
	this.deleted = false
	next()
})

/**
 * campos de indexacao no banco de dados
 * @memberof Offer
 * @function index
 * @param {json} indexes - json com os indexes
 * e a forma de indexacao. <br>
 * ex: { name: 'text' }
 */	
Offer.index({
	name: 'text'
})

/**
 * funcao de conversao de dados e registro no banco
 * @memberof Offer
 * @param unconverted variavel para retorno
 * @deprecated retorna o que lhe e enviado
 */	
Offer.statics.registerKit2High = (unconverted) => unconverted

mongoose.model('Offer', Offer)

