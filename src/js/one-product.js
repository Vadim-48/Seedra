import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";

import {
    loadOneProductFirebase
} from "@/js/modules/one-product/innit-one-product-firebase.js";
import {innitAmountPack} from "@/js/modules/one-product/amount-pack.js";
import {initHeroSwiper} from "@/js/modules/one-product/hero-swiper.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {
    initUserReviewsSwiper
} from "@/js/modules/one-product/user-reviews-swiper.js";
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
import {innitProductClick} from "@/js/modules/product-click.js";
import {
    innitBreadcrumbClick
} from "@/js/modules/one-product/breadcrumb-click.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    innitBreadcrumbClick();

    const productsToLoad = [
        {path: "product-1"},
        {path: "product-2"},
        {path: "product-3"},
        {path: "product-4"},
        {path: "product-5"},
        {path: "product-6"},
    ];
    await Promise.all([
        loadOneProductFirebase(),

        ...productsToLoad.map(p => loadProductsFirebase(p.path)),
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

// let cadsFavoriteData = [];
// localStorage.setItem('cart', JSON.stringify(cadsFavoriteData));





