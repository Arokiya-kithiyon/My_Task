var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
var fetch = require('node-fetch');
const { request, response } = require('../my_task_function');
app.use(express.json());

function  sendMail(){

	console.log("hello")

	app.post(`/`,async (request,response)=>{
		const name =request.params.name;

		let catalystApp = await catalyst.initialize(request);
		var access_token;
		var connector = await catalystApp.connection({
			connectorName:{
				client_id:`1000.XJ86JYGMFRVUK5OWVNO8Q9S0Q2OY0L`,
				client_secret:`6342d4f4caf22ba9ba15992c0e51bdf4d2be09324a`,
				auth_url:`https://accounts.zoho.in/oauth/v2/token`,
				refresh_url:`https://accounts.zoho.in/oauth/v2/token`,
				refresh_token:`1000.0f9c7de16e1834085cffefb9e720f3b8.a36f16c06efd8a65def47b1552a496df`
			}
		}).getConnector(`connectorName`);
		await connector.getAccessToken().then((accessToken)=>{
				access_token=accessToken;
		  
		});

		let content ={
            to_mail_ids:[
				"kithiyon434@gmail.com"
			],
			subject:"invoice mail",

		};

let raw = JSON.stringify(content);
const myHeaders={
	"Authorization":"Zoho-oauthtoken "+access_token,
	"Content-Type":"application/json"
};
const requestOptions = {
	method:"POST",
	headers:myHeaders,
	body:raw,
};

		const Url=`https://books.zoho.com/api/v3/invoices/1078364000000016070/email`;
		const fetch_response= await fetch(Url,requestOptions);
		const data = await fetch_response.json();
		response.json(data);
		console.log(data)

	});



}

module.exports = (cronDetails, context) => {
	console.log('Hello from index.js');

    try {
		sendMail();
		context.closeWithSuccess();
	} catch (error) {
		console.log("mail not sent",error)
		context.closeWithFailure();
	}
	
	
};
