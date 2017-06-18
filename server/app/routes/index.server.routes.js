let { render, isLoggedIn, isAuthorized }
	= require('../controllers/index.server.controller')



module.exports = function (app) {
	//Nao implementado a rota de webpage
	app.get('/', isLoggedIn, isAuthorized, render)

	app.get('/api/*', (req, res) => res.status(404).end())
	app.get('*', (req, res) => { res.redirect('/login') })
}


//=======================================================

/**
 * @apiDefine generalErrors
 *
 * @apiError (Error) {number} statusCode HTTP status code do erro
 *
 * @apiErrorExample Bad Request:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample Not Found:
 *     HTTP/1.1 404 Not Found
 
 * @apiErrorExample Internal Server Error:
 *     HTTP/1.1 500 Internal Server Error
 *
 */

//=======================================================

/**
 * @apiDefine createResponse
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * HTTP/1.1 201 OK
 *  {
 *  	"id": "507f191e810c19729de860ea"
 *  }
 */

//=======================================================

/**
 * @apiDefine updateResponse
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * 	HTTP/1.1 200 OK
 */

//=======================================================

/**
 * @apiDefine deleteResponse
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * HTTP/1.1 200 OK
 */

//=======================================================

/**
 * @apiDefine findResponse
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * HTTP/1.1 200 OK
 *  { ... }
 */

//=======================================================

/**
 * @apiDefine searchResponse
 *
 * @apiSuccessExample {json} Exemplo de Resposta:
 * HTTP/1.1 200 OK
 *  [{ ... }]
 */

//=======================================================

/**
 * @apiDefine cookie
 * @apiHeaderExample {json} Exemplo de cookie no Header:
 *  {
 *  	"Cookie": "['connect.sid=%Cokkie%; Path=/;Expires= %Date%; HttpOnly']"
 *  }
 */

//=======================================================