let feedbackSwiper = null;



export const initFeedbackSwiper = () => {
    feedbackSwiper = new Swiper('.feedback .swiper', {
        slidesPerView: 1.15,
        spaceBetween: 15,
        centeredSlides: false,
        loop: true,
        breakpoints: {
            575: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                centeredSlides: true,
            },
            700: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: true,
            },
            1000: {
                slidesPerView: 2.6,
                spaceBetween: 30,
                centeredSlides: true,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
};