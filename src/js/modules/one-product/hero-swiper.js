import { stopAllVideos } from "@/js/modules/one-product/video-play.js";

let heroProductSwiper = null;
let heroProductThumbsSwiper = null;
const thumbsSlides = document.querySelectorAll(".hero-product__thumbsSwiper .swiper-slide").length;


export const initHeroSwiper = () => {

    heroProductThumbsSwiper = new Swiper(".hero-product__thumbsSwiper", {
        spaceBetween: 10,
        slidesPerView: 6,
        loop: true,
        // loopedSlides: loopedAmount,
        slideToClickedSlide: true,
        // loop: thumbsSlides > 6,
        watchSlidesProgress: true,
        grabCursor: true,

        breakpoints: {
            768: {
                spaceBetween: 10,
                slidesPerView: 6,
                loop: true,
            },
            550: {
                spaceBetween: 10,
                slidesPerView: 9,
                loop: thumbsSlides > 7,
            },
        },
    });

    heroProductSwiper = new Swiper('.hero-product__swiper', {
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: false,
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: heroProductThumbsSwiper,
        },
    });

    heroProductSwiper.on('slideChange', () => {
        stopAllVideos();
    });
};
