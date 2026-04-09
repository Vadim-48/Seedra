import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
// import {initFilterDropdown} from "@/js/modules/all-products/filter-dropdown.js";
import {
    initMenuCategoryScroll,
    initCategoryDropdown,
} from "@/js/modules/menu-category.js";
import {initAccordionForm} from "@/js/modules/all-products/accordion-form.js";
import {
    loadProductCardsList,
    loadProductsFirebase
} from "@/js/modules/product-firebase.js";
import {initCardFilter} from "@/js/modules/all-products/card-filter.js";
import {initRangeSlider} from "@/js/modules/all-products/range-slider.js";
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
import {initSort} from "@/js/modules/innit-sort.js";

document.addEventListener("DOMContentLoaded", async () => {


    burger();
    burgerAccordion();
    initMenuCategoryScroll();
    // initFilterDropdown();
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
    ]);

    loadProductCardsList();

    await menuCategoryFilter();
    await initCardFilter();

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

    initRangeSlider();
    innitProductClick();
    initSort();
});
