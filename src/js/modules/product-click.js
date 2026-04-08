export function innitProductClick() {
    const productsArea = document.querySelector("[data-product-cards-wrap]");

    productsArea.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.closest("[data-product-favorite]") || e.target.closest("[data-btn-add]")) {
            return
        }
        const clickEl = e.target.closest(".card");
        const productId = clickEl.dataset.productId;

        const queries = {
            _productId: productId,
        }
        const params = new URLSearchParams(queries);
        // const baseElUrl = clickEl.href;
        const baseElUrl = clickEl.getAttribute('href').split('?')[0];
        window.location.href = baseElUrl + "?" + params;
    })
}