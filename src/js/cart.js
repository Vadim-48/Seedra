import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {innitAmount} from "@/js/modules/amount-count.js";
import {innitDeliveryDropdown} from "@/js/modules/cart/delivery-dropdown.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    innitAmount();
    innitDeliveryDropdown();
});