import {
    average,
    collection,
    getAggregateFromServer,
    getDocs, count,
} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";
import {formatMoney} from "@/js/modules/format-money.js";

let productsMap = null;
async function getProducts() {
    if (productsMap) return productsMap;

    const productsSnapshot = await getDocs(collection(db, "products"));
    productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    });
    return productsMap;
}


export async function loadProductsFirebase(productId) {

    const dataMap = await getProducts();
    const product = dataMap[productId];
    const subCollectionProducts = collection(db, "products", productId, "reviews");

    const productCardsWrap = document.querySelector("[data-product-cards-wrap]");
    const templateWrap = document.getElementById("product-template");
    if (!templateWrap) {
        return
    }
    const fragment = templateWrap.content.cloneNode(true);
    const cloneProductCard = fragment.querySelector('.card');
    cloneProductCard.dataset.productId = productId;


    const innerNumberReviews = cloneProductCard.querySelector('[data-product-reviews]');
    const innerTitle = cloneProductCard.querySelector('[data-product-name]');
    const innerPrice = cloneProductCard.querySelector('[data-product-price]');
    const innerOldPrice = cloneProductCard.querySelector('[data-product-old-price]');
    const innerFirePrice = cloneProductCard.querySelector('[data-product-fire-price]');
    const innerPhoto = cloneProductCard.querySelector('[data-product-photo]');
    const innerHeroPhoto = cloneProductCard.querySelector('[data-product-hero-photo]');

    if (product.name && innerTitle) innerTitle.textContent = product.name;
    if (product.price != null && innerPrice != null) innerPrice.textContent = formatMoney(product.price);
    if (product.firePrice && innerFirePrice) innerFirePrice.classList.add("is-visible");
    if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = formatMoney(product.oldPrice);
    if (product.photo && innerPhoto) innerPhoto.src = product.photo;
    if (product.heroPhoto && innerHeroPhoto) innerHeroPhoto.src = product.heroPhoto;

    const stars = cloneProductCard.querySelectorAll('[data-rating] svg use');

    const snapshotReviews = await getAggregateFromServer(subCollectionProducts, {
        averageStars: average('star'),
        totalReviews: count(),
    });

    if (snapshotReviews.data().totalReviews != null && innerNumberReviews != null) innerNumberReviews.textContent = "(" + snapshotReviews.data().totalReviews + ")";
    const rating = (snapshotReviews.data().averageStars).toFixed(1);

    stars.forEach((star, index) => {
        if (rating >= index + 1) {
            star.setAttribute('href', './sprite.svg#icon-star');
        } else if (rating > index && rating < index + 1) {
            star.setAttribute('href', './sprite.svg#icon-star-half');
        }
    });
    productCardsWrap.appendChild(cloneProductCard);
}