let heroProductSwiper = null;
let heroProductThumbsSwiper = null;

export const initProductSwiper = () => {

    heroProductThumbsSwiper = new Swiper(".hero-product__thumbsSwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        watchSlidesProgress: true,
    });

    heroProductSwiper = new Swiper('.hero-product__swiper', {
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: false,
        loop: true,
        thumbs: {
            swiper: heroProductThumbsSwiper,
        },
    });
};
