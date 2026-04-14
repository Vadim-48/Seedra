import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initFormValidate} from "@/js/pages/cart/validate-checkout.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {innitFinalPrice} from "@/js/pages/cart/innit-final-price.js";
import {loadCardsCheckout} from "@/js/pages/cart/innit-cart-checkout.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initFormValidate();

    updateCartIcon();
    updateFavoriteIcon();
    innitFinalPrice();

    await Promise.all([
        innitGlobalSearch(),
        loadCardsCheckout(),
    ]);

});