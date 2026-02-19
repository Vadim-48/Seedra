import { burger } from "./js/modules/burger.js";
import { burgerAccordion } from "./js/modules/burger-accordion.js";

import { loadProductsFirebase } from "./js/modules/product-firebase.js";
import { loadReviewFirebase } from "./js/modules/reviews-firebase.js";

import { initSwipers } from "./js/modules/swiper.js";
import { initFeedbackSwiper } from "./js/modules/swiper-feedback.js";

document.addEventListener("DOMContentLoaded", async() => {
    burger();
    burgerAccordion();

    await Promise.all([
        loadProductsFirebase("product_hero", "main"),
        loadProductsFirebase("card-1", "product-1"),
        loadProductsFirebase("card-2", "product-2"),
        loadProductsFirebase("card-3", "product-3"),
        loadProductsFirebase("card-4", "product-4"),
        loadProductsFirebase("card-5", "product-5"),
        loadProductsFirebase("card-6", "product-6"),

        loadReviewFirebase("card-review-1", "review-1"),
        loadReviewFirebase("card-review-2", "review-2"),
        loadReviewFirebase("card-review-3", "review-3"),
        loadReviewFirebase("card-review-4", "review-1"),
        loadReviewFirebase("card-review-5", "review-2"),
    ]);

    initSwipers();
    initFeedbackSwiper();
});


// ---------------cards-firebase-----------------
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/firebase/firebase.js";

// const productsSnapshot = await getDocs(collection(db, "products"));
// const productsMap = {};
// productsSnapshot.forEach((doc) => {
//     productsMap[doc.id] = doc.data();
// })
//
// // const mainProduct = productsMap["main"];
// // console.log("main", mainProduct);
//
//
// const loadCard = (idCard,idProduct) => {
//     const cardList = document.querySelector(`[data-product-id="${idCard}"]`);
//     // console.log("cardList: ", cardList);
//     const product = productsMap[idProduct];
//     console.log("productsMap: ",product);
//
//     const innerNumberReviews = cardList.querySelector('[data-product-id="product_number-reviews"]');
//     const innerTitle = cardList.querySelector('[data-product-id="product_title"]');
//     const innerPhoto = cardList.querySelector('[data-product-id="product_photo"]');
//     const innerPrice = cardList.querySelector('[data-product-id="product_price"]');
//     const innerOldPrice = cardList.querySelector('[data-product-id="product_old-price"]');
//     const innerFirePrice = cardList.querySelector(".fire-price");
//
//     if (product.reviewsNumber != null && innerNumberReviews != null) innerNumberReviews.textContent = "(" + product.reviewsNumber + ")";
//     if (product.name && innerTitle) innerTitle.textContent = product.name;
//     if (product.price != null && innerPrice != null) innerPrice.textContent = product.price;
//     if (product.photo && innerPhoto) innerPhoto.src = product.photo;
//     if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
//     if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = product.oldPrice;
// }

// loadCard("product_hero","main");
// loadCard("card-1","product-1");
// loadCard("card-2","product-2");
// loadCard("card-3","product-3");
// loadCard("card-4","product-4");
// loadCard("card-5","product-5");
// loadCard("card-6","product-6");

// const reviewsSnapshot = await getDocs(collection(db, "reviews"));
// const reviewsMap = {};
// reviewsSnapshot.forEach((doc) => {
//     reviewsMap[doc.id] = doc.data();
// })
//
// const loadReviews = (idCard,idProduct) => {
//     const reviewsList = document.querySelector(`[data-review-id="${idCard}"]`);
//     // console.log("cardList: ", cardList);
//     const reviewsItem = reviewsMap[idProduct];
//     console.log("reviewsMap: ", reviewsItem);
//
//     const innerDate = reviewsList.querySelector(".card-review__date");
//     const innerName = reviewsList.querySelector(".card-review__name");
//     const innerPhoto = reviewsList.querySelector(".card-review__photo img");
//     const innerText = reviewsList.querySelector(".card-review__text");
//
//     if (reviewsItem.date) innerDate.textContent = reviewsItem.date;
//     if (reviewsItem.name) innerName.textContent = reviewsItem.name;
//     if (reviewsItem.photo) innerPhoto.src = reviewsItem.photo;
//     if (reviewsItem.text) innerText.textContent = reviewsItem.text;
// }
//
// loadReviews("card-review-1","review-1");
// loadReviews("card-review-2","review-2");
// loadReviews("card-review-3","review-3");
// loadReviews("card-review-4","review-1");
// loadReviews("card-review-5","review-2");

// await Promise.all([
//     loadProductsFirebase("card-1", "product-1"),
//     loadProductsFirebase("card-2", "product-2"),
//     loadProductsFirebase("card-3", "product-3"),
// ]);