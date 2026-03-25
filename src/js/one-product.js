import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";

import {loadHeroProductsFirebase} from "@/js/modules/one-product/hero-firebase.js";
import {innitAmount} from "@/js/modules/amount-count.js";
import {initHeroSwiper} from "@/js/modules/one-product/hero-swiper.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {loadReviewFirebase} from "@/js/modules/reviews-firebase.js";
import {allReviewsImg, totalStars} from "@/js/modules/one-product/user-reviews-firebase.js";
import {initUserReviewsSwiper} from "@/js/modules/one-product/user-reviews-swiper.js";
import {initRelatedSwiper} from "@/js/modules/one-product/related-swiper.js";
import {initVideoPlayers} from "@/js/modules/one-product/video-play.js";
import {initAccordion} from "@/js/modules/one-product/accordion.js";
import {initFormValidate} from "@/js/modules/one-product/validate.js";


document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    await Promise.all([
        loadHeroProductsFirebase("product_hero-card", "product-5"),

        loadReviewFirebase("card-review-1", "review-1"),
        loadReviewFirebase("card-review-2", "review-2"),
        loadReviewFirebase("card-review-3", "review-3"),

        totalStars("data-rating-all", "allStars"),
        allReviewsImg("data-reviews-all-img", "allReviews"),

        loadProductsFirebase("card-1", "product-1"),
        loadProductsFirebase("card-2", "product-2"),
        loadProductsFirebase("card-3", "product-3"),
        loadProductsFirebase("card-4", "product-4"),
        loadProductsFirebase("card-5", "product-5"),
        loadProductsFirebase("card-6", "product-6"),
    ]);

    innitAmount();

    initHeroSwiper();

    initUserReviewsSwiper();

    initRelatedSwiper();

    initVideoPlayers();

    initAccordion();

    initFormValidate();
});




