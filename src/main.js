import { burger } from "./js/modules/burger.js";
import { burgerAccordion } from "./js/modules/burger-accordion.js";

import { loadProductsFirebase } from "./js/modules/product-firebase.js";
import { loadReviewFirebase } from "./js/modules/reviews-firebase.js";

import { initProductsPrevSwiper } from "./js/modules/main/product-prev-swiper.js";
import { initBlogPreviewSwiper } from "./js/modules/main/blog-prev-swiper.js";
import { initFeedbackSwiper } from "./js/modules/main/feedback-swiper.js";

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


    initProductsPrevSwiper();
    initBlogPreviewSwiper();
    initFeedbackSwiper();
});