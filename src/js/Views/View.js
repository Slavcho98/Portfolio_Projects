"use strict";

class View {
    constructor() {
        this._createNavBar();
        this._createFooter();
        this._setupRouteChangeHandler();
    }

    _createNavBar() {
        const html = `
        <nav class="bg-navbar-gradient fixed z-50 flex lg:flex-row flex-col lg:min-h-0 w-full border-b-2 md:px-12 px-8 py-4 font-bold text-links-color backdrop-blur-md">
            <div class="relative flex justify-between">
                <a href="#"><img src="img/logo.png" alt="" class="h-auto md:w-[88px] w-16"></a>
                <i class="fa-solid menu lg:hidden flex items-center fa-bars text-2xl md:text-3xl"></i>
            </div>
            <div class="flex md:flex-row flex-col w-full items-center justify-between lg:pt-0 md:text-xl lg:text-base">
                 <div class="nav-links hidden lg:block opacity-0 lg:opacity-100 transition-opacity duration-300 pt-12 lg:pt-0">
                    <ul class="lg:ml-8 flex text-center lg:justify-center lg:flex-row flex-col">
                        <li class="lg:ml-8 mb-6 lg:mb-0 hover:text-white active:text-purple-500">
                            <a href="#home">Почетна</a>
                        </li>
                        <li class="lg:ml-8 mb-6 lg:mb-0 hover:text-white active:text-purple-500">
                            <a href="#info">Информирај се</a>
                        </li>
                        <li class="lg:ml-8 mb-6 lg:mb-0 hover:text-white active:text-purple-500">
                            <a href="#discuss">Дискусии</a>
                        </li>
                        <li class="lg:ml-8 mb-6 lg:mb-0 hover:text-white active:text-purple-500">
                            <a href="#contact">Контакт</a>
                        </li>
                    </ul>
                </div>
                <div class="user-actions hidden lg:block opacity-0 lg:opacity-100 transition-opacity duration-300">
                    <ul class="second_list flex items-center lg:flex-row flex-col-reverse transition ease-in-out delay-150">
                        <a href="#login" class="login lg:mr-4 mb-6 lg:mb-0 rounded-[10px] border-[1.6px] border-links-color px-4 py-1 font-medium">
                            <i class="fa-solid fa-user"></i> Најави се
                        </a>
                        <li class="mr-4 mb-6 lg:mb-0"><a href="">МК | AL</a></li>
                        <i class="fa-solid fa-magnifying-glass fa-xl cursor-pointer pb-8 lg:pb-0"></i>
                    </ul>
                </div>
            </div>
        </nav>
        `;

        document.body.insertAdjacentHTML('afterbegin', html);
        const nav = document.querySelector('nav');
        const navLinks = nav.querySelector('.nav-links');
        const userActions = nav.querySelector('.user-actions');
        const menu = nav.querySelector('.menu');

        menu.addEventListener('click', (e) => {
            const isMenuOpen = !navLinks.classList.contains('hidden');

            if (isMenuOpen) {
                this._hideMenu(navLinks, userActions, e.target);
            } else {
                this._showMenu(navLinks, userActions, e.target);
            }
        });
    }

    _hideMenu(navLinks, userActions, menuIcon) {
        navLinks.classList.remove('opacity-100');
        userActions.classList.remove('opacity-100');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                navLinks.classList.add('hidden');
                userActions.classList.add('hidden');
                menuIcon.classList.remove('fa-x');
                menuIcon.classList.add('fa-bars');
                document.querySelector('nav').classList.remove('w-screen', 'min-h-screen');
            });
        });
    }

    _showMenu(navLinks, userActions, menuIcon) {
        navLinks.classList.remove('hidden');
        userActions.classList.remove('hidden');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                navLinks.classList.add('opacity-100');
                userActions.classList.add('opacity-100');
            });
        });

        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-x');
        document.querySelector('nav').classList.add('w-screen', 'min-h-screen');
    }

    _setupRouteChangeHandler() {
        window.addEventListener('hashchange', () => {
            const navLinks = document.querySelector('.nav-links');
            const userActions = document.querySelector('.user-actions');
            const menuIcon = document.querySelector('.menu');

            this._hideMenu(navLinks, userActions, menuIcon);
        });
    }

    _createFooter() {
        const footer = document.createElement('footer');
        footer.classList.add(
            'w-full',
            'py-12',
            'bg-custom-gradient-2',
            'text-white',

        );
        const html = `
        <div class="md:w-4/5 m-auto">
    <div class="flex flex-col md:text-xl lg:text-base lg:flex-row lg:mr-[-4rem] lg:items-end  text-white px-8 lg:px-0 relative lg:static">
        <div class="lg:basis-1/3">
            <div class="md:mr-16">
             <img src="./img/Vector.png" alt="logo">
             <p class="text-base my-6">International Foundation for Electoral Systems (IFES)</p>
             <div class="flex justify-between lg:text-nowrap flex-col md:mb-6 lg:mb-0 lg:flex-row">
                <span class="mr-4"><i class="fa-solid fa-phone"></i> +389-2-312-2288</span>
                <a href="mailto:someone@yoursite.com" class="hover:text-links-color"><i class="fa-regular fa-envelope"></i> ifes.nmk@ifes.org</a>

             </div>
            </div>
        </div>
        <div class="lg:basis-1/3 pt-12">
            <div class="lg:mr-16">
              <ul class="text-nowrap">
                <li class="mb-6"><a href="#info">Информирај се</a></li>
                <li class="mb-6"><a href="#discuss">Дискусии</a></li>
                <li class="mb-6"><a href="#contact">Контакт - корисни линкови</a></li>
                <li><a href="#">Закон за заштита на личните податоци</a></li>
              </ul>
            </div>
        </div>
        <div class="lg:basis-1/3">
            <div class="lg:mr-16 lg:text-end text-center">
                <p class="lg:mb-8 lg:static absolute top-0 right-8 font-semibold"><a href="#">MK | AL</a></p>
                <ul class="lg:mb-16 my-8">
                    <a href="" class="lg:mr-4 mr-8"><i class="fa-brands fa-facebook text-3xl lg:text-2xl"></i></a>
                    <a href="" class="lg:mr-4 mr-8"><i class="fa-brands fa-instagram text-3xl lg:text-2xl"></i></a>
                    <a href="" class="lg:mr-4 mr-8"><i class="fa-brands fa-youtube text-3xl lg:text-2xl"></i></a>
                    <a href="" class=""><i class="fa-brands fa-tiktok text-3xl lg:text-2xl"></i></a>
                </ul>
                <div>
                    <p>© All Rights Reserved. | <a href="#" class="hover:text-links-color">safeblink.mk</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
       `;
        footer.insertAdjacentHTML('afterbegin', html);

        document.body.appendChild(footer);
    }
}
export default new View();