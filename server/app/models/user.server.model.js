const Mongoose = require('mongoose')
const Crypto = require('crypto')
const Schema = Mongoose.Schema

/**
 * @class User
 * @param {JSON} body json contendo os campos
 */
const User = new Schema({
	/**
	 * primeiro nome
	 * @memberof User
	 * @instance
	 */		
	firstName: String,
	
	/**
	 * segundo nome
	 * @memberof User
	 * @instance
	 */		
	lastName: String,

	/**
	 * segundo nome
	 * @memberof User
	 * @instance
	 */		
	friends: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
	
	/**
	 * cadastro de pessoa fisica - cpf
	 * @memberof User
	 * @instance
	 */	
	cpf: String,

	/**
	 * telefone
	 * @memberof User
	 * @instance
	 */	
	phone: String,
	
	/**
	 * string com o blob da foto
	 * @memberof User
	 * @instance
	 */	
	photo: String,

	/**
	 * email
	 * @memberof User
	 * @instance
	 */	
	email: String,

	/**
	 * nome de usuario, unico no banco
	 * @memberof User
	 * @instance
	 */
	username: {
		type: String,
		unique: true,
		required: 'Username is required',
		trim: true
	},
	/**
	 * senha, maior de 6 digitos
	 * @memberof User
	 * @instance
	 */
	password: {
		type: String,
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	/**
	 * salt unico para cada entidade
	 * @memberof User
	 * @instance
	 */
	salt: String,

	/**
	 * variavel que armazena as rotas e permissoes de cada
	 * @memberof User
	 * @instance
	 */
	routes: Object,

	/**
	 * variavel de bloqueio logico
	 * @memberof User
	 * @deprecated nao esta sendo usada
	 * @instance
	 */
	blocked: Boolean,

	/**
	 * variaval de delecao logica
	 * @memberof User
	 * @instance
	 */
	deleted: Boolean

})

/**
 * funcao de tratamento de dados antes de salvar no banco de dados.
 * inicia a variavel de delecao como falsa, inicializa o salt
 * aleatorio e aplica um algoritmo de hash no password
 * @memberof User
 * @function pre_save
 */
User.pre('save', function (next) {
	this.deleted = false

	this.salt = Crypto.randomBytes(16).toString('base64')

	/* istanbul ignore else */
	if (this.password)
		this.password = this.hashPassword(this)

	next()
})

/**
 * funcao de tratamento de dados antes de atualizar no banco de dados.
 * se a senhar for alterada, troca a string de hash e
 * aplica o algoritmo de hash na nova senha
 * @memberof User
 * @function pre_findOneAndUpdate
 */
User.pre('findOneAndUpdate', function (next) {
	this.salt = Crypto.randomBytes(16).toString('base64')

	if (this.getUpdate().password)
		this.model.update({}, {
			password: this.model().hashPassword(this.getUpdate())
		}).exec()

	next()
})

/**
 * aplica o algoritmo de hash no user
 * @memberof User
 * @function hashPassword
 * @param {JSON} user user com pelo menos uma senha e um salt setados
 * @returns {JSON} user com a senha hasheada
 */
User.methods.hashPassword = (user) => Crypto.pbkdf2Sync(String(user.password),
	String(user.salt), 10000, 64, 'sha256').toString('base64')

/**
 * compara a senha passada com a hasheada no user
 * @memberof User
 * @function authenticate
 * @param {JSON} user user a ser comparado
 * @param {string} password senha a ser comparada
 * @returns {bool} true para senhas iguais false para diferentes
 */
User.methods.authenticate = (user, password) => String(user.password) ==
	String(User.methods.hashPassword({ password: password, salt: user.salt }))

/**
 * campos de indexacao no banco de dados
 * @memberof User
 * @function index
 * @param {JSON} indexes - json com os indexes
 * e a forma de indexacao. <br>
 * ex: { name: 'text' }
 */
User.index({
	firstName: 'text',
	LastName: 'text',
	cpf: 'text',
	phone: 'text',
	email: 'text',
	username: 'text'
})

Mongoose.model('User', User)
