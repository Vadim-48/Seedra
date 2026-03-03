import { burger } from "@/js/modules/burger.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";
// import { initAsideSwiper } from "@/js/modules/swiper-one-news.js";
// import { loadProductsFirebase } from "@/js/modules/product-firebase.js";
// import { loadProductsFirebase } from "@/js/modules/product-firebase.js";

import { loadHeroProductsFirebase } from "@/js/modules/one-product/hero-firebase.js";
import { initProductSwiper } from "@/js/modules/one-product/hero-swiper.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {loadReviewFirebase} from "@/js/modules/reviews-firebase.js";
import {allReviewsImg, totalStars} from "@/js/modules/one-product/user-reviews-firebase.js";
import {initUserReviewsSwiper} from "@/js/modules/one-product/user-reviews-swiper.js";
import {initRelatedSwiper} from "@/js/modules/one-product/related-swiper.js";


document.addEventListener("DOMContentLoaded", async() => {

    burger();

    burgerAccordion();

    // await loadProductsFirebase("product_hero-card","product-5");
    await Promise.all([
        loadHeroProductsFirebase("product_hero-card","product-5"),

        loadReviewFirebase("card-review-1", "review-1"),
        loadReviewFirebase("card-review-2", "review-2"),

        totalStars("data-rating-all","allStars"),
        allReviewsImg("data-reviews-all-img","allReviews"),

        loadProductsFirebase("card-1", "product-1"),
        loadProductsFirebase("card-2", "product-2"),
        loadProductsFirebase("card-3", "product-3"),
        loadProductsFirebase("card-4", "product-4"),
        loadProductsFirebase("card-5", "product-5"),
        loadProductsFirebase("card-6", "product-6"),
    ]);

    initProductSwiper();

    initUserReviewsSwiper();

    initRelatedSwiper();
});


document.querySelectorAll('.accordion__row').forEach((btn) => {
    btn.addEventListener('click', () => {
        // btn.parentElement.classList.toggle('active');
        btn.classList.toggle('active');
    });
})

// const accordionList = document.querySelectorAll(".faq__accordion-head");
//
// accordionList.forEach(item => {
//     item.addEventListener("click", function () {
//         const clickItem = this;
//         accordionList.forEach(element => {
//             if (element !== clickItem) {
//                 element.parentElement.classList.remove("active");
//             }
//         });
//         item.parentElement.classList.toggle("active");
//         let currentItem = item.parentElement.querySelector(".faq__accordion-body");
//         if (item.parentElement.classList.contains("active")) {
//             currentItem.style.maxHeight = currentItem.scrollHeight + "px";
//         } else {
//             currentItem.style.maxHeight = 0;
//         }
//     });
// });


