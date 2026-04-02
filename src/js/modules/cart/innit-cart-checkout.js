import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

export async function loadCardsCheckout() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })
    const carsWrap = document.querySelector(".info-cart__list");
    const cardTemplate = carsWrap.querySelector(".info-cart__list-item");
    const cartRawData = localStorage.getItem("cart");
    let cadsStorageArray = JSON.parse(cartRawData) || [];

    for (let i = 0; i < cadsStorageArray.length; i++) {
        const cloneCard = cardTemplate.cloneNode(true);
        const productId = cadsStorageArray[i].productId;
        const innerTitle = cloneCard.querySelector(".info-cart__list-item-title");
        const innerPrice = cloneCard.querySelector(".info-cart__list-item-price");

        if (innerTitle && productsMap[productId].name) {
            innerTitle.textContent = productsMap[productId].name
        }
        if (innerPrice && productsMap[productId].price) {
            const totalProductPrice =productsMap[productId].price * cadsStorageArray[i].packCount;
            innerPrice.textContent = "$" + totalProductPrice.toFixed(2);
        }

        carsWrap.appendChild(cloneCard);
    }

}