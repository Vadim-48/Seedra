let oneNewsSwiper = null;
let isListenerAdded = false;

const breakpoint = window.matchMedia('(max-width: 768px)');
const minSlides = 4;

let originalMarkup = null;

const getWrapper = () =>
    document.querySelector('.one-news__aside .swiper-wrapper');

const duplicateSlidesIfNeeded = () => {
    const wrapper = getWrapper();
    if (!wrapper) return;

    const slides = wrapper.querySelectorAll('.swiper-slide');

    if (slides.length >= minSlides) return;

    const originalSlides = Array.from(slides);

    while (wrapper.children.length < minSlides) {
        originalSlides.forEach(slide => {
            wrapper.appendChild(slide.cloneNode(true));
        });
    }
};

const initOneNewsSwiper = () => {
    const wrapper = getWrapper();
    if (!wrapper) return;

    // Зберігаємо оригінальний стан
    if (!originalMarkup) {
        originalMarkup = wrapper.innerHTML;
    }

    duplicateSlidesIfNeeded();

    oneNewsSwiper = new Swiper('.one-news__aside .swiper', {
        slidesPerView: 1.1,
        spaceBetween: 10,
        loop: true,
        watchOverflow: false,
        observer: true,
        observeParents: true,
        breakpoints: {
            450: {
                slidesPerView: 1.4,
            },
            600: {
                slidesPerView: 1.8,
            },
        }
    });
};

const destroyAll = () => {
    if (oneNewsSwiper) {
        oneNewsSwiper.destroy(true, true);
        oneNewsSwiper = null;
    }

    // Повертаємо оригінальні слайди
    const wrapper = getWrapper();
    if (wrapper && originalMarkup) {
        wrapper.innerHTML = originalMarkup;
    }
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!oneNewsSwiper && document.querySelector('.one-news__aside .swiper')) {
            initOneNewsSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initAsideSwiper = () => {
    check();

    if (!isListenerAdded) {
        breakpoint.addEventListener('change', check);
        isListenerAdded = true;
    }
};
