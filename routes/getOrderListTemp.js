/***************************** temp module ****************************************/

var url = require('url');

var log4js = require('log4js');
var log = log4js.getLogger("GetOrderList");
var resourceLoader = require('../util/ResourceLoader').getInstance();


var GET_USER_DETAIL_KEY = resourceLoader.getResourceById('API_KEY' , 'GET_ORDER_DTL');


var orderList = [

	{

		orderID: 100001,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '500 Rollingbrook Drive',
		city: 'Charlotte',
		state: 'NC',
		zip: 28217,
		order_party_name: 'Steven Pettit'


	},

	{

		orderID: 100002,
		order_received_date: '09-04-2014',
		order_due_date: '09-17-2014',
		order_addres: '10001 S Tryon St',
		city: 'Charlotte',
		state: 'NC',
		zip: 28273,
		order_party_name: 'Steven Pettit'


	},

	{

		orderID: 100003,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '100 S Tryon St',
		city: 'Charlotte',
		state: 'NC',
		zip: 28280,
		order_party_name: 'Steven Pettit'


	},

	{

		orderID: 100004,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '8111 Concord Mills Blv',
		city: 'Concord',
		state: 'NC',
		zip: 28027,
		order_party_name: 'Steven Pettit'


	},


	{

		orderID: 100005,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '7454 Two Notch Rd',
		city: 'Columbia',
		state: 'SC',
		zip: 29223,
		order_party_name: 'Steven Pettit'


	},


	{

		orderID: 100006,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '77124 Firelane Rd',
		city: 'Columbia',
		state: 'SC',
		zip: 29223,
		order_party_name: 'Steven Pettit'


	},


	{

		orderID: 100007,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '1453 N Cherry Rd',
		city: 'Rock Hill',
		state: 'SC',
		zip:  29732,
		order_party_name: 'Steven Pettit'


	},

	{

		orderID: 100008,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '4485 Cureton Ferry Rd',
		city: 'Catawba',
		state: 'SC',
		zip:  29704,
		order_party_name: 'Steven Pettit'


	},


	{

		orderID: 100009,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '558 S Pleasantburg Dr',
		city: 'Greenville',
		state: 'SC',
		zip:   29607,
		order_party_name: 'Steven Pettit'


	},

	{

		orderID: 100010,
		order_received_date: '09-03-2014',
		order_due_date: '09-17-2014',
		order_addres: '106 Berkshire St',
		city: 'Greensboro',
		state: 'NC',
		zip:   27403,
		order_party_name: 'Steven Pettit'


	}





];



var setHeaderForCORS = function(req, res, next) {
		log.debug('Setting up CORS for services');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		return next();
	  

	}

var authenticateAPIKey = function(req, res, next){
	
	log.debug('apiKey check');
	var query = url.parse(req.url,true).query;
	var apiKey 	= query.apiKey;
	var orderID = query.orderID;


	if(apiKey !== GET_USER_DETAIL_KEY){
		log.error('apiKey wrong' , apiKey);	
		res.status(403).send({data:'forbidden'});
	}
	else {
		log.debug('apiKey validated correct');	

		if(orderID){
			req.orderID = orderID;
			return next();
		}

		else{

			res.status(403).send({data: 'NO-ORDERID'});

		}

			
	}
}

var getOrderList = function (req, res) {

		
		try{

			res.status(200).send({data: orderList});


		}
		catch(error){

			log.error('Class:GetOrderList  Error Message: Error Occured', error.message);
		}


	}




module.exports = [setHeaderForCORS,authenticateAPIKey,getOrderList];