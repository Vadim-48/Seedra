import { burger } from "@/js/modules/burger.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";
import { initAsideSwiper } from "@/js/modules/card-news/swiper-one-news.js";

document.addEventListener("DOMContentLoaded", async() => {

    burger();
    burgerAccordion();

    initAsideSwiper();
});