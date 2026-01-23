let productsSwiper = null;
let reviewsSwiper = null;

const breakpoint = window.matchMedia('(max-width: 576px)');

const initProductsSwiper = () => {
    productsSwiper = new Swiper('.products .swiper', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: true,
    });
};

// const initReviewsSwiper = () => {
//     reviewsSwiper = new Swiper('.reviews .swiper', {
//         slidesPerView: 1.15,
//         spaceBetween: 12,
//         loop: true,
//     });
// };

const destroyAll = () => {
    productsSwiper?.destroy(true, true);
    reviewsSwiper?.destroy(true, true);
    productsSwiper = null;
    reviewsSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!productsSwiper && document.querySelector('.products .swiper')) {
            initProductsSwiper();
        }
        if (!reviewsSwiper && document.querySelector('.reviews .swiper')) {
            initReviewsSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initSwipers = () => {
    check();
    breakpoint.addEventListener('change', check);
};
