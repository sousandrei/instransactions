const User = require('../../app/controllers/user.server.controller')
const { queryClean, isLoggedIn } =
	require('../../app/controllers/index.server.controller')

module.exports = (app) => {
	app.route('/api/users')
		.get(isLoggedIn, queryClean, User.get)
		.post(isLoggedIn, User.post)

	app.route('/api/user/:_id')
		.get(isLoggedIn, queryClean, User.getOne)
		.put(isLoggedIn, User.put)
		.patch(isLoggedIn, User.patch)
		.delete(isLoggedIn, User.delete)

	app.route('/api/login')
		.post(User.localAuth, User.loginApi)

	app.route('/api/self')
		.get(User.self)

	app.get('/api/logout', User.logOut)
}

//=======================================================

/**
 * @apiDefine bodyUser
 * @apiParam (Objeto) {string} id id no banco de dados
 * @apiParam (Objeto) {string} firstName nome do usuario
 * @apiParam (Objeto) {string} lastName sobrenome do usuario
 * @apiParam (Objeto) {object} friends lista de amigos do usuario
 * @apiParam (Objeto) {string} cpf cadastro de pessoa fisica
 * @apiParam (Objeto) {string} phone telefone do usuario
 * @apiParam (Objeto) {string} photo fotografia do usuario
 * @apiParam (Objeto) {string} email email do usuario
 * @apiParam (Objeto) {string} username nome de usuario unico
 * @apiParam (Objeto) {string} password senha para ser encriptada
 */

//=======================================================

/**
 * @apiDefine jsonListUser
 * @apiSuccessExample {json} Response Body:
 *  [{
 *  	"id": "507f191e810c19729de860ez"
 *  	"firstName": "joao",
 *  	"lastName": "silva",
 *  	"friends": [
 *  		"507f191e810c19729de860ea",
 *  		"507f191e810c19729de860eb"
 *  	],
 *  	"cpf": "12345678901",
 *  	"phone": "55 61 9 9987-6543",
 *  	"photo": "blob://asdasdasdad",
 *  	"email": "example@example.com",
 *  	"username": "nomeSobrenome",
 *  	"password": "senhaForte123",
 *  	"routes": [
 *  		"/api/admin": {
 *   			"GET": true
 *   			...
 *  		}
 *  	]
 *  }, ...]
 */

//=======================================================

/**
 * @apiDefine jsonUser
 * @apiSuccessExample {json} Response Body:
 *  {
 *  	"id": "507f191e810c19729de860ez"
 *  	"firstName": "joao",
 *  	"lastName": "silva",
 *  	"friends": [
 *  		"507f191e810c19729de860ea",
 *  		"507f191e810c19729de860eb"
 *  	],
 *  	"cpf": "12345678901",
 *  	"phone": "55 61 9 9987-6543",
 *  	"photo": "blob://asdasdasdad",
 *  	"email": "example@example.com",
 *  	"username": "nomeSobrenome",
 *  	"password": "senhaForte123",
 *  	"routes": [
 *  		"/api/admin": {
 *   			"GET": true
 *   			...
 *  		}
 *  	]
 *  }
 */

//=======================================================

/**
 * @api {get} api/user/:id Procurar por Id
 * @apiName GetUserById
 * @apiGroup User
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} id id unico da entidade
 *
 * @apiUse bodyUser
 * @apiUse jsonUser
 *
 * @apiUse generalErrors
 *
 */

//=======================================================

 /**
 * @apiGroup User
 * @apiName GetUser
 * @api {Get} api/users Pesquisar/Retornar todos
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} [actuator_type] api/users?actuator_type=barrier
 * @apiParam {string} [name] api/users?name=porta
 * @apiParam {string} [ip] api/users?ip=192.168.0.1
 * @apiParam {string} [mac_addr] api/users?mac_addr=AD:SDJ:12H:1736:DE
 *
 *
 * @apiUse bodyUser
 * @apiUse jsonListUser
 *
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup User
 * @apiName PostUser
 * @api {post} api/users Criar
 *
 * @apiPermission required
 *
 * @apiUse cookie
 * 
 * @apiUse bodyUser
 * @apiUse jsonUser
 *
 * @apiUse createResponse
 *
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup User
 * @apiName PatchUser
 * @api {patch} api/user/:id Atualizar
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} id id unico da entidade
 * 
 * @apiUse bodyUser
 * @apiUse jsonUser
 
 * @apiUse updateResponse
 
 * @apiUse generalErrors
 * 
 */

//=======================================================

/**
 * @apiGroup User
 * @apiName DeleteUser
 * @api {delete} api/user/:id Deletar
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} id id unico da entidade
 *
 * @apiUse deleteResponse
 * 
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup User
 * @apiName LoginUser
 * @api {post} api/login Login
 *
 * @apiParamExample {json} Formato do body:
 *  {
 *  	"username": "nomeSobrenome",
 *  	"password": "senhaForte123"
 *  }
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * HTTP/1.1 200 OK
 *
 * 
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup User
 * @apiName LogoutUser
 * @api {get} api/logout Logout
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * HTTP/1.1 200 OK
 *
 * 
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup User
 * @apiName GetSelfUser
 * @api {get} api/self Retornar si mesmo
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * {
 *  	"id": "507f191e810c19729de860ez",
 *  	"ap": "507f191e810c19729de860ea",
 *  	"kit": "507f191e810c19729de860eb"
 * }
 *
 * 
 * @apiUse generalErrors
 */

//=======================================================