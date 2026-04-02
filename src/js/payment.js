import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {initPaymentFormValidate} from "@/js/modules/cart/validate-payment.js";
import {changePaymentCard} from "@/js/modules/cart/change-payment-card.js";
import {innitFinalPrice} from "@/js/modules/cart/innit-final-price.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initPaymentFormValidate();
    changePaymentCard();

    updateCartIcon();
    updateFavoriteIcon();
    innitFinalPrice();

});

