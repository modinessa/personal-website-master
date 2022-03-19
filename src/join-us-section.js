const createSection = (title, subButton, formClass) => {
    const joinSection = document.createElement('section');
    const parentNode = document.querySelector('main');
    const footerNode = document.querySelector('footer');

    joinSection.className = 'app-section app-section--image-joun-us';

    joinSection.innerHTML = `<h2 class="app-title">
      ${title}
    </h2>
    
    <h3 class="app-subtitle">
      Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
    </h3>

    <form class="app-section--form-join-us ${formClass}" name="EmailForm">

      <div class="app-section--submit-join-us" >
        <label for="user-email">Email</label>
      <input class="app-section--email-join-us" type="email" id="user-email" name="email">
      </div>
      
      <button type="submit" class="app-section__button app-section__button--subscribe">${subButton}</button>
    </form>`;

    parentNode.insertBefore(joinSection, footerNode);

    document.querySelector('.app-section__button--subscribe').addEventListener('click', b => {
        b.preventDefault();
        let userEmail = document.querySelector('.app-section--email-join-us').value;
        console.log(userEmail);
    });
};

export default createSection;
