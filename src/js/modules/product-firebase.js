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
        cardList.dataset.productFaerbase = productId;
        const product = productsMap[productId];
        // console.log("Product: ", product);

        const innerNumberReviews = cardList.querySelector('[data-product-reviews]');
        const innerTitle = cardList.querySelector('[data-product-name]');
        const innerPrice = cardList.querySelector('[data-product-price]');
        const innerOldPrice = cardList.querySelector('[data-product-old-price]');
        const innerFirePrice = cardList.querySelector('[data-product-fire-price]');
        const innerPhoto = cardList.querySelector('[data-product-photo]');

        if (product.reviewsNumber != null && innerNumberReviews != null) innerNumberReviews.textContent = "(" + product.reviewsNumber + ")";
        if (product.name && innerTitle) innerTitle.textContent = product.name;
        if (product.price != null && innerPrice != null) innerPrice.textContent = "$" + product.price;
        if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
        if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = "$" +  product.oldPrice;
        if (product.photo && innerPhoto) innerPhoto.src = product.photo;

        const stars = cardList.querySelectorAll('[data-rating] svg use');
        const fullStar = Math.floor(product.star);
        const halfStar = product.star - fullStar;
        for (let i = 0; i < stars.length; i++) {
            if (fullStar > i) {
                stars[i].setAttribute('href', './sprite.svg#icon-star');
            } else {
                if (halfStar > 0) stars[i].setAttribute('href', './sprite.svg#icon-star-half');
                break;
            };
        };
    }

    loadCard();
}