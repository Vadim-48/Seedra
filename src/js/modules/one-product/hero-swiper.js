import { stopAllVideos } from "@/js/modules/one-product/video-play.js";

let heroProductSwiper = null;
let heroProductThumbsSwiper = null;
const thumbsSlides = document.querySelectorAll(".hero-product__thumbsSwiper .swiper-slide").length;


export const initHeroSwiper = () => {

    heroProductThumbsSwiper = new Swiper(".hero-product__thumbsSwiper", {
        spaceBetween: 10,
        slidesPerView: 6,
        loop: true,
        // loop: thumbsSlides > 6,
        watchSlidesProgress: true,
        breakpoints: {
            1024: {
                spaceBetween: 10,
                slidesPerView: 6,
            },
            650: {
                spaceBetween: 6,
                slidesPerView: 10,
            },
            550: {
                spaceBetween: 10,
                slidesPerView: 8,
            },
        },
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

    heroProductSwiper.on('slideChange', () => {
        stopAllVideos();
    });
};
