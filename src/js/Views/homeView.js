import { doc } from "prettier";
import '../../style.css';

class RenderHomePage {
  _createHomePage() {
    const parentEl = document.querySelector(".parent")
    parentEl.innerHTML = '';
    const html = `
    <div class="" id="home">
    <video class="lg:h-[580px] w-full object-cover" autoplay muted>
        <source src="../img/intro_video.mp4" type="video/mp4" />
    </video>
</div>
<h1 class="py-14 text-center lg:text-5xl text-4xl font-black text-white drop-shadow-3xl">
    Информирај се и заштити се
</h1>
<div class="m-auto w-4/5 lg:w-4/5 md:w-11/12" id="home">
    <div class="mr-[-1rem] md:flex flex-col md:flex-row flex-wrap">
        <div class="item lg:basis-1/3 md:basis-1/2">
            <div class="mr-6 mb-6 rounded-2xl bg-custom-pink-2 p-6">
                <div class="flex items-center">
                    <h2 class="text-xl font-bold text-par-custom">
                        Научи се што треба да знаеш
                    </h2>
                    <img
                        src="img/mdi_eye-lock-outline.png"
                        class="w-16"
                        alt=""
                    />
                </div>
                <p class="py-4 text-[0.9rem] leading-[26px] text-par-custom">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                </p>
                <a href="#info"
                    class="inline-block text-center w-full rounded-lg bg-white/50 py-1 text-lg font-bold text-links-color shadow-custom-shadow backdrop-blur-lg"
                >
                    Дознај повеќе
                </a>
            </div>
        </div>
        <div class="lg:basis-1/3 md:basis-1/2">
            <div class="mr-6 mb-6 rounded-2xl bg-regal-blue p-6">
                <div class="flex items-center">
                    <h2 class="text-xl font-bold text-par-custom">
                        Вклучи се во дискуија
                    </h2>
                    <img
                        src="img/mdi_encryption-check.png"
                        class="w-16"
                        alt=""
                    />
                </div>
                <p class="py-4 text-[0.9rem] leading-[26px] text-par-custom">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                </p>
                <a href="#discuss"
                    class="inline-block text-center w-full rounded-lg bg-white/50 py-1 text-lg font-bold text-links-color shadow-custom-shadow backdrop-blur-lg"
                >
                    Дознај повеќе
                </a>
            </div>
        </div>
        <div class="lg:basis-1/3 md:basis-1/2">
            <div class="mr-6 mb-6 rounded-2xl bg-minty-lime p-6">
                <div class="flex items-center">
                    <h2 class="text-xl font-bold text-par-custom">
                        Следи го својот напредок
                    </h2>
                    <img
                        src="img/mdi_user-access-control.png"
                        class="w-16"
                        alt=""
                    />
                </div>
                <p class="py-4 text-[0.9rem] leading-[26px] text-par-custom">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                </p>
                <a href="#profile"
                    class="inline-block text-center w-full rounded-lg bg-white/50 py-1 text-lg font-bold text-links-color shadow-custom-shadow backdrop-blur-lg"
                >
                    Дознај повеќе
                </a>
            </div>
        </div>
    </div>
</div>

    `;

    parentEl.insertAdjacentHTML('afterbegin', html);
    const video = document.querySelector('video');

    video.addEventListener('ended', function () {
        video.play();
    });
}
}

export default new RenderHomePage()