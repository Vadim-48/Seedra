import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initFormValidate} from "@/js/modules/cart/validate-checkout.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {innitFinalPrice} from "@/js/modules/cart/innit-final-price.js";
import {loadCardsCheckout} from "@/js/modules/cart/innit-cart-checkout.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initFormValidate();

    updateCartIcon();
    updateFavoriteIcon();
    innitFinalPrice();

    await Promise.all([
        loadCardsCheckout(),
    ]);

});