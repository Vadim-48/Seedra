let productsSwiper = null;
let blogPreviewSwiper = null;

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

const initBlogPreviewSwiper = () => {
    blogPreviewSwiper = new Swiper('.blog-preview .swiper', {
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
    blogPreviewSwiper?.destroy(true, true);
    productsSwiper = null;
    blogPreviewSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!productsSwiper && document.querySelector('.products .swiper')) {
            initProductsSwiper();
        }
        if (!blogPreviewSwiper && document.querySelector('.blog-preview .swiper')) {
            initBlogPreviewSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initSwipers = () => {
    check();
    breakpoint.addEventListener('change', check);
};