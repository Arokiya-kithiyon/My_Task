'use strict';
var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');

app.use(express.json());


app.post('/Sub',(req, res) =>{
 let catalystApp =catalyst.initialize(req);
 let datastore =catalystApp.datastore();
 let rowData =req.body;
 console.log(req.body)
 let table = datastore.table('PDC_cheque');
 let insertpromise = table.insertRow(rowData);
 insertpromise.then((row) => {
	console.log(row);
	res.send(row);
	
 }).catch(err => {
	console.log(err);
	res.send(err);
 });
 
});

app.post('/storeData',(req, res) =>{
	let catalystApp =catalyst.initialize(req);
	let datastore =catalystApp.datastore();
	let rowData =req.body;
	console.log(req.body)
	let table = datastore.table('Payment_Table');
	let insertpromise = table.insertRow(rowData);
	insertpromise.then((row) => {
	   console.log(row);
	   res.send(row);
	   
	}).catch(err => {
	   console.log(err);
	   res.send(err);
	});
	
   });

app.get('/retrive',(req, res) =>{
	console.log("hi")
	let catalystApp =catalyst.initialize(req);
       getData(catalystApp).then(result=>{
		res.send(result)
	   })
});
function getData(catalystApp){
	console.log("hi")
	return new Promise((resolve,reject)=>{
	catalystApp.zcql().executeZCQLQuery("select*from PDC_cheque").then(QueryResponse=>{
			resolve(QueryResponse);
			console.log(QueryResponse);
		}).catch(err=>{
			reject(err);
		})
	});
}


app.post('/save',(req, res) =>{
 let catalystApp =catalyst.initialize(req);
 let datastore =catalystApp.datastore();
 let rowData =req.body;
 console.log(req.body)
 let table = datastore.table('PDC_Bill');
 let insertpromise = table.insertRow(rowData);
 insertpromise.then((row) => {
	console.log(row);
	res.send(row);
 }).catch(err => {
	console.log(err);
	res.send(err);
 });

});

app.get(`/show/:value`, async (request,response)=>{

	const Name = request.params.value;

	let catalystApp =catalyst.initialize(request);
	var access_token;
	let connector = catalystApp.connection({
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
  	
const getApiUrl=`https://books.zoho.in/api/v3/invoices?customer_name=${Name}`;

const fetch_response= await fetch(getApiUrl,{
	method:"GET",
	headers:{
		"Authorization":"Zoho-oauthtoken "+access_token,
	}
});
const data = await fetch_response.json();
response.json(data);

});



app.get(`/view/:name`, async (request,response)=>{

	const name =request.params.name;

	let catalystApp =catalyst.initialize(request);
    var access_token;
	let connector = catalystApp.connection({
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

	const ApiUrl=`https://books.zoho.in/api/v3/bills?vendor_name=${name}`;
	const fetch_response= await fetch(ApiUrl,{
		method:"GET",
		headers:{
			"Authorization":"Zoho-oauthtoken "+access_token,
		}
	});
	const data = await fetch_response.json();
	response.json(data);
	
	});

app.post(`/pay`,async (request,response)=>{

	let content = request.body;
	
	console.log(content)

	let catalystApp = await catalyst.initialize(request);
    var access_token;
	let connector = catalystApp.connection({
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

	  
	const Url=`https://books.zoho.in/api/v3/customerpayments`;

let raw = JSON.stringify(content);
	const myHeaders={
		"Authorization":"Zoho-oauthtoken "+access_token,
		"Content-Type":"application/json"
	}
	const requestOptions = {
		method:"POST",
		headers:myHeaders,
		body:raw,
	}
	try
	{const fetch_response= await fetch(Url,requestOptions);
	const data = await fetch_response.json();
	response.json(data);}
	catch(er){
		console.log(er)

	}
	
	});



module.exports =app;
