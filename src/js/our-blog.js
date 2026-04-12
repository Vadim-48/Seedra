// import {app} from '@/firebase/firebase.js';
import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {initSort} from "@/js/modules/innit-sort.js";
import {innitSearchTitle} from "@/js/modules/search-title.js";


document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    updateCartIcon();
    updateFavoriteIcon();
    initSort();
    innitSearchTitle();
});

