import Masonry from 'masonry-layout';

const parentEl = document.querySelector('.parent');
const gridCont = document.createElement('div');
gridCont.classList.add('grid-container', 'flex', 'flex-wrap', 'relative');

const h2 = document.createElement('h2');
h2.classList.add(
    'pb-14',
    'md:text-5xl',
    'text-4xl',
    'font-black',
    'text-white',
    'drop-shadow-3xl',
);
h2.textContent = 'Табела за дискусии';

const LS_IS_USER_LOGGEDIN = 'isUserLoggedIn';
// Masonry instance
const msnry = new Masonry(gridCont, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true,
    gutter: 30,
});

function getRandomColor() {
    const colors = ['#9946F366', '#4B7CF366', '#83EAB166'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// App class
class App {
    #discussions = [];
    #wrapper = document.createElement('div');
    container;
    userName;
    constructor(value, color) {
        this.color = color;
        this.value = value;
        this.textarea = null;
        this.user = localStorage.getItem('userID');
        this.#wrapper.classList.add(
            'wrapper',
            'w-4/5',
            'm-auto',
            'py-20',
            'min-h-screen',
        );
        this.#wrapper.id = 'discuss';
        this.date = new Date();
        this.formattedDate();
    }

    formattedDate() {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hourCycle: 'h23',
        };

        this.time = new Intl.DateTimeFormat('mk-MK', options).format(this.date);
    }

    discussions() {
        if (!this.userName) {
            console.error('No userID found in local storage.');
            return;
        }

        const userDataKey = `userData_${this.userName}`;
        let userData = JSON.parse(localStorage.getItem(userDataKey));

        if (!userData) {
            console.error(`No user data found for key: ${userDataKey}`);
            return;
        }

        userData.discuss++;
        localStorage.setItem(userDataKey, JSON.stringify(userData));
    }

    createDiscussionPage(isUserLoggedIn) {
        parentEl.innerHTML = '';
        parentEl.appendChild(this.#wrapper);
        this.getFromLocalStorage();

        if (localStorage.getItem(isUserLoggedIn)) {
            this.userName = localStorage.getItem('userID');
            this.getFromLocalStorage();
            this.renderCommentContainer();
        }

        const textArea = document.querySelector('textarea');
        textArea?.addEventListener('input', () => {
            textArea.style.height = '';
            textArea.style.height = Math.min(textArea.scrollHeight, 300) + 'px';
        });
    }

    renderCommentContainer() {
        this.container = document.createElement('div');
        this.textarea = document.createElement('textarea');
        this.textarea.placeholder = 'Сподели искуство...';
        this.textarea.classList.add(
            'relative',
            'outline-none',
            'w-full',
            'bg-transparent',
            'resize-none',
            'border-b',
            'border-black',
            'leading-5',
            'h-8',
            'border-links-color',
        );

        this.container.classList.add(
            'container',
            'lg:w-width-lg',
            'rounded-xl',
            'stamp',
            'absolute',
            'top-0',
            'left-0',
            'mb-6',
            'border',
            'border-white',
            'p-4',
            'backdrop-blur-lg',
            'bg-white/50',
        );

        const html = `
        <div class="userInfo flex items-center pt-6">
            <img src="../../../img/profilepic.png" class="mr-4">
            <p>${this.userName}</p>    
        </div>
        `;
        this.textarea.addEventListener(
            'keydown',
            this.renderDiscussions.bind(this),
        );

        msnry.stamp(this.container);
        this.container.appendChild(this.textarea);
        gridCont.prepend(this.container);
        this.container.insertAdjacentHTML('beforeend', html);
        msnry.layout();
    }

    renderDiscussions(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!this.textarea.value.trim()) {
                // alert('Please enter a value');
                const errIcon = `<i class="errIcon fa-solid fa-circle-exclamation text-red-600 absolute top-4 right-4"></i>`;
                this.container.insertAdjacentHTML('beforeend', errIcon);
                this.textarea.classList.add('border-b', 'border-red-600');
                const errMsg = `<p class="errMsg text-sm text-red-600">*Ве молиме внесете искуство</p>`;
                const userInfo = this.container.querySelector('.userInfo');
                userInfo.insertAdjacentHTML('beforebegin', errMsg);
                return;
            } else {
                this.textarea.classList.remove('border-b', 'border-red-600');
                this.textarea.classList.add('border-b', 'border-black');
                const errIcon = document.querySelector('.errIcon');
                const errMsg = document.querySelector('.errMsg');
                errIcon?.remove();
                errMsg?.remove();
                this.discussions();
                this.textarea.style.height = '';
            }

            const randomColor = getRandomColor();
            const comment = createNewComment(this.textarea.value, randomColor);
            this.#discussions.push(comment);
            localStorage.setItem(
                'gridContHTML',
                JSON.stringify(this.#discussions),
            );
            this.textarea.value = '';
        }
    }

    _createComments() {
        const conditionalHTML = localStorage.getItem(LS_IS_USER_LOGGEDIN)
            ? `<textarea class="placeholder:text-white/70 border-b-[1px] resize-none opa border-par-custom 
    bg-transparent outline-none leading-none w-full" name="" id="" placeholder="Write a comment..."></textarea>`
            : '';

        const html = `<div class="grid-item text-par-custom shadow-md md:w-width-tablet lg:w-width-lg mb-6 rounded-xl p-4 break-words" style="background-color: ${this.color}">
          <p class="text-sm">${this.value}</p>
          <div class="flex justify-between  items-center py-6">
            <div class="flex items-center">
              <div class="rounded-full"><img src="../img/profilepic.png"></div>
              <p class="text-sm ml-6">${this.user}</p>
            </div>
            <div class="text-sm ml-4"><p>${this.time}</p></div>
          </div>
        ${conditionalHTML}
          <div class="flex items-center justify-between">
            <i class="fa-solid fa-plus"></i>
            <p> 5 comments </p>
            <p>84 reactions</p>
          </div>
        </div>`;

        gridCont.insertAdjacentHTML('beforeend', html);
        const newGridItem = gridCont.lastElementChild;
        msnry.appended(newGridItem);
        msnry.layout();
    }

    getFromLocalStorage() {
        gridCont.innerHTML = '';
        this.#wrapper.append(h2, gridCont);
        const data = JSON.parse(localStorage.getItem('gridContHTML'));
        if (!data) return;
        this.#discussions = data;
        this.#discussions.forEach((comment) => {
            const { value, color, user, time } = comment;
            this.value = value;
            this.color = color;
            this.user = user;
            this.time = time;
            this._createComments();
        });
        msnry.layout();
        window.addEventListener('load', () => {
            msnry.layout();
        });
    }

    removeCommentContainer() {
        const container = gridCont.querySelector('.container');
        if (container) {
            gridCont.removeChild(container);
        }
    }
}

function createNewComment(value, user) {
    const comment = new App(value, user);
    comment._createComments();
    return comment;
}

export default new App();