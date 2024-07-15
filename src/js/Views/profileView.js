'use strict';

import appInstance from './discussView.js';

const parentEl = document.querySelector('.parent');

class UserProfile {
    profileListItem;
    profileIconLi;
    userName;

    createUserProfile() {
        this.userName = localStorage.getItem('userID');
        const userDataKey = `userData_${this.userName}`;
        parentEl.innerHTML = '';

        let userData = JSON.parse(localStorage.getItem(userDataKey));

        if (!userData) {
            userData = {
                username: this.userName,
                email: 'useruser@gmail.com',
                password: 'password',
                birthYear: 2007,
                gender: 'машки',
                videosWatched: 0,
                discuss: 0,
            };
            localStorage.setItem(userDataKey, JSON.stringify(userData));
        }

        const html = `
        <div class="m-auto w-4/5 pt-12 text-white">
            <h2 class="text-white text-5xl text-center pb-4 lg:pb-0 lg:text-start capitalize font-black drop-shadow-3xl">профил</h2>
            <div class="contEl flex lg:flex-row justify-center flex-col lg:mr-[-1rem] my-6 md:text-xl lg:text-base">
                <div class="lg:basis-1/3">
                    <div class="lg:mr-4 lg:pr-8 pb-8 lg:pb-0">
                        <img src="img/Profile.png" alt="" class="lg:w-11/12 m-auto">
                    </div>
                </div>
                <div class="lg:basis-1/3 pt-8 md:pt-0">
                    <div class="lg:mr-4 lg:pl-8">
                        <div class="pb-8">
                            <h3>Име и презиме / Корисничко име</h3>
                            <div class="inline-flex flex-end justify-between w-full border-b border-white mt-4 py-1 pl-2">
                                <p data-key="username">${userData.username}</p>
                            </div>
                        </div>
                        <div class="pb-8">
                            <h3>Email адреса</h3>
                            <div class="editEl relative inline-flex flex-end justify-between w-full border-b border-white  mt-4 py-1 pl-2">
                                <p data-key="email">${userData.email}</p>
                            </div>
                        </div>
                        <div class="pb-8">
                            <h3>Лозинка</h3>
                            <div class="inline-flex flex-end justify-between w-full border-b border-white mt-4 py-1 pl-2">
                                <p data-key="password">${userData.password}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:basis-1/3 relative">
                    <div class="lg:mr-4">
                        <div class="pb-8">
                            <h3>Година на раѓање</h3>
                            <div class="editEl relative inline-flex flex-end justify-between w-full border-b border-white mt-4 py-1 pl-2">
                                <p data-key="birthYear" class="m-0">${userData.birthYear}</p>
                            </div>
                        </div>
                        <div class="">
                            <h3>Пол</h3>
                            <div class="inline-flex flex-end justify-between w-full border-b border-white mt-4 py-1">
                                <p data-key="gender">${userData.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:hidden w-full flex justify-center"><button class="edit-btn bg-custom-pink mb-12 rounded-lg md:text-2xl py-2  px-6 md:px-8 text-center">Промени</button></div>
            <div class="lg:flex text-center justify-between mb-6">
                <p class="md:text-2xl lg:text-base font-semibold">Следи го својот Safeblink напредок</p>
                <p class="md:text-xl lg:text-base">Моментално ниво: лорем ипсум</p>
            </div>
            
                <div class="my-16 w-full border-2 bg-white/40 border-none backdrop-blur-lg h-3 rounded-full">
                <div class="w-1/3
                 bg-neon h-full rounded-full"></div></div>
            <div class="achievments flex md:flex-row flex-col items-center md:flex-wrap  lg:justify-start">
                <div class="relative lg:w-1/5 md:w-1/2">
                    <img src="../img/Exclude.png" class="w-full">
                    <p class="absolute mt-4 top-1/2 text-nowrap md:text-xl lg:text-sm left-1/2 translate-x-[-50%]">Се придружи!</p>
                </div>
            </div>
        </div>
    `;

        parentEl.insertAdjacentHTML('afterbegin', html);

        function renderBadges(userName) {
            const achievements = document.querySelector('.achievments');

            if (!userName) {
                console.error('No userID found in local storage.');
                return;
            }

            const userDataKey = `userData_${userName}`;
            const userData = JSON.parse(localStorage.getItem(userDataKey));

            const clicks = userData.videosWatched;
            const discussions = userData.discuss;

            if (discussions >= 1) {
                const discussionHTML = `
                    <div class="relative lg:w-1/5 md:w-1/2">
                        <img src="../../../img/discuss_ach.png" class="w-full">
                        <p class="absolute mt-4 top-1/2 text-nowrap md:text-xl lg:text-sm left-1/2 translate-x-[-50%]">Активност во дискусија</p>
                    </div>
                `;
                achievements.insertAdjacentHTML('beforeend', discussionHTML);
            }

            if (clicks >= 5) {
                const clicksHTML = `
                    <div class="relative lg:w-1/5 md:w-1/2">
                        <img src="../../../img/video_badge.png" class="w-full">
                        <p class="absolute mt-4 top-1/2 text-nowrap md:text-xl lg:text-sm left-1/2 translate-x-[-50%]">Изгледани 5 видеа</p>
                    </div>
                `;
                achievements.insertAdjacentHTML('beforeend', clicksHTML);
            }
        }

        renderBadges(this.userName);
        this.editAndUpdateData(userData, userDataKey);
        this.editAndUpdateResponsive(userData, userDataKey);
        this.removeItem();

        this.createProfileLink();
    }

