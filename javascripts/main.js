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

	$('#clicky-button').on('click', () => {
		$("#clicky-button").button('loading');
		$('#output').html("");
		let searchy = $('#imgur-search').val();
		imageList(searchy).then((dataFromImgur) => {
			$("#clicky-button").button('reset');
			dataFromImgur.forEach((image) => {
				$('#output').append(`<img src="${image.link}">`);
			}).catch((error) => {
				$("#clicky-button").button('reset');
			});
		});
	});


});







