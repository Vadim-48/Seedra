import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {loadFavoriteCards} from "@/js/pages/favorite/innit-favorite.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {addCartLocalStorage} from "@/js/modules/add-cart-local-storage.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    updateCartIcon();
    updateFavoriteIcon();

    await Promise.all([
        innitGlobalSearch(),
        loadFavoriteCards(),
    ]);
    addCartLocalStorage();

});