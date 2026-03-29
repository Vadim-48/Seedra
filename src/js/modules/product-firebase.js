import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

export async function loadProductsFirebase(dataCard, productId) {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })
    const cardList = document.querySelector(`[data-product-id="${dataCard}"]`);
    cardList.dataset.productFirebase = productId;
    const product = productsMap[productId];

    const innerNumberReviews = cardList.querySelector('[data-product-reviews]');
    const innerTitle = cardList.querySelector('[data-product-name]');
    const innerPrice = cardList.querySelector('[data-product-price]');
    const innerOldPrice = cardList.querySelector('[data-product-old-price]');
    const innerFirePrice = cardList.querySelector('[data-product-fire-price]');
    const innerPhoto = cardList.querySelector('[data-product-photo]');
    const innerHeroPhoto = cardList.querySelector('[data-product-hero-photo]');

    if (product.reviewsNumber != null && innerNumberReviews != null) innerNumberReviews.textContent = "(" + product.reviewsNumber + ")";
    if (product.name && innerTitle) innerTitle.textContent = product.name;
    if (product.price != null && innerPrice != null) innerPrice.textContent = "$" + Number(product.price).toFixed(2);
    if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = "$" + Number(product.oldPrice).toFixed(2);
    // if (product.photo && innerPhoto) innerPhoto.src = product.photo;
    if (product.photo && innerPhoto) innerPhoto.src = product.photo;
    if (product.heroPhoto && innerHeroPhoto) innerHeroPhoto.src = product.heroPhoto;

    const stars = cardList.querySelectorAll('[data-rating] svg use');
    const rating = product.star || 0;

    stars.forEach((star, index) => {
        if (rating >= index + 1) {
            star.setAttribute('href', './sprite.svg#icon-star');
        } else if (rating > index && rating < index + 1) {
            star.setAttribute('href', './sprite.svg#icon-star-half');
        }
    });
}