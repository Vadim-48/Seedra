import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";

export async function loadProductsFirebase(dataCard, productId) {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })

    const loadCard = () => {
        const cardList = document.querySelector(`[data-product-id="${dataCard}"]`);
        const product = productsMap[productId];
        // console.log("Product: ", product);

        const innerNumberReviews = cardList.querySelector('[data-product-reviews]');
        const innerTitle = cardList.querySelector('[data-product-name]');
        const innerPhoto = cardList.querySelector('[data-product-photo]');
        const innerPrice = cardList.querySelector('[data-product-price]');
        const innerOldPrice = cardList.querySelector('[data-product-old-price]');
        const innerFirePrice = cardList.querySelector('[data-product-fire-price]');

        if (product.reviewsNumber != null && innerNumberReviews != null) innerNumberReviews.textContent = "(" + product.reviewsNumber + ")";
        if (product.name && innerTitle) innerTitle.textContent = product.name;
        if (product.price != null && innerPrice != null) innerPrice.textContent = "$" + product.price;
        if (product.photo && innerPhoto) innerPhoto.src = product.photo;
        if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
        if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = "$" +  product.oldPrice;
    }

    loadCard();
}