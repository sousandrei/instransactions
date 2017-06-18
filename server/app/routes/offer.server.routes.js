const Offer = require('../../app/controllers/offer.server.controller')
const { queryClean, isLoggedIn, isAuthorized } =
	require('../../app/controllers/index.server.controller')

module.exports = function (app) {

	app.route('/api/offers')
		.get(isLoggedIn, isAuthorized, queryClean, Offer.get)
		.post(isLoggedIn, isAuthorized, Offer.post)

	app.route('/api/offer/:_id')
		.get(isLoggedIn, isAuthorized, queryClean, Offer.getOne)
		.put(isLoggedIn, isAuthorized, Offer.put)
		.patch(isLoggedIn, isAuthorized, Offer.patch)
		.delete(isLoggedIn, isAuthorized, Offer.delete)

}

//=======================================================

/**
 * @apiDefine bodyOffer
 * @apiParam (Objeto) {string} id id no banco de dados
 * @apiParam (Objeto) {string} seller id do vendedor
 * @apiParam (Objeto) {string} buyer id do comprador
 * @apiParam (Objeto) {int} value valor da oferta
 * @apiParam (Objeto) {string} name nome da oferta
 * @apiParam (Objeto) {string} photo foto da oferta
 * @apiParam (Objeto) {string} state estado da oferta
 * <br>
 * valores possiveis: 'open', 'closed', 'pending', 'done'
 */

//=======================================================

/**
 * @apiDefine jsonListOffer
 * @apiSuccessExample {json} Exemplo de array com JSON's:
 *  [{
 *  	"id": "507f191e810c19729de860ez"
 *  	"seller": "507f191e810c19729de860aa",
 *  	"buyer": "507f191e810c19729de860ea",
 *  	"value": 1952,
 *  	"name": "carro novo",
 *  	"photo": "blob://asddf",
 *  	"state": "done"
 *  }, ...]
 */

//=======================================================

/**
 * @apiDefine jsonOffer
 * @apiSuccessExample {json} Exemplo de JSON:
 *  {
 *  	"id": "507f191e810c19729de860ez"
 *  	"seller": "507f191e810c19729de860aa",
 *  	"buyer": "507f191e810c19729de860ea",
 *  	"value": 1952,
 *  	"name": "carro novo",
 *  	"photo": "blob://asddf",
 *  	"state": "done"
 *  }
 */


//=======================================================

/**
 * @apiGroup Offer
 * @apiName FindById
 * @api {Get} api/offer/:id Procurar por Id
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} id id unico da entidade
 *
 * @apiUse bodyOffer
 * @apiUse jsonOffer
 *
 * @apiUse generalErrors
 */

//=======================================================

 /**
 * @apiGroup Offer
 * @apiName GetOffer
 * @api {Get} api/offer Pesquisar/Retornar todos
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} [tipo] api/access_points?tipo=rfid123
 * @apiParam {string} [name] api/access_points?name=cracha
 *
 * @apiUse bodyOffer
 * @apiUse jsonListOffer
 *
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup Offer
 * @apiName PostOffer
 * @api {post} api/offer Criar
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiParam {string} id id unico da entidade
 *
 * @apiUse bodyOffer
 * @apiUse jsonOffer
 *
 * @apiUse createResponse
 *
 * @apiUse generalErrors
 */

//=======================================================

/**
 * @apiGroup Offer
 * @apiName PatchOffer
 * @api {patch} api/offer/:id Patch Offer
 *
 * @apiPermission required
 *
 * @apiUse cookie
 *
 * @apiUse bodyOffer
 * @apiUse jsonOffer
 *
 * @apiUse updateResponse
 *
 * @apiUse generalErrors
 * 
 */

//=======================================================

/**
 * @apiGroup Offer
 * @apiName DeleteOffer
 * @api {delete} api/offer/:id Deletar
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