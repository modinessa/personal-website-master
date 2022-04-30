
const url = '/api/analytics/user';
let dataBatch = [];

onmessage = function(data) {
	dataBatch.push(data.data.message);

	if(dataBatch.length == 5) {
		postUsers(dataBatch)
		.then((response) => {
			dataBatch = [];
			if(response.ok) {
				postMessage('Users were sent!');
			}
		});
	}
}

function postUsers(data) {
  return fetch(`${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
} 
