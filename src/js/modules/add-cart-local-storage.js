import {
    updateFavoriteIcon,
    updateCartIcon,
} from "@/js/modules/update-header-icons.js";

function markProduct(product) {

    let cadsStorageList = JSON.parse(localStorage.getItem('cart')) || [];
    const productId = product.dataset.productId;
    const currentProductData = cadsStorageList.find(item => item.productId === productId);
    const productBtnIcon = product.querySelector('[data-btn-add] svg use');
    if (productBtnIcon) {
        if (currentProductData) {
            const productBtn = product.querySelector('[data-btn-add]');
            const currentHref = productBtnIcon.getAttribute('href');
            const baseSpritePath = currentHref.split('#')[0];
            const newPath = `${baseSpritePath}#icon-added`;

            productBtnIcon.setAttribute('href', newPath);
            productBtn.classList.add('added');
        }
    }
    updateCartIcon();
    updateFavoriteIcon();
}


export function addCartLocalStorage() {

    const cardProduct = document.querySelectorAll("[data-product-id]");
    // let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];
    // let cadsStorageArr =  [];
    // localStorage.setItem('cart', JSON.stringify(cadsStorageArr));

    cardProduct.forEach(product => {
        const btn = product.querySelector("[data-btn-add]");

        markProduct(product);

        if (!btn) return;
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];

            const packCountEl = product.querySelector("[data-pack-count]");
            let packCount = 1;
            if (packCountEl) {
                packCount = parseFloat(packCountEl.textContent.replace(/\$/g, ""));
            }

            const productId = product.dataset.productId;
            const existProduct = cadsStorageArr.find(item => item.productId === productId);
            if (existProduct) {
                existProduct.packCount = packCount;
            } else {
                const productToSave = {
                    productId: productId,
                    packCount: packCount,
                };
                cadsStorageArr.push(productToSave);

            }
            localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
            markProduct(product);
        });
    })
}