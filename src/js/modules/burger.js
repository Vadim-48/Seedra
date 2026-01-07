export function burger() {
    const burgerBtn = document.querySelector(".header__burger-btn");
    const burger = document.querySelector(".burger");
    const burgerBg = document.querySelector(".burger__bg");
    const body = document.body;
    const burgerLink = document.querySelector(".burger__menu-link");

    const toggleMenu = () => {
        burgerBtn.classList.toggle("active");
        burger.classList.toggle("active");
        burgerBg.classList.toggle("active");
        body.classList.toggle("lock")
    }

    const closeBurger = () =>{
        burgerBtn.classList.remove("active");
        burger.classList.remove("active");
        burgerBg.classList.remove("active");
        body.classList.remove("lock")
    }

    burgerBtn.addEventListener("click", toggleMenu);
    burgerLink.addEventListener("click", closeBurger);
    burgerBg.addEventListener("click", closeBurger);

    document.querySelectorAll(".js-close-burger").forEach(el => {
        el.addEventListener("click", closeBurger);
    })

    window.addEventListener("resize", () => {
        if (window.innerWidth >=1101) {
            closeBurger();
        }
    })
}