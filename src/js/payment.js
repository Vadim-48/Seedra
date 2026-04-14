import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {initPaymentFormValidate} from "@/js/pages/cart/validate-payment.js";
// import {changePaymentCard} from "@/js/modules/cart/change-payment-card.js";
import {innitFinalPrice} from "@/js/pages/cart/innit-final-price.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initPaymentFormValidate();
    // changePaymentCard();

    updateCartIcon();
    updateFavoriteIcon();
    innitFinalPrice();
    await innitGlobalSearch();
});

