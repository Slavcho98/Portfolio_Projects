'use strict';
import { comment } from 'postcss';
import '../../style.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { doc } from 'prettier';

class InfoData {
    constructor(value, user) {
        this.value = value;
        this.user = user;
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

        const locale = navigator.language;

        this.time = new Intl.DateTimeFormat(locale, options).format(this.date);
    }
}

class InfoPage extends InfoData {
    #comments = [];
    userName;
    commentsContainer;
    isLoggedIn;
    parentEl = document.querySelector('.parent');

    constructor(time) {
        super(time);
    }

    // this handles the watched videos badge
    click() {
        this.userName = localStorage.getItem('userID');
        if (!this.userName) return;

        const userDataKey = `userData_${this.userName}`;
        let userData = JSON.parse(localStorage.getItem(userDataKey));

        if (!userData) return;

        userData.videosWatched++;
        localStorage.setItem(userDataKey, JSON.stringify(userData));
    }

    // rendering video data from API
    async _createInfoPage(isUserLoggedIn) {
        try {
            const response = await fetch(
                'https://slavcho98.github.io/videos-api/sample.json',
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            this.isLoggedIn = localStorage.getItem(isUserLoggedIn);
            const element = data.videos.map((el) => el.status);
            const mySet = new Set(element);
            const buttons = Array.from(mySet);

            this.parentEl.innerHTML = '';

            // placeholder buttons
            const buttonNames = [
                'Азбучен редослед',
                'Интернет видеа',
                'Опасност',
                'Лорем ипсум',
                'Лорем ипсум',
                'Лорем',
                'Лорем лорем ипсум',
                'Тема 1',
                'Тема 2',
                'Тема 3',
            ];

            function createButtons(
                buttonText,
                additionalClasses = '',
                additionalAttributes = '',
            ) {
                return `
        <button class="mb-4 mr-4 rounded-full border-t-2 text-nowrap md:text-xl border-white  md:px-4 px-6 md:py-1 
        lg:text-base text-center text-sm py-1 font-medium text-links-color ${additionalClasses}" ${additionalAttributes}>
            ${buttonText}
        </button>
    `;
            }

            // Placeholder buttons
            const placeholderButtons = buttonNames
                .map((el) => createButtons(el, ' bg-white/30 opacity-70'))
                .join('');

            // Filter buttons
            const renderBtn = buttons
                .map((item) =>
                    createButtons(
                        item,
                        'filterBtns backdrop-blur-lg bg-white/50 shadow-lg',
                        `data-names="${item}"`,
                    ),
                )
                .join('');

            const html = `
                    <div class="w-4/5 m-auto" id="info">
                        <h2 class="md:py-14 leading-snug py-8 lg:text-5xl text-[2.5rem] text-center font-black text-white drop-shadow-3xl">
                            Се што треба да знаеш
                        </h2>
                        <div class="swiper mySwiper md:flex justify-center lg:w-3/4">
                            <div class="swiper-wrapper md:flex md:basis-3/4 md:justify-between">
                                <h2 class="swiper-slide text-center  text-2xl lg:text-3xl md:text-4xl md:mb-6 font-bold text-links-color">
                                    Видеа
                                </h2>
                                <h2 class="swiper-slide text-center opacity-50 text-2xl lg:text-3xl md:text-4xl mb-6 font-bold text-links-color">
                                    Упатства
                                </h2>
                                <h2 class="swiper-slide text-center opacity-50 text-2xl lg:text-3xl md:text-4xl mb-6 font-bold text-links-color">
                                    Статии
                                </h2>
                            </div>
                            <div class="swiper-button-next after:hidden pb-6">
                                <i class="text-links-color after:hidden fa-solid fa-right-long fa-3x"></i>
                            </div>
                            <div class="swiper-button-prev after:hidden pb-6">
                                <i class="text-links-color after:hidden fa-solid fa-left-long fa-3x"></i>
                            </div>
                            <div class="swiper-pagination lg:hidden after:text-links-color"></div>
                        </div>
                        <div class="swiper btnSwiper">
                            <div class="swiper-wrapper lg:flex lg:flex-wrap lg:justify-center pt-12">${renderBtn} ${placeholderButtons}</div>
                        </div>
                        <div class="videosContainer flex flex-wrap md:flex-row flex-col md:mr-[-1.5rem] md:pt-16 pt-12">
                            ${this.createAll(data.videos)}
                        </div>
                    </div>
                `;

            this.parentEl.insertAdjacentHTML('afterbegin', html);
            // play videos on hover
            function addAutoplayOnHover(selector) {
                document.querySelectorAll(selector).forEach((element) => {
                    const video = element.querySelector('video');
                    element.addEventListener('mouseenter', function () {
                        video.play();
                    });
                    element.addEventListener('mouseleave', function () {
                        video.pause();
                    });
                });
            }

            addAutoplayOnHover('.childEl');

            // retrieving filters from session storage
            const filterButtons = document.querySelector('.btnSwiper');
            let currentFilter = sessionStorage.getItem('currFilter') || null;
            let filteredProducts =
                JSON.parse(sessionStorage.getItem('filterResult')) || null;

            if (filteredProducts && currentFilter) {
                this.renderItems(filteredProducts);
                const currentFilterButton = document.querySelector(
                    `[data-names="${currentFilter}"]`,
                );
                currentFilterButton.classList.add(
                    'bg-white/30',
                    'opacity-70',
                    'border-b-2',
                );
                currentFilterButton.classList.remove('border-t-2');
            }

            const setInSessionStorage = () => {
                if (this.isLoggedIn) {
                    sessionStorage.setItem(
                        'filterResult',
                        JSON.stringify(filteredProducts),
                    );
                    sessionStorage.setItem('currFilter', currentFilter);
                }
            };

            // filtering videos according to category
            filterButtons.addEventListener('click', (e) => {
                const target = e.target.closest('.filterBtns');
                if (!target) return;

                const status = target.dataset.names;

                const allButtons = document.querySelectorAll('.filterBtns');
                allButtons.forEach((button) => {
                    if (button !== target) {
                        button.classList.remove('bg-white/30', 'opacity-70');
                        button.classList.add('border-t-2');
                        button.classList.remove('border-b-2');
                    }
                });

                if (status === currentFilter) {
                    this.renderItems(data.videos);
                    target.classList.remove(
                        'bg-white/30',
                        'opacity-70',
                        'border-b-2',
                    );
                    target.classList.add('border-t-2');
                    currentFilter = null;
                    filteredProducts = null;
                    sessionStorage.removeItem('filterResult');
                    sessionStorage.removeItem('currFilter');
                } else {
                    filteredProducts = data.videos.filter(
                        (el) => el.status === status,
                    );
                    this.renderItems(filteredProducts);

                    currentFilter = status;

                    // saving filters in session storage
                    setInSessionStorage();

                    target.classList.add(
                        'bg-white/30',
                        'opacity-70',
                        'border-b-2',
                    );
                    target.classList.remove('border-t-2');
                }
            });

            function initializeSwiper(selector, options) {
                return new Swiper(selector, options);
            }

            const commonConfig = {
                cssMode: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                mousewheel: true,
                keyboard: true,
            };

            const btnSwiperConfig = {
                ...commonConfig,
                breakpoints: {
                    425: {
                        slidesPerView: '3',
                    },
                },
            };

            const mySwiperConfig = {
                ...commonConfig,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    992: {
                        slidesPerView: '3',
                    },
                },
            };

            initializeSwiper('.btnSwiper', btnSwiperConfig);
            initializeSwiper('.mySwiper', mySwiperConfig);

            this._renderModal(isUserLoggedIn, data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    createAll(videos) {
        return videos
            .map(
                (element) => `  
            <div class="lg:basis-1/4 md:basis-1/2">
                <div class="childEl relative cursor-pointer mb-6 md:mr-6" data-id="${element.id}">
                    <video class="h-[465px] w-full object-cover rounded-lg" muted>
                        <source src="${element.video_link}" type="video/mp4" />
                    </video>
                    <div class="absolute bottom-0 rounded-b-lg border-t-2 h-40 bg-white/60 px-4 py-1 text-white backdrop-blur">
                        <h3 class="absolute font-bold text-links-color text-sm">${element.title}</h3>
                        <p class="pt-10 text-xs text-par-custom">
                            Лорем ипсум е едноставен модел на текст кој се користел во печатарската индустрија.
                            Лорем ипсум бил индустриски стандард...
                        </p>
                        <p class="text-xs pt-4 text-par-custom">Објавено на ${this.time}</p>
                    </div>
                </div>
            </div>
        `,
            )
            .join('');
    }

    renderItems(videos) {
        this.parentEl.querySelector('.videosContainer').innerHTML =
            this.createAll(videos);
    }

    _renderModal(LS_IS_USER_LOGGEDIN, data) {
        const containerEl = document.querySelector('.videosContainer');

        containerEl.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('.childEl');
            if (target) {
                const boundCreateModal = this._createModal.bind(
                    this,
                    target,
                    data,
                    LS_IS_USER_LOGGEDIN,
                );

                boundCreateModal();
                this.click();
            }
        });
    }

    _createModal(target, data, _) {
        const userID = localStorage.getItem('userID');
        const videoId = data.videos.find(
            (item) => String(item.id) === target.dataset.id,
        );
        if (!videoId) return;

        let conditionalHtml = '';

        const overlayEl = document.createElement('div');

        overlayEl.classList.add(
            'bg-par-custom',
            'opacity-70',
            'h-screen',
            'w-screen',
            'fixed',
            'left-0',
            'z-50',
        );
        const modalEl = document.createElement('div');
        modalEl.classList.add(
            'w-10/12',
            'm-auto',
            'backdrop-blur-lg',
            'bg-white/70',
            'absolute',
            'top-8',
            'left-1/2',
            'translate-x-[-50%]',
            'z-50',
            'md:p-16',
            'p-6',
            'rounded-3xl',
        );

        if (this.isLoggedIn) {
            conditionalHtml = `
            <div class="py-4 px-6 border-2 rounded-lg mb-4 border-links-color/50 leading-none">
            <form class="commentSubmit relative">
                <textarea name="textarea" class="comment leading-5 w-full outline-none bg-transparent border-b border-par-custom resize-none h-8" placeholder="Остави коментар..."></textarea>
                </form>
                <div class="flex justify-between items-center pt-4">
                    <div class="flex items-center">
                        <img src="../../../img/profilepic.png" class="mr-4">
                        <p class="text-par-custom font-medium">${userID}</p>
                    </div>
                    <p class="text-sm text-par-custom">${this.time}</p>
                </div>
            </div>
        `;
        }

        const html = `
        <div class="flex lg:flex-row flex-col-reverse">
            <div class="lg:w-2/3 overflow-y-visible">
                <div class="lg:mr-12">
                    <div class="mb-8">
                        <h2 class="text-links-color font-bold text-lg">Лоши навики при "Live streaming"</h2>
                        <p class="text-sm py-4 text-par-custom text-justify">
                            Лорем ипсум е едноставен модел на текст кој се користел во печатарската индустрија. Лорем ипсум бил индустриски стандард кој се користел како модел уште пред 1500 години, кога непознат печатар зел кутија со букви и ги сложил на таков начин за да направи примерок на книга. И не само што овој модел опстанал пет векови туку почнал да се користи и во електронските медиуми, кој се уште не е променет.
                        </p>
                        <p class="text-par-custom">Објавено на ${this.time}</p>
                    </div>
                    ${conditionalHtml}
               
                    <div class="comments-container overflow-y-auto max-h-80 pr-4">
                    </div>
             
                </div>
            </div>
            <div class="lg:w-1/3 w-full modal-video-container ">
                <video class="rounded h-full object-cover mb-6 " controls>
                    <source src="${videoId.video_link}">
                </video>
            </div>
        </div>
    `;

        modalEl.innerHTML = '';
        modalEl.insertAdjacentHTML('afterbegin', html);
        document.body.append(overlayEl, modalEl);

        const commentForm = document.querySelector('.commentSubmit');
        const submitText = document.querySelector('.comment');

        submitText?.addEventListener('input', () => {
            submitText.style.height = '';
            submitText.style.height =
                Math.min(submitText.scrollHeight, 300) + 'px';
        });

        this.commentsContainer = modalEl.querySelector('.comments-container');

        if (this.isLoggedIn) {
            submitText.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (!submitText.value.trim()) {
                        const errIcon = `<i class="errIcon fa-solid fa-circle-exclamation text-red-600 absolute top-0 right-0"></i>`;
                        submitText.classList.add('border-b', 'border-red-600');
                        const errMsg = `<p class="errMsg text-sm text-red-600">*Ве молиме внесете коментар</p>`;
                        commentForm.insertAdjacentHTML('beforeend', errMsg);
                        commentForm.insertAdjacentHTML('beforeend', errIcon);
                    } else {
                        const comment = new InfoData(e.target.value, userID);
                        this.#comments.push(comment);
                        this._renderModalComment(comment);
                        submitText.value = '';
                        submitText.style.height = '';
                        const errMsg = document.querySelector('.errMsg');
                        const errIcon = document.querySelector('.errIcon');
                        errMsg?.remove();
                        errIcon?.remove();
                        submitText.classList.remove(
                            'border-b',
                            'border-red-600',
                        );
                        submitText.classList.add('border-b', 'border-black');
                        localStorage.setItem(
                            'modalComments',
                            JSON.stringify(this.#comments),
                        );
                    }
                }
            });
        }

        overlayEl.addEventListener('click', () => {
            overlayEl.remove();
            modalEl.remove();
        });

        // close the modal event listener
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                overlayEl.remove();
                modalEl.remove();
            }
        });

        this.restoreFromLS(this.commentsContainer);
        window.scrollTo(0, 0);
    }

    _renderModalComment(comment) {
        const html = `
            <div class="py-4 md:px-6 px-4 border-2 rounded-lg mb-4 border-links-color/50">
                <p class="text-par-custom text-sm">
                    ${comment.value}
                </p>
                <div class="flex justify-between items-center pt-4">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gray-400 mr-4">
                            <img src="./img/Profile.png" alt="" class="rounded-full">
                        </div>
                        <p class="text-par-custom font-medium">${comment.user}</p>
                    </div>
                    <p class="text-sm text-par-custom">${comment.time}</p>
                </div>
            </div>
        `;

        this.commentsContainer.insertAdjacentHTML('afterbegin', html);
    }

    restoreFromLS() {
        const data = JSON.parse(localStorage.getItem('modalComments'));
        if (!data) return;
        this.#comments = data;
        this.#comments.forEach((el) => {
            this._renderModalComment(el);
        });
    }
}

export default new InfoPage();
