import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

});

const paymentForm = document.getElementById('payment-form');
const inputList = paymentForm.querySelectorAll('input');

inputList.forEach(input => {
    input.addEventListener('input', () => {
        let digits = input.value.replace(/\D/g, '');

    if (input.name === 'card-number') {
        digits = digits.substring(0, 16);
        digits = digits.replace(/(.{4})/g, '$1 ').trim();
    }
    if (input.name === 'expiry-date') {
        digits = digits.substring(0, 4);
        if (digits.length > 2) {
            digits = digits.substring(0, 2) + '/' + digits.substring(2);
        }
    }

    input.value = digits;
    })
})