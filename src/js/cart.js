import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {innitDeliveryDropdown} from "@/js/modules/cart/delivery-dropdown.js";
import {innitAmountPrice, loadCards} from "@/js/modules/cart/innit-cart.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    innitDeliveryDropdown();
    updateCartIcon();
    updateFavoriteIcon();

    await Promise.all([
        loadCards(),

    ]);
    innitAmountPrice();
});




