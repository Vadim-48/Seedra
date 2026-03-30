import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initFormValidate} from "@/js/modules/contact/validate.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    initFormValidate();

    updateCartIcon();
    updateFavoriteIcon();

});