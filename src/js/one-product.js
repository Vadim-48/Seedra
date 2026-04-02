import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";

import {loadOneProductFirebase} from "@/js/modules/one-product/innit-one-product-firebase.js";
import {innitAmountPack} from "@/js/modules/one-product/amount-pack.js";
import {initHeroSwiper} from "@/js/modules/one-product/hero-swiper.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {initUserReviewsSwiper} from "@/js/modules/one-product/user-reviews-swiper.js";
import {initRelatedSwiper} from "@/js/modules/one-product/related-swiper.js";
import {initVideoPlayers} from "@/js/modules/one-product/video-play.js";
import {initAccordion} from "@/js/modules/one-product/accordion.js";
import {initFormValidate} from "@/js/modules/one-product/validate.js";
import {addCartLocalStorage} from "@/js/modules/add-cart-local-storage.js";
import {
    addFavoriteLocalStorage
} from "@/js/modules/add-fovorite-local-storage.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    await Promise.all([
        loadOneProductFirebase("card-hero", "product-5"),
        loadProductsFirebase("card-1", "product-1"),
        loadProductsFirebase("card-2", "product-2"),
        loadProductsFirebase("card-3", "product-3"),
        loadProductsFirebase("card-4", "product-4"),
        loadProductsFirebase("card-5", "product-5"),
        loadProductsFirebase("card-6", "product-6"),
    ]);


    innitAmountPack();

    initHeroSwiper();

    initUserReviewsSwiper();

    initRelatedSwiper();

    initVideoPlayers();

    initAccordion();

    initFormValidate();

    addCartLocalStorage();
    addFavoriteLocalStorage();

    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
            updateCartIcon();
        }
        if (event.key === 'favorite') {
            updateFavoriteIcon();
        }
    });
});






