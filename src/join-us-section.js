export function createJoinSection(title, subButton, formClass) {
  const sectionContent = `<h2 class="app-title">
      ${title}
    </h2>
    
    <h3 class="app-subtitle">
      Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
    </h3>

    <form class="app-section--form-join-us ${formClass}" name="EmailForm">
 
      <input class="app-section--email-join-us" type="email" id="user-email" name="email" placeholder="Email">
			<label for="user-email"></label>
      </div>
      
      <button type="submit" class="app-section__button app-section__join-us--button" id="subBtn">${subButton}</button>

    </form>`;

  return sectionContent;
}
