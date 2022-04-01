const subscribeHandler = () => {
  const userEmail = document.querySelector('#user-email');
  const postObj = {
    email: `${userEmail.value}`,
  };
  const post = JSON.stringify(postObj);

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/api/subscribe', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.send(post);

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert('You are subscribed! Happy to see you! :)');
    } else if (xhr.status === 422) {
      alert(xhr.response);
    }
  };
};

export default subscribeHandler;
