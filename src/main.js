import createSection from './join-us-section';

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
        let adv;
        if (this.title === 'Join Our Advanced Program') {
            adv = 'advanced';
        }
        createSection(this.title, this.subButton, adv);
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
const standartJoinSection = sectionCreator.create('standart');
