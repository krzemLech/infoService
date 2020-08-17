class Forms {
    constructor() {
        this.inputs = document.querySelectorAll('.text-input') || [];
        this.labels = document.querySelectorAll('label') || [];

        this.inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                this.labels.forEach(label => {
                    if (label.getAttribute('for') == e.target.getAttribute('name')) {
                        label.classList.add('red')
                    };
                });
            });
            input.addEventListener('blur', (e) => {
                this.labels.forEach(label => {
                    if (label.getAttribute('for') == e.target.getAttribute('name')) {
                        label.classList.remove('red')
                    };
                });
            });
        });
    };
};


class Nav {
    constructor() {
        this.logo = document.querySelector('div.logo');
        this.mainTitle = document.querySelector('h2.main-title');
        this.navLine = document.querySelector('div.title-wrapper');
        this.hamburger = document.querySelector('div.hamburger');

        window.addEventListener('scroll', () => {
            if (scrollY) {
                this.navLine.classList.add('extended');
                this.mainTitle.classList.add('hidden');
                this.logo.style.transform = 'scale(2) translateY(20px)'
            } else {
                this.navLine.classList.remove('extended');
                this.mainTitle.classList.remove('hidden');
                this.logo.style.transform = 'scale(1) translateY(0px)'
            };
        });

        this.hamburger.addEventListener('click', function () {
            this.classList.toggle('open')
            document.querySelector('ul.nav-menu').classList.toggle('open')
        });
    };
};


class Diagram {
    constructor() {
        this.diagrams = document.querySelectorAll('.indicator')

        this.diagrams.forEach(diagram => {
            setTimeout(() => diagram.style.width = `${diagram.dataset.votes / diagram.dataset.sum * 100}%`, 1)
        });
    };
};


class Errors {
    constructor() {
        this.errorDiv = document.querySelector('div.errors')
    };
    fadeErrors() {
        // this methods make error messages fade
        if (window.location.href.endsWith('/add')) {
            setTimeout(() => {
                this.errorDiv.style.display = 'none'
            }, 4000);
        };
    };
};


class OneNews {
    constructor() {
        this.newsHolders = document.querySelectorAll('div.news-wrapper')
    }
    oneNewsLink() {
        // this function makes the whole news-wrapper redirect to one news
        if (window.location.href.endsWith('/news')) {
            this.newsHolders.forEach(holder => {
                holder.addEventListener('click', () => {
                    window.location = holder.dataset.link
                });
            });
        };
    };
};

class Unconfirmed {
    constructor() {
        this.unconfirmedSection = document.querySelector('div.unconfirmed')
        this.opener = document.querySelector('span.unconfirmed')
        console.log(this.unconfirmedSection);

        this.opener.addEventListener('click', this.showUnconfirmed)
    }
    showUnconfirmed = () => {
        console.log('click');
        this.unconfirmedSection.classList.remove('hidden')
    }
}

// run all objects and methods
document.addEventListener('DOMContentLoaded', function () {
    const forms = new Forms();
    const nav = new Nav();
    const diagram = new Diagram();
    const errorHandling = new Errors();
    const oneNews = new OneNews();
    const unconfirmed = new Unconfirmed();

    errorHandling.fadeErrors();
    oneNews.oneNewsLink();
});
