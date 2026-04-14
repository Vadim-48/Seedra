import { burger } from "@/js/modules/burger.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";
import { initAsideSwiper } from "@/js/pages/card-news/swiper-one-news.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";

document.addEventListener("DOMContentLoaded", async() => {

    burger();
    burgerAccordion();
    await innitGlobalSearch();

    initAsideSwiper();
    updateCartIcon();
    updateFavoriteIcon();
});