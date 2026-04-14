// import {app} from '@/firebase/firebase.js';
import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {initSortContent} from "@/js/modules/innit-sort-content.js";
import {innitSearchTitle} from "@/js/modules/search-title.js";
import {innitToolbarDropdown} from "@/js/modules/toolbar-dropdown.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    updateCartIcon();
    updateFavoriteIcon();
    initSortContent();
    innitSearchTitle();
    innitToolbarDropdown();
    await innitGlobalSearch();
});

