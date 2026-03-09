import { burger } from "@/js/modules/burger.js";
import {initAccordionForm} from "@/js/modules/all-products/accordion-form.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";

document.addEventListener("DOMContentLoaded", async() => {

    burger();
    burgerAccordion();

    initAccordionForm();

    await Promise.all([
        loadProductsFirebase("card-1", "product-1"),
        loadProductsFirebase("card-2", "product-2"),
        loadProductsFirebase("card-3", "product-3"),
        loadProductsFirebase("card-4", "product-4"),
        loadProductsFirebase("card-5", "product-5"),
        loadProductsFirebase("card-6", "product-6"),
        loadProductsFirebase("card-7", "product-1"),
        loadProductsFirebase("card-8", "product-2"),
        loadProductsFirebase("card-9", "product-3"),
    ]);
});