const subscribeHandler = () => {
  const userEmail = document.querySelector('#user-email');
  const postObj = {
    email: `${userEmail.value}`,
  };
  const post = JSON.stringify(postObj);
  const url = 'http://localhost:3000/subscribe';

  const xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.send(post);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('Your email is submited!');
    } else if (xhr.status === 422) {
      alert(xhr.response);
    }
  };
};

export default subscribeHandler;
