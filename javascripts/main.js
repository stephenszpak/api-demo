"use strict";

let apiKeys = {};

let imageList = (searchText) => {
	return new Promise ((resolve, reject) => {
		$.ajax({
			method: 'GET',
			url: 'apiKeys.json'
		}).then((response) => {
			// console.log("response", response);
			apiKeys = response;
			let authHeader = 'Client-ID ' + apiKeys.client_id;

	$.ajax({
		method: 'GET',
		headers : {
			'Authorization': authHeader
		},
		url: `https://api.imgur.com/3/gallery/t/${searchText}`
	}).then((response) =>{
		// console.log("imgur response", response);
		resolve(response.data.items);
	}, (errorResponse) => {
		// console.log("imgur fail", errorResponse);
		reject(errorResponse);
	});




			
		}, (errorResponse) => {
			console.log("errorResponse", errorResponse);
		});
		
	});
};


$(document).ready(function() {
	console.log("jquery is ready");
	imageList('cat').then((dataFromImgur) => {
		console.log('dataFromImgur', dataFromImgur);
	});
});







