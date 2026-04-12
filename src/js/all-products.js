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
import {innitSearchTitle} from "@/js/modules/search-title.js";

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelectorAll('[data-disabled]');
    form.forEach((item) => {
        item.style.pointerEvents = 'none';
        item.style.opacity = '0.5';
    })

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

    initRangeSlider();
    innitProductClick();
    initSort();
    await menuCategoryFilter();
    await initCardFilter();
    addCartLocalStorage();
    addFavoriteLocalStorage();
    innitSearchTitle();

    form.forEach((item) => {
        item.style.pointerEvents = 'auto';
        item.style.opacity = '1';
    })


    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
            updateCartIcon();
        }
        if (event.key === 'favorite') {
            updateFavoriteIcon();
        }
    });
});

const openFilterBtn = document.querySelector('.toolbar__filter-btn');
const filterDropdown = document.querySelector('[data-cards-filer]');
openFilterBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    openFilterBtn.classList.toggle('open');
    filterDropdown.classList.toggle('open');
})

document.addEventListener("click",(e) => {
    const isClickInside = filterDropdown.contains(e.target);
    const isClickOnBtn = openFilterBtn.contains(e.target);

    if (!isClickInside && !isClickOnBtn) {
        openFilterBtn.classList.remove('open');
        filterDropdown.classList.remove('open');
    }
})

window.addEventListener("resize", () => {
    openFilterBtn.classList.remove('open');
    filterDropdown.classList.remove('open');
})

//----------------------
