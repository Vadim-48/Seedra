let productsSwiper = null;

const breakpoint = window.matchMedia('(max-width: 576px)');

const initProductsSwiper = () => {
    productsSwiper = new Swiper('.products-prev__swiper', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        breakpoints: {
            400: {
                slidesPerView: 1.3,
            },
            470: {
                slidesPerView: 1.5,
            },
        }
    });
};

const destroyAll = () => {
    productsSwiper?.destroy(true, true);
    productsSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!productsSwiper && document.querySelector('.products-prev__swiper')) {
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