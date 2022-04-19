 const url = 'http://localhost:3000';
//const url = '/api';

export function getUsers() {
  return fetch(`${url}/community`, {
    method: 'GET',
  });
}

export function subscribe(email) {
  return fetch(`${url}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `${email}`,
    }),
  });
}

export function unsubscribe() {
  return fetch(`${url}/unsubscribe`, { method: 'POST' });
}

export function postUsers() {
	return fetch(`${url}/analytics/user`,{ method: 'POST' });
}
