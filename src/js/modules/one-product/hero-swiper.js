let heroProductSwiper = null;
let heroProductThumbsSwiper = null;
const thumbsSlides = document.querySelectorAll(".hero-product__thumbsSwiper .swiper-slide").length;


export const initProductSwiper = () => {

    heroProductThumbsSwiper = new Swiper(".hero-product__thumbsSwiper", {
        spaceBetween: 10,
        slidesPerView: 6,
        // loop: true,
        loop: thumbsSlides > 6,
        watchSlidesProgress: true,
    });

    heroProductSwiper = new Swiper('.hero-product__swiper', {
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: false,
        loop: true,
        thumbs: {
            swiper: heroProductThumbsSwiper,
        },
    });
};
