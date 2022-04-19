// const url = 'http://localhost:3000';
const url = 'api/';
let dataBatch = [];

onmessage = function(data) {
	dataBatch.push(data.data.message);

	if(dataBatch.length == 5) {
		postUsers()
		.then(() => {
			dataBatch = [];
			postMessage('Done!')});
	}
}

function postUsers() {
  return fetch(`${url}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: [],
  });
} 
