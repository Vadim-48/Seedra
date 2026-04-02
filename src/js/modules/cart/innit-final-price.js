export function innitFinalPrice() {
    const finalPrice = JSON.parse(localStorage.getItem("finalPrice"));
    const innitFinaPrice = document.querySelectorAll("[data-final-price]");
    if (!innitFinaPrice) {return}
    innitFinaPrice.forEach(item => {
        item.textContent = "$" + finalPrice;
    })
}