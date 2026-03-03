import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";

export async function loadHeroProductsFirebase(dataCard, productId) {
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
        const innerPrice = cardList.querySelector('[data-product-price]');
        const innerOldPrice = cardList.querySelector('[data-product-old-price]');
        const innerFirePrice = cardList.querySelector('[data-product-fire-price]');

        const innerPhoto = cardList.querySelectorAll('[data-product-photo-main]');
        const innerPhotoOne = cardList.querySelectorAll('[data-product-photo-1]');
        const innerPhotoTwo = cardList.querySelectorAll('[data-product-photo-2]');
        const innerPhotoTree = cardList.querySelectorAll('[data-product-photo-3]');
        const innerPhotoFour = cardList.querySelectorAll('[data-product-photo-4]');
        const innerPhotoFive = cardList.querySelectorAll('[data-product-photo-5]');

        if (product.reviewsNumber != null && innerNumberReviews != null) innerNumberReviews.textContent = "(" + product.reviewsNumber + ")";
        if (product.name && innerTitle) innerTitle.textContent = product.name;
        if (product.price != null && innerPrice != null) innerPrice.textContent = "$" + product.price;
        if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
        if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = "$" +  product.oldPrice;

        if (product.photo && innerPhoto) (innerPhoto.forEach(item => {
            item.src = product.photo;
        }))
        if (product.thumbOne && innerPhotoOne) (innerPhotoOne.forEach(item => {
            item.src = product.thumbOne;
        }))
        if (product.thumbTwo && innerPhotoTwo) (innerPhotoTwo.forEach(item => {
            item.src = product.thumbTwo;
        }))
        if (product.thumbTree && innerPhotoTree) (innerPhotoTree.forEach(item => {
            item.src = product.thumbTree;
        }))
        if (product.thumbFour && innerPhotoFour) (innerPhotoFour.forEach(item => {
            item.src = product.thumbFour;
        }))
        if (product.thumbFive && innerPhotoFive) (innerPhotoFive.forEach(item => {
            item.src = product.thumbFive;
        }))

    }

    loadCard();


}