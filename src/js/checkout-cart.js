import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initFormValidate} from "@/js/modules/cart/validate-checkout.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initFormValidate();

});