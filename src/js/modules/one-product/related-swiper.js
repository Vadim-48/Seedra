let relatedSwiper = null;

export const initRelatedSwiper = () => {
    relatedSwiper = new Swiper('.related__swiper', {
        slidesPerView: 1.08,
        spaceBetween: 15,
        loop: true,
        breakpoints: {
            1000: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            800: {
                slidesPerView: 2.5,
                spaceBetween: 30,
            },
            630: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            476: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
        },
    });
};