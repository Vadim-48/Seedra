let productsSwiper = null;

const breakpoint = window.matchMedia('(max-width: 576px)');

export const initProductsSwiper = () => {
    const swiperContainer = document.querySelector('.products-prev__swiper');
    const slides = swiperContainer.querySelectorAll('.swiper-slide');
    const count = slides.length;

    productsSwiper = new Swiper('.products-prev__swiper', {
        slidesPerView: count === 1 ? 1 : 1.08,
        // slidesPerView: 1.1,
        spaceBetween: 20,
        // loop: true,
        loop: count > 2,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        breakpoints: {
            400: {
                slidesPerView: count === 1 ? 1 : 1.3,
            },
            470: {
                slidesPerView: count === 1 ? 1 : 1.5,
            },
        }
    });
};

export const destroyAll = () => {
    productsSwiper?.destroy(true, true);
    productsSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!productsSwiper) {
            initProductsSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initProductsPrevSwiper = () => {
    check();
    breakpoint.addEventListener('change', check);
};