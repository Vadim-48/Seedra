import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    initMenuCategoryScroll,
    initCategoryDropdown,
} from "@/js/modules/menu-category.js";
import {initAccordionForm} from "@/js/pages/all-products/accordion-form.js";
import {
    loadProductCardsList,
    loadProductsFirebase
} from "@/js/modules/product-firebase.js";
import {initCardFilter} from "@/js/pages/all-products/card-filter.js";
import {initRangeSlider} from "@/js/pages/all-products/range-slider.js";
import {addCartLocalStorage} from "@/js/modules/add-cart-local-storage.js";
import {
    addFavoriteLocalStorage
} from "@/js/modules/add-fovorite-local-storage.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {menuCategoryFilter} from "@/js/modules/menu-category-filter.js";
import {innitProductClick} from "@/js/modules/product-click.js";
// import {initSort} from "@/js/modules/innit-sort.js";
import {innitSearchTitle} from "@/js/modules/search-title.js";
import {innitToolbarDropdown} from "@/js/modules/toolbar-dropdown.js";
import {innitGlobalSearch} from "@/js/modules/global-search.js";
import {initSortCards} from "@/js/modules/innit-sort-cards.js";

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelectorAll('[data-disabled]');
    form.forEach((item) => {
        item.classList.add('is-disabled');
    })
    try {
        burger();
        burgerAccordion();
        initMenuCategoryScroll();
        initCategoryDropdown();
        initAccordionForm();

        const productsToLoad = [
            {path: "product-1"},
            {path: "product-2"},
            {path: "product-3"},
            {path: "product-4"},
            {path: "product-5"},
            {path: "product-6"},
            {path: "product-7"},
            {path: "product-8"},
            {path: "product-9"},
        ];

        await Promise.all([
            ...productsToLoad.map(p => loadProductsFirebase(p.path)),
            innitGlobalSearch(),
        ]);

        loadProductCardsList();

        initRangeSlider();
        innitProductClick();
        initSortCards();
        await menuCategoryFilter();
        await initCardFilter();
        addCartLocalStorage();
        addFavoriteLocalStorage();
        innitSearchTitle();
        innitToolbarDropdown();
    } catch (error) {
        console.error("App init error:", error);
    } finally {

        form.forEach((item) => {
            item.classList.remove('is-disabled');
        })
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
            updateCartIcon();
        }
        if (event.key === 'favorite') {
            updateFavoriteIcon();
        }
    });
});

