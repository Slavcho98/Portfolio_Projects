import * as model from './model.js';
import View from './Views/View.js'; //renders the navbar and the footer
import renderHome from './Views/homeView.js';
import renderInfo from './Views/infoView.js';
import renderDiscuss from './Views/discussView.js';
import renderContact from './Views/contactView.js';
import { LoginPage } from './Views/loginView.js';
import renderProfile from './Views/profileView.js';
import '../style.css';

const parentEl = document.querySelector('.parent');
parentEl.classList.add('md:pt-[6.1rem]', 'pt-[5rem]', 'pb-20');
const LS_IS_USER_LOGGEDIN = 'isUserLoggedIn';
const renderLogin = new LoginPage();
let formEl, userName;

// handling login authentication
const handleForm = async (e) => {
    e.preventDefault();
    try {
        const response = await model.handleFormSubmission(formEl);

        userName = model.state.credentials.username;
        if (!response) return;

        localStorage.setItem('userID', userName);
        renderProfile.createLoginModal(LS_IS_USER_LOGGEDIN);
    } catch (error) {
        renderLogin.renderError();
    }
};

// SPA-Router
function initRouter() {
    const routes = {
        '#home': renderHome._createHomePage,
        '#login': () => {
            formEl = renderLogin._createLogin(handleForm);
        },
        '#info': renderInfo._createInfoPage.bind(renderInfo, LS_IS_USER_LOGGEDIN),
        '#discuss': renderDiscuss.createDiscussionPage.bind(
            renderDiscuss,
            LS_IS_USER_LOGGEDIN,
        ),
        '#contact': renderContact._createContact,
        '#profile': () => {
            if (!localStorage.getItem(LS_IS_USER_LOGGEDIN)) {
                location.hash = 'login';
            } else {
                renderProfile.createUserProfile(userName);
            }
        },
    };

    const updateContent = () => {
        const hash = window.location.hash.trim() || '#home';
        const routeContent = routes[hash] ?? defaultRouteContent;
        routeContent?.();
        window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', updateContent);
    updateContent();
}

const init = function () {
    if (localStorage.getItem(LS_IS_USER_LOGGEDIN)) {
        renderProfile.removeItem();
        renderProfile.createProfileLink();
    }
    initRouter();
    renderProfile.createLogout(LS_IS_USER_LOGGEDIN);
};
init();
