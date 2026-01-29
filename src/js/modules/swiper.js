let productsSwiper = null;
let blogSwiper = null;

const breakpoint = window.matchMedia('(max-width: 576px)');

const initProductsSwiper = () => {
    productsSwiper = new Swiper('.products .swiper', {
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

const initBlogSwiper = () => {
    blogSwiper = new Swiper('.blog .swiper', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        breakpoints: {
            450: {
                slidesPerView: 1.3,
            },
        }
    });
};

const destroyAll = () => {
    productsSwiper?.destroy(true, true);
    blogSwiper?.destroy(true, true);
    productsSwiper = null;
    blogSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!productsSwiper && document.querySelector('.products .swiper')) {
            initProductsSwiper();
        }
        if (!blogSwiper && document.querySelector('.blog .swiper')) {
            initBlogSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initSwipers = () => {
    check();
    breakpoint.addEventListener('change', check);
};