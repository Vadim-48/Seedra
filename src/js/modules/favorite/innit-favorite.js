import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";
import {
    updateFavoriteIcon,
    updateCartIcon,
} from "@/js/modules/update-header-icons.js";

function calcCards(length) {
    const cardsNumberEl = document.querySelector("[data-total-items]");
    if (length == 1) {
        cardsNumberEl.textContent = length + " item";
    } else cardsNumberEl.textContent = length + " items";

    updateCartIcon();
    updateFavoriteIcon();
}

export async function loadFavoriteCards() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })

    const cardsBody = document.querySelector(".your-favorite__list-body");
    const card = document.querySelector(".favorite-item");
    const favoriteRawData = localStorage.getItem("favorite");
    let cadsFavoriteList = JSON.parse(favoriteRawData) || [];
    calcCards(cadsFavoriteList.length);

    for (let i = 0; i < cadsFavoriteList.length; i++) {
        const productId = cadsFavoriteList[i];
        // const productData = productsMap[productId];
        // if (!productData) continue;

        const cloneCard = card.cloneNode(true);
        cloneCard.dataset.productId = productId;

        const innerPhoto = cloneCard.querySelector('[data-product-photo]');
        const innerTitle = cloneCard.querySelector("[data-product-title]");
        const innerPrice = cloneCard.querySelector('[data-product-price]');

        if (productsMap[productId].photo && innerPhoto) innerPhoto.src = productsMap[productId].photo;
        if (productsMap[productId].name && innerTitle) innerTitle.textContent = productsMap[productId].name;
        if (productsMap[productId].price != null && innerPrice != null) {
            innerPrice.textContent = "$" + Number(productsMap[productId].price).toFixed(2)
        }

        cardsBody.appendChild(cloneCard);

    }

    cardsBody.addEventListener("click", (e) => {
        const btnRemove = e.target.closest('.favorite-item__btn-del');
        if (!btnRemove) return;

        const cardRemove = e.target.closest('.favorite-item');
        const idFromDom = cardRemove.dataset.productId;
        cardRemove.remove();

        cadsFavoriteList = cadsFavoriteList.filter((item) => item !== idFromDom);
        localStorage.setItem('favorite', JSON.stringify(cadsFavoriteList));
        calcCards(cadsFavoriteList.length);
    });
}