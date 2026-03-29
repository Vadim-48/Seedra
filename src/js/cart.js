import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {innitDeliveryDropdown} from "@/js/modules/cart/delivery-dropdown.js";
import {innitAmountPrice, loadCards} from "@/js/modules/cart/innit-cart.js";
// import {innitAmountPrice} from "@/js/modules/cart/count-price.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    innitDeliveryDropdown();

    await Promise.all([
        loadCards(),
    ]);

    innitAmountPrice();
});

// const cardsBody = document.querySelector(".cart-content__list-body");
// cardsBody.addEventListener("click", (e) => {
//     const btnRemove = e.target.closest('.cart-item__btn-del');
//     if (!btnRemove) return;
//     const productId = e.target.closest('.cart-item').dataset.productId;
//     console.log(productId);
// })



