import { postUsers } from './js/server-requests.js';

onmessage = function(data) {
	console.log(data.data.message);
	const dataBatch = [];
	dataBatch.push(data);
	if(dataBatch.length == 5) {
		dataBatch = [];
		postMessage(postUsers());
	}
}
