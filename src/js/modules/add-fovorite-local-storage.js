import {
    updateFavoriteIcon,
    updateCartIcon,
} from "@/js/modules/update-header-icons.js";

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function markFavorite(card) {
    let cadsFavoriteData = JSON.parse(localStorage.getItem('favorite')) || [];
    const productId = card.dataset.productId;
    const currentProductData = cadsFavoriteData.find(item => item === productId);
    const btnFavoriteIcon = card.querySelector("[data-product-favorite] svg use");

    if (!btnFavoriteIcon) {
        return
    }

    const btnFavorite = card.querySelector("[data-product-favorite]");
    // const productBtnIcon = product.querySelector('[data-btn-add] svg use');
    const currentHref = btnFavoriteIcon.getAttribute('href');
    const baseSpritePath = currentHref.split('#')[0];
    let newPath;
    if (currentProductData) {
        newPath = `${baseSpritePath}#icon-favorite-full`;
        btnFavorite.classList.add('added');
    } else {
        newPath = `${baseSpritePath}#icon-favorite`;
        btnFavorite.classList.remove('added');
    }
    btnFavoriteIcon.setAttribute('href', newPath);

    updateCartIcon();
    updateFavoriteIcon();
}


export function addFavoriteLocalStorage() {
    const cardsProductList = document.querySelectorAll("[data-product-id]");
    // let cadsFavoriteData = [];
    // markFavorite(card);

    cardsProductList.forEach((card) => {
        const btnFavorite = card.querySelector("[data-product-favorite]");
        markFavorite(card);

        if (!btnFavorite) return;
        btnFavorite.addEventListener("click", (event) => {
            event.preventDefault();
            let cadsFavoriteData = JSON.parse(localStorage.getItem('favorite')) || [];

            const productId = card.dataset.productId;
            // console.log(productId);

            const exists = cadsFavoriteData.find(item => item === productId);
            if (!exists) {
                cadsFavoriteData.push(productId);
                localStorage.setItem('favorite', JSON.stringify(cadsFavoriteData));

                Toastify({
                    text: "Product added to favorite",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    style: { background: "#28a745" }
                }).showToast();

            } else {
                cadsFavoriteData = cadsFavoriteData.filter(item => item !== exists);
                localStorage.setItem('favorite', JSON.stringify(cadsFavoriteData));

                Toastify({
                    text: "Product delete from favorite",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    style: { background: "#dc3545" }
                }).showToast();
            }
            markFavorite(card);
        })
    })
}