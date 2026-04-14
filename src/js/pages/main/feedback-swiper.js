export let feedbackSwiper = null;

export const initFeedbackSwiper = () => {
    // const swiperContainer = document.querySelector('[data-reviews-wrap]');
    // const slides = swiperContainer.querySelectorAll('.swiper-slide');
    // const count = slides.length;
    // if (feedbackSwiper) feedbackSwiper.destroy(true, true);
    feedbackSwiper = new Swiper('.feedback .swiper', {
        slidesPerView: 1.15,
        spaceBetween: 15,
        centeredSlides: false,
        loop: true,
        grabCursor: true,

        breakpoints: {
            650: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                centeredSlides: true,
            },
            850: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: true,
            },
            1200: {
                slidesPerView: 2.6,
                spaceBetween: 30,
                centeredSlides: true,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // on: {
        //     init(swiper) {
        //         requestAnimationFrame(() => swiper.update());
        //     },
        //     resize(swiper) {
        //         requestAnimationFrame(() => swiper.update());
        //     }
        // }
    });
};