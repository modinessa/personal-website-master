window.addEventListener('DOMContentLoaded', event => {
    class SectionCreator {
        create(type) {
            switch (type) {
                case 'standart':
                    return new JoinSection('Join Our Program', 'Subscribe');
                case 'advanced':
                    return new JoinSection(
                        'Join Our Advanced Program',
                        'Subscribe to Advanced Program'
                    );
            }
        }
    }

    class JoinSection {
        joinSection = null;

        constructor(title, subButton) {
            this.title = title;
            this.subButton = subButton;
            this.render();
        }

        render() {
            this.joinSection = document.createElement('section');
            const parentNode = document.querySelector('main');
            const footerNode = document.querySelector('footer');
            let adv;

            this.joinSection.className = 'app-section app-section--image-joun-us';

            if (this.title === 'Join Our Advanced Program') {
                adv = 'advanced';
            }

            this.joinSection.innerHTML = `<h2 class="app-title">
      ${this.title}
    </h2>
    
    <h3 class="app-subtitle">
      Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
    </h3>

    <form class="app-section--form-join-us ${adv}" name="EmailForm">

      <div class="app-section--submit-join-us" >
        <label for="user-email">Email</label>
      <input class="app-section--email-join-us" type="email" id="user-email" name="email">
      </div>
      
      <button type="submit" class="app-section__button app-section__button--subscribe">${this.subButton}</button>
    </form>`;

            parentNode.insertBefore(this.joinSection, footerNode);

            document
                .querySelector('.app-section__button--subscribe')
                .addEventListener('click', b => {
                    b.preventDefault();
                    let userEmail = document.querySelector('.app-section--email-join-us').value;
                    console.log(userEmail);
                });
        }

        remove() {
            if (!this.joinSection) {
                return;
            }
            this.joinSection.remove();
            this.joinSection = null;
        }
    }

    const sectionCreator = new SectionCreator();
    const advancedJoinSection = sectionCreator.create('advanced');
    const standartJoinSection = sectionCreator.create('standart');
    const advancedJoinSection2 = sectionCreator.create('advanced');
    const standartJoinSection2 = sectionCreator.create('standart');
    standartJoinSection.remove();
    advancedJoinSection2.remove();
});

// ----Factory function---
// const SectionCreator = function () {
// }
