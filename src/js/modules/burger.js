import {
    disablePageScroll,
    enablePageScroll,
    clearQueueScrollLocks
} from 'scroll-lock';
// import {menuCategoryFilter} from "@/js/modules/menu-category-filter.js";

export function burger() {
    const burgerBtn = document.querySelector(".header__burger-btn");
    const burgerMenu = document.querySelector(".burger");
    const burgerBg = document.querySelector(".burger__bg");

    if (!burgerBtn || !burgerMenu) return;

    const closeBurger = () => {
        burgerBtn.classList.remove("active");
        burgerMenu.classList.remove("active");
        burgerBg?.classList.remove("active");

        enablePageScroll(burgerMenu);
        clearQueueScrollLocks();
        document.dispatchEvent(new Event('burger:close'));
    }

    const toggleMenu = () => {
        const isActive = burgerMenu.classList.toggle("active");

        burgerBtn.classList.toggle("active", isActive);
        burgerBg?.classList.toggle("active", isActive);

        if (isActive) {
            disablePageScroll(burgerMenu);
        } else {
            closeBurger();
            // clearQueueScrollLocks();
        }
    };

    burgerMenu.addEventListener("click", async (e) => {
        const filterBtn = e.target.closest('[data-burger-close]');

        if (e.target.closest('[data-burger-close]')) {

            // const category = filterBtn.dataset.categoryFilter;
            const type = filterBtn.dataset.typeFilter;
            const originalHref = filterBtn.href;
            if (type) {
                e.preventDefault();
                const queries = {
                    // _chosenCategory: category,
                    _chosenType: type,
                }

                const params = new URLSearchParams(queries);
                let separator;
                if (originalHref.includes('?')) {
                    separator = '&'
                } else {
                    separator = '?'
                }
                closeBurger();
                window.location.href = originalHref + separator + params;
            } else {closeBurger();}
        }
    });

    burgerBtn.addEventListener("click", toggleMenu);
    burgerBg?.addEventListener("click", closeBurger);

    window.addEventListener("resize", () => {
        closeBurger();
    })
}