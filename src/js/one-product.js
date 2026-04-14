import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";

import {
    loadOneProductFirebase
} from "@/js/pages/one-product/innit-one-product-firebase.js";
import {innitAmountPack} from "@/js/pages/one-product/amount-pack.js";
import {initHeroSwiper} from "@/js/pages/one-product/hero-swiper.js";
import {loadProductCardsList,loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {
    initUserReviewsSwiper
} from "@/js/pages/one-product/user-reviews-swiper.js";
import {initRelatedSwiper} from "@/js/pages/one-product/related-swiper.js";
import {initVideoPlayers} from "@/js/pages/one-product/video-play.js";
import {initAccordion} from "@/js/pages/one-product/accordion.js";
import {initFormValidate} from "@/js/pages/one-product/validate.js";
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
} from "@/js/pages/one-product/breadcrumb-click.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";
import {innitFancybox} from "@/js/modules/fancybox.js";

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
        innitGlobalSearch(),

        ...productsToLoad.map(p => loadProductsFirebase(p.path)),
    ]);

    loadProductCardsList();
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

    innitFancybox();

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





