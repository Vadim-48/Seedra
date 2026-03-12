let teamSwiper = null;

const breakpoint = window.matchMedia('(max-width: 576px)');

const initSwiper = () => {
    teamSwiper = new Swiper('.our-team__swiper', {
        slidesPerView: 2.25,
        spaceBetween: 15,
        loop: true,
        observer: true,
        observeParents: true,
        watchOverflow: true,
    });
};

const destroyAll = () => {
    teamSwiper?.destroy(true, true);
    teamSwiper = null;
};

const check = () => {
    if (!window.Swiper) return;

    if (breakpoint.matches) {
        if (!teamSwiper && document.querySelector('.our-team__swiper')) {
            initSwiper();
        }
    } else {
        destroyAll();
    }
};

export const initOurTeamSwiper = () => {
    check();
    breakpoint.addEventListener('change', check);
};