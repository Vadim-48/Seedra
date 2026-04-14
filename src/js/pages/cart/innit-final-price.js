import {formatMoney} from "@/js/modules/format-money.js";

export function innitFinalPrice() {
    const finalPriceData = JSON.parse(localStorage.getItem("finalPrice"));
    const innitFinaPrice = document.querySelectorAll("[data-final-price]");
    if (!innitFinaPrice) {return}
    innitFinaPrice.forEach(item => {
        item.textContent = formatMoney(finalPriceData);
    })
}