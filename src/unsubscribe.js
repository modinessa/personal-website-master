const unsubscribeHandler = () => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/api/unsubscribe', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert('You are unsubscribed!  We will miss you! :(');
    } else if (xhr.status === 422) {
      alert(xhr.response);
    }
  };
};

export default unsubscribeHandler;