    createProfileLink() {
        const firstList = document.querySelector('ul');
        const secondList = document.querySelector('.second_list');
        const login = document.querySelector('.login');
        this.profileIconLi = document.createElement('li');
        const profileIconLink = document.createElement('a');
        const profileIconImg = document.createElement('img');
        this.profileListItem = document.createElement('li');
        const profileLink = document.createElement('a');

        // Set attributes
        this.profileIconLi.className =
            'profilePicture hidden lg:block mr-4 mb-6 lg:mb-0';
        profileIconLink.href = '#profile';
        profileIconLink.classList.add(
            'block',
            'w-12',
            'h-12',
            'rounded-full',
            'overflow-hidden',
        );
        profileIconImg.src = '../../../img/Profile.png';
        profileIconImg.alt = 'profilePicture';

        // Append elements

        this.profileListItem.classList.add(
            'lg:ml-8',
            'mb-6',
            'lg:mb-0',
            'hover:text-white',
            'active:text-purple-500',
        );

        profileLink.href = '#profile';
        profileLink.textContent = 'Профил';

        login.lastChild.textContent = ' Одјави се';

        profileIconLink.appendChild(profileIconImg);
        this.profileIconLi.appendChild(profileIconLink);

        secondList.prepend(this.profileIconLi);

        this.profileListItem.appendChild(profileLink);
        firstList.appendChild(this.profileListItem);
    }

