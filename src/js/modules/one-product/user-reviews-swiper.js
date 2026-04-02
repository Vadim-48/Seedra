let userReviewsSwiper = null;


const breakpoint = window.matchMedia('(max-width: 768px)');

const initSwiper = () => {
    userReviewsSwiper = new Swiper('.user-reviews__swiper', {
        slidesPerView: 1.1,
        spaceBetween: 15,
        loop: true,
        loopedSlides: 3,
    });
};

const destroyAll = () => {
    userReviewsSwiper?.destroy(true, true);
    userReviewsSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!userReviewsSwiper && document.querySelector('.user-reviews__swiper')) {
            initSwiper();
        }
    } else {
        destroyAll();
    }
};


export const initUserReviewsSwiper = () => {
    check();
    breakpoint.addEventListener('change', check);
}