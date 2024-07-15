class ContactPage {
  _createContact() {
      const parentEl = document.querySelector('.parent');
      parentEl.innerHTML = '';

      const html = `
  <div class="m-auto pt-12 w-4/5" id="contact">
  <h2 class="text-5xl  text-center font-black text-white drop-shadow-3xl">
      Контакт
  </h2>
  <div class="mt-8 pb-8">
      <h2 class="text-2xl font-bold text-links-color">
          Побарај стручна помош
      </h2>
      <div
          class="mt-8 rounded-xl border-t-2 border-white bg-white/50 p-6 backdrop-blur-sm"
      >
          <h3 class="text-lg font-semibold text-h3">
              Агенција за зашитита на личните податоци
          </h3>
          <p class="pt-4 text-sm text-par-custom">
              Лорем ипсум е едноставен модел на текст кој се користел
              во печатарската индустрија. Лорем ипсум бил индустриски
              стандард кој се користел како модел уште пред 1500
              години, кога непознат печатар зел кутија со букви и ги
              сложил на таков начин за да направи примерок на книга.
          </p>
      </div>
  </div>
  <h2 class="text-2xl font-bold text-links-color">
      Невладини организации
  </h2>
  <div class="mt-8">
      <div
          class="mb-8 rounded-xl border-t-2 border-white bg-white/50 md:p-6 p-4 text-justify backdrop-blur-sm"
      >
          <h3 class="font-semibold uppercase text-lg text-h3">ngo 1</h3>
          <div class="flex lg:flex-row flex-col items-center">
              <p class="md:pr-12 pl-0 py-4 text-sm text-par-custom">
                  Лорем ипсум е едноставен модел на текст кој се
                  користел во печатарската индустрија. Лорем ипсум бил
                  индустриски стандард кој се користел како модел уште
                  пред 1500 години, кога непознат печатар зел кутија
                  со букви и ги сложил на таков начин за да направи
                  примерок на книга.
              </p>
              <div class="w-full py-4 md:w-fit">
                  <a
                      href=""
                      class="rounded bg-custom-pink w-full inline-block text-center md:px-10 py-2 text-white"
                      >Линк</a
                  >
              </div>
          </div>
      </div>
      <div
          class="mb-8 rounded-xl border-t-2 border-white bg-white/50 md:p-6 p-4 text-justify  backdrop-blur-sm"
      >
          <h3 class="font-semibold uppercase text-lg text-h3">ngo 2</h3>
          <div class="flex lg:flex-row flex-col items-center">
              <p class="md:pr-12 pl-0 py-4 text-sm text-par-custom">
                  Лорем ипсум е едноставен модел на текст кој се
                  користел во печатарската индустрија. Лорем ипсум бил
                  индустриски стандард кој се користел како модел уште
                  пред 1500 години, кога непознат печатар зел кутија
                  со букви и ги сложил на таков начин за да направи
                  примерок на книга.
              </p>
              <div class="w-full py-4 md:w-fit">
                  <a
                      href=""
                      class="rounded bg-custom-pink md:px-10 w-full inline-block text-center py-2 text-white"
                      >Линк</a
                  >
              </div>
          </div>
      </div>
      <div
          class="rounded-xl border-t-2 border-white bg-white/50 md:p-6 p-4 text-justify  backdrop-blur-sm"
      >
          <h3 class="font-semibold uppercase text-lg text-h3">ngo 3</h3>
          <div class="flex lg:flex-row flex-col text-justify items-center">
              <p class="md:pr-12 pl-0 py-4 text-sm text-par-custom">
                  Лорем ипсум е едноставен модел на текст кој се
                  користел во печатарската индустрија. Лорем ипсум бил
                  индустриски стандард кој се користел како модел уште
                  пред 1500 години, кога непознат печатар зел кутија
                  со букви и ги сложил на таков начин за да направи
                  примерок на книга.
              </p>
              <div class="w-full py-4 md:w-fit">
                  <a
                      href=""
                      class="rounded bg-custom-pink md:px-10 w-full inline-block text-center py-2 text-white"
                      >Линк</a
                  >
              </div>
          </div>
      </div>
  </div>
</div>
`;
      parentEl.insertAdjacentHTML('afterbegin', html);
  }
}

export default new ContactPage();