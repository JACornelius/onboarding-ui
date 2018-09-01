import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export const getTimeline = (callback) => {
	let xhttp = new XMLHttpRequest();
	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = () => {
	
		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
			console.log(xhttp.responseText);
			callback(JSON.parse(xhttp.responseText), null);
		}
		else if(xhttp.readyState != XMLHttpRequest.DONE){ 
			callback(null, null);

	    }
	    else{
	    	callback(null, "There was a problem on the server side, please try again later.");
	   
	    }
	}
	xhttp.open("GET", URL, true);
	xhttp.send();
}
