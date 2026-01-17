import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export function burger() {
    const burgerBtn = document.querySelector(".header__burger-btn");
    const burger = document.querySelector(".burger");
    const burgerBg = document.querySelector(".burger__bg");
    // const body = document.body;
    const burgerLink = document.querySelector(".burger__menu-link");

    if (!burgerBtn || !burger) return;

    const toggleMenu = () => {
        const isActive = burger.classList.toggle("active");

        burgerBtn.classList.toggle("active", isActive);
        burgerBg.classList.toggle("active", isActive);

        if (isActive) {
            disablePageScroll();
        } else {
            enablePageScroll();
        }
    };

    const closeBurger = () =>{
        burgerBtn.classList.remove("active");
        burger.classList.remove("active");
        burgerBg.classList.remove("active");
        // body.classList.remove("lock")

        enablePageScroll();
    }

    burgerBtn.addEventListener("click", toggleMenu);
    burgerLink?.addEventListener("click", closeBurger);
    burgerBg.addEventListener("click", closeBurger);

    document.querySelectorAll(".js-close-burger").forEach(el => {
        el.addEventListener("click", closeBurger);
    })

    window.addEventListener("resize", () => {
            closeBurger();
    })

}