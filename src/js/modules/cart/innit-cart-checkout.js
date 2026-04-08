import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";
import {formatMoney} from "@/js/modules/format-money.js";

export async function loadCardsCheckout() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })
    const carsWrap = document.querySelector(".info-cart__list");
    const templateWrap = document.querySelector("#list-item");
    const cartRawData = localStorage.getItem("cart");
    let cadsStorageArray = JSON.parse(cartRawData) || [];

    for (let i = 0; i < cadsStorageArray.length; i++) {
        const templateFragment = templateWrap.content.cloneNode(true);
        const cloneCard = templateFragment.querySelector(".info-cart__list-item");
        const productId = cadsStorageArray[i].productId;
        const innerTitle = cloneCard.querySelector(".info-cart__list-item-title");
        const innerPrice = cloneCard.querySelector(".info-cart__list-item-price");

        if (innerTitle && productsMap[productId].name) {
            innerTitle.textContent = productsMap[productId].name
        }
        if (innerPrice && productsMap[productId].price) {
            let totalProductPrice =productsMap[productId].price * cadsStorageArray[i].packCount;
            totalProductPrice = totalProductPrice.toFixed(2);
            innerPrice.textContent = formatMoney(totalProductPrice);
        }

        carsWrap.appendChild(cloneCard);
    }

}