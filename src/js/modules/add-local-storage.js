export function addLocalStorage() {

    const cardProduct = document.querySelectorAll("[data-product-id]");
    // let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];
    // let cadsStorageArr =  [];
    // console.log("fhfgh",cardProduct); data-pack-count


    cardProduct.forEach(product => {
        const btn = product.querySelector("[data-btn-add]");

        if (!btn) return;
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];

            const packCountEl = product.querySelector("[data-pack-count]");
            let packCount = 1;
            if (packCountEl) {
                packCount = parseFloat(packCountEl.textContent.replace("$", ""));
            }

            const productId = product.dataset.productFirebase;

            const exists = cadsStorageArr.some(item => item.productId === productId);
            if (!exists) {
                const productToSave = {
                    productId: productId,
                    packCount: packCount,
                };

                cadsStorageArr.push(productToSave);
                localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
            } else {
                // console.log("productToSave", cadsStorageArr[productId].packCount);
                const existingProduct = cadsStorageArr.find(item => item.productId === productId);
                if (existingProduct) {
                    existingProduct.packCount = packCount;
                    localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
                }
            }
        });
    })
}