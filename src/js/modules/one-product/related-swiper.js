let relatedSwiper = null;

export const initRelatedSwiper = () => {
    relatedSwiper = new Swiper('.related__swiper', {
        slidesPerView: 1.1,
        spaceBetween: 10,
        loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 30,
            },
            476: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });
};