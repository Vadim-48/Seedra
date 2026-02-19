import { burger } from "@/js/modules/burger.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";
// import { initAsideSwiper } from "@/js/modules/swiper-one-news.js";
import { loadProductsFirebase } from "@/js/modules/product-firebase.js";


document.addEventListener("DOMContentLoaded", async() => {

    burger();

    burgerAccordion();

    await loadProductsFirebase("product_hero-card","product-5");

    // initAsideSwiper();
});