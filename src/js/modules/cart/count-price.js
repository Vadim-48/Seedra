export  function innitAmountPrice() {


    function calcTotal() {
        const cartRawData = localStorage.getItem("cart");
        let cadsStorageArr = JSON.parse(cartRawData) || [];
        const totalPriceList = document.querySelectorAll("[data-product-total-price]");
        const innerTotalPrice = document.querySelectorAll("[data-total-price]");
        console.log(totalPriceList);

        const countCards = document.querySelectorAll("[data-total-items]");
        countCards.forEach(card => {
            if (cadsStorageArr.length === 1) {
                card.textContent = `${cadsStorageArr.length} ITEM`;
            } else card.textContent = `${cadsStorageArr.length} ITEMS`;
        })

        let totalAmount = 0;
        totalPriceList.forEach((item) => {
            totalAmount += parseFloat(item.textContent.replace("$", ""));
        })
        innerTotalPrice.forEach((item) => {
            item.textContent = "$" + totalAmount.toFixed(2);
        })
    }

    calcTotal();

    document.querySelector('.cart-content__list-body').addEventListener('click', (e) => {
        const addAmount = e.target.closest('.amount__number-add');
        const removeAmount = e.target.closest('.amount__number-remove');

        if (addAmount) {
            const amountEl = addAmount.closest('.amount__number').querySelector('.amount__number-item');
            amountEl.textContent = Number(amountEl.textContent) + 1;
        }

        if (removeAmount) {
            const amountEl = removeAmount.closest('.amount__number').querySelector('.amount__number-item');
            let count = Number(amountEl.textContent);
            if (count > 1) amountEl.textContent = count - 1;
        }

        const totalPriceEL = e.target.closest('.cart-item').querySelector('[data-product-total-price]');
        const priceEl = e.target.closest('.cart-item').querySelector('[data-product-price]');
        const amountEl = e.target.closest('.cart-item').querySelector('.amount__number-item');

        const amount =  parseInt(amountEl.textContent);
        const price = parseFloat(priceEl.textContent.replace("$", ""));
        const totalPrice = amount * price;

        totalPriceEL.textContent = "$" + totalPrice.toFixed(2);
        calcTotal();
    })

}
