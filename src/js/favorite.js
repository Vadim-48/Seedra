import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {loadFavoriteCards} from "@/js/modules/favorite/innit-favorite.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    loadFavoriteCards();

    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
            updateCartIcon();
        }
        if (event.key === 'favorite') {
            updateFavoriteIcon();
        }
    });

});