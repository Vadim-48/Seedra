let blogPreviewSwiper = null;

const breakpoint = window.matchMedia('(max-width: 576px)');

const initBlogSwiper = () => {
    blogPreviewSwiper = new Swiper('.blog-prev__swiper', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        breakpoints: {
            450: {
                slidesPerView: 1.3,
            },
        }
    });
};

const destroyAll = () => {
    blogPreviewSwiper?.destroy(true, true);
    blogPreviewSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!blogPreviewSwiper && document.querySelector('.blog-prev__swiper')) {
            initBlogSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initBlogPreviewSwiper = () => {
    check();
    breakpoint.addEventListener('change', check);
};