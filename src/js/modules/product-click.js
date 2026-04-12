export function innitProductClick() {
    const productsArea = document.querySelector("[data-product-cards-wrap]");
    const productsClickArr = [];
    productsClickArr.push(productsArea); //data-btn-discover
    const btnDiscover = document.querySelector("[data-product-card-discover]");
    let btnDiscoverhref= null;
    if (btnDiscover) {
        productsClickArr.push(btnDiscover);
        btnDiscoverhref = btnDiscover.href
    }

    productsClickArr.forEach(item => {
        item.addEventListener("click", (e) => {
            const isActionButton = e.target.closest("[data-btn-add]") ||
                e.target.closest("[data-product-favorite]") ||
                e.target.closest(".favorite-item__btn-del");
            if (isActionButton) return;
            e.preventDefault();
            const clickEl = e.target.closest(".card") || e.target.closest("[data-product-card-hero]")
            if (!clickEl) return;

            const productId = clickEl.dataset.productId;

            const queries = {
                _productId: productId,
            }
            const params = new URLSearchParams(queries);

            let baseElUrl= null;
            if (!btnDiscover) {

                baseElUrl = clickEl.getAttribute('href').split('?')[0];
            } else {
                baseElUrl = (btnDiscoverhref || "").split('?')[0];
            }
            window.location.href = baseElUrl + "?" + params;
        })
    })




}