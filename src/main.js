import { app } from './firebase/firebase.js';
import { loadHeroProduct } from "./js/modules/hero.js";
// import { loadCardsProduct } from "./js/modules/cards-firebase.js";

import { burger } from "./js/modules/burger.js";
import { burgerAccordion } from "./js/modules/burger-accordion.js";
import { initSwipers } from "./js/modules/swiper.js";
import {  initFeedbackSwiper } from "./js/modules/swiper-feedback.js";

console.log('Firebase ready', app);

document.addEventListener("DOMContentLoaded", async() => {
    await loadHeroProduct();
    // await loadCardsProduct();

    initSwipers();
    initFeedbackSwiper();

    burger();

    burgerAccordion();
});


// ---------------cards-firebase-----------------
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";

const productsSnapshot = await getDocs(collection(db, "products"));
const productsMap = {};
productsSnapshot.forEach((doc) => {
    productsMap[doc.id] = doc.data();
})

// const mainProduct = productsMap["main"];
// console.log("main", mainProduct);


const loadCard = (idCard,idProduct) =>{
    const cardList = document.querySelector(`[data-card-id="${idCard}"]`);
    // console.log("cardList: ", cardList);
    const product = productsMap[idProduct];
    console.log("productsMap: ",product);

    const innerNumberReviews = cardList.querySelector(".card__rating-comments");
    const innerTitle = cardList.querySelector(".card__title");
    const innerPhoto = cardList.querySelector(".card__photo img");
    const innerPrice = cardList.querySelector(".card__price");
    const innerOldPrice = cardList.querySelector(".card__old-price");
    const innerFirePrice = cardList.querySelector(".card__fire-price");

    if (product.reviewsNumber != null) innerNumberReviews.textContent = "(" + product.reviewsNumber + ")";
    if (product.name) innerTitle.textContent = product.name;
    if (product.price != null) innerPrice.textContent = product.price;
    if (product.photo) innerPhoto.src = product.photo;
    if (product.firePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice != null) innerOldPrice.textContent = product.oldPrice;
}


loadCard("card-1","product-1");
loadCard("card-2","product-2");
loadCard("card-3","product-3");
loadCard("card-4","product-4");
loadCard("card-5","product-5");
loadCard("card-6","product-6");

const reviewsSnapshot = await getDocs(collection(db, "reviews"));
const reviewsMap = {};
reviewsSnapshot.forEach((doc) => {
    reviewsMap[doc.id] = doc.data();
})

const loadReviews = (idCard,idProduct) => {
    const reviewsList = document.querySelector(`[data-card-id="${idCard}"]`);
    // console.log("cardList: ", cardList);
    const reviewsItem = reviewsMap[idProduct];
    console.log("reviewsMap: ", reviewsItem);

    const innerDate = reviewsList.querySelector(".card-review__date");
    const innerName = reviewsList.querySelector(".card-review__name");
    const innerPhoto = reviewsList.querySelector(".card-review__photo img");
    const innerText = reviewsList.querySelector(".card-review__text");

    if (reviewsItem.date) innerDate.textContent = reviewsItem.date;
    if (reviewsItem.name) innerName.textContent = reviewsItem.name;
    if (reviewsItem.photo) innerPhoto.src = reviewsItem.photo;
    if (reviewsItem.text) innerText.textContent = reviewsItem.text;
}

loadReviews("card-review-1","review-1");
loadReviews("card-review-2","review-2");
loadReviews("card-review-3","review-3");
loadReviews("card-review-4","review-1");
loadReviews("card-review-5","review-2");