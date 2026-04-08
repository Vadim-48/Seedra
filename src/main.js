import {burger} from "./js/modules/burger.js";
import {burgerAccordion} from "./js/modules/burger-accordion.js";
import {
    initMenuCategoryScroll,
    initCategoryDropdown,
} from "@/js/modules/menu-category.js";

import {loadProductsFirebase} from "./js/modules/product-firebase.js";
import {loadReviewFirebase} from "./js/modules/reviews-firebase.js";

import {initProductsPrevSwiper} from "./js/modules/main/product-prev-swiper.js";
import {initBlogPreviewSwiper} from "./js/modules/main/blog-prev-swiper.js";
import {
    initFeedbackSwiper,
    feedbackSwiper
} from "./js/modules/main/feedback-swiper.js";
import {addCartLocalStorage} from "@/js/modules/add-cart-local-storage.js";
import {
    addFavoriteLocalStorage
} from "@/js/modules/add-fovorite-local-storage.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {menuCategoryFilter} from "@/js/modules/menu-category-filter.js";
import {loadHeroFirebase} from "@/js/modules/main/load-hero-firebase.js";
import {innitProductClick} from "@/js/modules/product-click.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initMenuCategoryScroll();
    initCategoryDropdown();

    const productsToLoad = [
        {path: "product-1"},
        {path: "product-2"},
        {path: "product-3"},
        {path: "product-4"},
        {path: "product-5"},
        {path: "product-6"},
    ];

    const reviewsToLoad = [
        {path: "review-1"},
        {path: "review-2"},
        {path: "review-3"},
        {path: "review-1"},
        {path: "review-2"},
    ];


    await Promise.all([
        loadHeroFirebase("product-1"),
        ...productsToLoad.map(p => loadProductsFirebase(p.path)),
        ...reviewsToLoad.map(r => loadReviewFirebase(r.path)),
    ]);
    await menuCategoryFilter();

    addCartLocalStorage();
    addFavoriteLocalStorage();
    initProductsPrevSwiper();
    initBlogPreviewSwiper();

    initFeedbackSwiper();
    innitProductClick();

    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
            updateCartIcon();
        }
        if (event.key === 'favorite') {
            updateFavoriteIcon();
        }
    });
});

