'use strict';
export class LoginPage {
    // private-field
    #errorMessage = '*Погрешно корисничко име или лозинка';
    formEl;

    _createLogin(handleFormFunction) {
        const parentEl = document.querySelector('.parent');
        parentEl.innerHTML = '';
        const html = `
        <div class="m-auto w-4/5 pt-12">
          <h2 class="pb-8 md:text-5xl text-4xl font-black text-white drop-shadow-3xl">
              Придружи ни се
          </h2>
          <div class="lg:mr-[-1rem] flex lg:flex-row flex-col-reverse justify-between">
              <div class="lg:basis-2/4">
                  <div class="lg:mr-48">
                      <form id="authenticationForm" method="POST">
                          <button class="text-md mb-8 block w-full rounded border-2 border-purple-500 bg-white p-2 pl-4 text-left font-medium outline-none">
                              <i class="fa-brands fa-google fa-lg pr-4"></i>
                              Продолжи со Google
                          </button>
                          <button class="text-md mb-8 block w-full rounded border-2 border-purple-500 bg-white p-2 pl-4 text-left font-medium outline-none">
                              <i class="fa-brands fa-apple fa-xl pr-4"></i>
                              Продолжи со Apple
                          </button>
                          <button class="text-md block w-full rounded border-2 border-purple-500 bg-white p-2 pl-4 text-left font-medium outline-none">
                              <i class="fa-brands fa-tiktok fa-lg pr-4"></i>
                              Продолжи со TikTok
                          </button>
                          <div class="flex items-center py-6">
                              <hr class="h-px flex-1 border-purple-600 bg-purple-950"/>
                              <span class="px-4 font-medium text-white">или</span>
                              <hr class="h-px flex-1 border-purple-600" />
                          </div>
                          <div>
                          <label for="username" class="font-medium text-white">Корисничко име*</label>
                          <input type="text" id="username" name="username" required class="my-2 block w-full rounded border-2 border-purple-500 p-2 outline-none" placeholder="Username">
                        </div>
                          <div class="relative">
                          <label for="password" class="font-medium text-white">Лозинка*</label>
                          <input type="password" id="password" name="password" required placeholder="Password" class="my-2 block w-full rounded border-2 border-purple-500 p-2 outline-none relative">
                          <i class="fa-solid fa-eye-slash absolute top-12 right-4 text-custom-pink cursor-pointer" id="eye-show"></i>
                          </div>
                      
                      </form>
                      <div class="flex justify-between py-4 text-white">
                          <div class="flex items-center">
                              <input type="checkbox" id="check" />
                              <label for="check" class="pl-2 cursor-pointer">Запомни ме</label>
                          </div>
                          <div><a href="">Ја заборави лозинката?</a></div>
                      </div>
                      <div class="flex justify-center pt-8">
                          <button class="loginbtn rounded bg-white/30 px-20 py-1 font-bold text-links-color backdrop-brightness-110">
                              Најави се
                          </button>
                      </div>
                  </div>
              </div>
              <div class="basis-2/4">
                  <div class="lg:mr-16 mb-8">
                      <img src="img/login.png" alt="" class="max-w-full" />
                  </div>
              </div>
          </div>
      </div>
        `;

        parentEl.insertAdjacentHTML('afterbegin', html);
        this.formEl = document.querySelector('#authenticationForm');
        const login = document.querySelector('.loginbtn');

        const eyeIcon = document.getElementById('eye-show');
        const passwordInput = document.getElementById('password');

        eyeIcon.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            eyeIcon.classList.toggle('fa-eye-slash', !isPassword);
            eyeIcon.classList.toggle('fa-eye', isPassword);
        });

        // handling login functionality
        this.formEl.addEventListener('submit', handleFormFunction);
        login.addEventListener('click', handleFormFunction);

        return this.formEl;
    }

    renderError(message = this.#errorMessage) {
        const errSnackbar = this.formEl.querySelector('.errorSnackbar');

        if (!errSnackbar) {
            const html = `
            <div class="errorSnackbar animate-pulse rounded bg-white/80 border-l-4 py-1 border-red-600">
                <p class="pl-2 text-[0.8rem] text-red-600 font-medium">
                    <i class="fa-solid fa-circle-xmark text-red-600"></i> ${message}
                </p>
            </div>
            `;
            this.formEl.insertAdjacentHTML('beforeend', html);
        }
    }
}