import { disablePageScroll, enablePageScroll, clearQueueScrollLocks } from 'scroll-lock';

export function burger() {
    const burgerBtn = document.querySelector(".header__burger-btn");
    const burgerMenu = document.querySelector(".burger");
    const burgerBg = document.querySelector(".burger__bg");

    if (!burgerBtn || !burgerMenu) return;

    const closeBurger = () =>{
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

    burgerMenu.addEventListener("click", (e) => {
        if (e.target.closest('[data-burger-close]')) {
            closeBurger();
        }
    });

    burgerBtn.addEventListener("click", toggleMenu);
    burgerBg?.addEventListener("click", closeBurger);

    window.addEventListener("resize", () => {
            closeBurger();
    })
}