    createLoginModal(isUserLoggedIn) {
        const markup = `
            <div class="lg:w-1/2 w-4/5 m-auto backdrop-blur-backdrop bg-custom-gradient-3 text-center px-8 py-12 rounded-2xl text-white  backdrop-invert absolute top-1/2 left-1/2 translate-x-[-50%]">
                <h2 class="lg:text-4xl text-3xl font-bold">Добредојде!</h2>
                <p class="lg:text-xl py-6 text-nowrap">Успешно креиран профил</p>
                <a href="#profile" class="loginBtn shadow-2xl mt-6 inline-block backdrop-blur-lg bg-white/50 text-par-custom font-semibold py-1 px-8 rounded-lg">Продолжи кон Safeblink</a>
            </div>
        `;

        parentEl.innerHTML += markup;

        const getBtn = document.querySelector('.loginBtn');
        getBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = 'profile';
            localStorage.setItem(isUserLoggedIn, 'true');
        });
        window.scrollTo(0, 0);
    }

    editAndUpdateData(userData, userDataKey) {
        const editElements = document.querySelectorAll('.editEl');

        editElements.forEach((el) => {
            let button = null;
            let icon = null;
            let isEditing = false;
            let editInput;

            const addEditBtn = () => {
                if (!button) {
                    button = document.createElement('button');
                    button.classList.add(
                        'editingButton',
                        'absolute',
                        'bg-custom-pink',
                        'px-4',
                        'py-1',
                        'top-0',
                        'right-0',
                        'rounded-r',
                        'hidden',
                        'lg:block',
                    );
                    icon = document.createElement('i');
                    icon.classList.add('fas', 'fa-pencil');
                    button.appendChild(icon);
                    el.appendChild(button);
                    el.classList.add('border', 'border-white', 'rounded');
                }
            };

            const removeIcon = () => {
                if (button && button.parentNode) {
                    button.parentNode.removeChild(button);
                    button = null;
                    icon = null;
                    el.classList.remove('border', 'border-white');
                }
            };

            const handleMouseOut = (event) => {
                if (!el.contains(event.relatedTarget)) {
                    removeIcon();
                }
            };

            el.addEventListener('mouseover', addEditBtn);
            el.addEventListener('mouseout', handleMouseOut);

            el.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;

                let editParagraph = el.querySelector('p');

                if (isEditing) {
                    const key = editInput.dataset.key;
                    const newValue = editInput.value;

                    target.firstChild.classList.remove('fa-solid', 'fa-check');
                    target.firstChild.classList.add('fas', 'fa-pencil');

                    button.classList.remove('bg-green-500');
                    editInput.remove();

                    const newP = document.createElement('p');
                    newP.dataset.key = key;
                    newP.textContent = newValue;

                    el.classList.add('py-1', 'pl-2');
                    el.prepend(newP);

                    isEditing = false;
                    el.addEventListener('mouseout', handleMouseOut);

                    userData[key] = newValue;
                    localStorage.setItem(userDataKey, JSON.stringify(userData));
                } else {
                    isEditing = true;
                    target.firstChild.classList.remove('fas', 'fa-pencil');
                    target.firstChild.classList.add('fa-solid', 'fa-check');

                    button.classList.add('bg-green-500');
                    el.removeEventListener('mouseout', handleMouseOut);

                    editInput = document.createElement('input');
                    editInput.classList.add(
                        'text-black',
                        'py-1',
                        'pl-2',
                        'outline-none',
                        'w-full',
                    );
                    el.classList.remove('py-1', 'pl-2');

                    editInput.value = editParagraph.textContent;
                    editInput.dataset.key = editParagraph.dataset.key;

                    el.prepend(editInput);
                    editParagraph.remove();
                }
            });
        });
    }

    editAndUpdateResponsive(userData, userDataKey) {
        const editElements = document.querySelectorAll('.editEl');
        const edit_btn = document.querySelector('.edit-btn');

        function resetEditState() {
            editElements.forEach((item) => {
                const editPar = item.querySelector('input');
                if (editPar) {
                    const newPar = document.createElement('p');
                    newPar.textContent = editPar.value;
                    newPar.dataset.key = editPar.dataset.key;
                    editPar.replaceWith(newPar);
                }
            });
            edit_btn.textContent = 'Промени';
        }

        editElements.forEach((item) => {
            let isEdit = false;
            let inputEl;

            edit_btn.addEventListener('click', (e) => {
                if (isEdit) {
                    e.target.textContent = 'Промени';
                    const newPar = document.createElement('p');
                    newPar.textContent = inputEl.value;
                    newPar.dataset.key = inputEl.dataset.key;
                    inputEl.replaceWith(newPar);

                    // Save the updated value in local storage
                    const key = inputEl.dataset.key;
                    userData[key] = inputEl.value;
                    localStorage.setItem(userDataKey, JSON.stringify(userData));

                    isEdit = false;
                } else {
                    isEdit = true;
                    e.target.textContent = 'Зачувај';

                    inputEl = document.createElement('input');
                    inputEl.classList.add(
                        'text-black',
                        'py-1',
                        'pl-2',
                        'outline-none',
                        'w-full',
                        'rounded',
                    );

                    const editPar = item.querySelector('p');
                    inputEl.value = editPar.textContent;
                    inputEl.dataset.key = editPar.dataset.key;

                    editPar.replaceWith(inputEl);
                }
            });
        });
        resetEditState();
        window.addEventListener('resize', resetEditState);
    }

    removeItem() {
        this.profileListItem?.remove();
        this.profileIconLi?.remove();
    }

    createLogout(removeUser) {
        const secondList = document.querySelector('.second_list');
        const login = document.querySelector('.login');

        login.addEventListener('click', () => {
            const profilePicture = secondList.querySelector('.profilePicture');
            login.lastChild.textContent = ' Најави се';
            window.location.hash = 'profile';

            appInstance?.removeCommentContainer();

            profilePicture?.remove();
            this.profileListItem?.remove();
            localStorage.removeItem(removeUser);
            localStorage.removeItem('profileLinkData');
            localStorage.removeItem('userID');
            sessionStorage.removeItem('filterResult');
            sessionStorage.removeItem('currFilter');
        });
    }
}

export default new UserProfile();
