import { burger } from "./js/modules/burger.js";
import { burgerAccordion } from "./js/modules/burger-accordion.js";
import {
    initMenuCategoryScroll,
    initCategoryDropdown,
} from "@/js/modules/menu-category.js";

import { loadProductsFirebase } from "./js/modules/product-firebase.js";
import { loadReviewFirebase } from "./js/modules/reviews-firebase.js";

import { initProductsPrevSwiper } from "./js/modules/main/product-prev-swiper.js";
import { initBlogPreviewSwiper } from "./js/modules/main/blog-prev-swiper.js";
import { initFeedbackSwiper } from "./js/modules/main/feedback-swiper.js";
import {addLocalStorage} from "@/js/modules/add-local-storage.js";

import { doc, setDoc } from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

document.addEventListener("DOMContentLoaded", async() => {

    const addNewProductOnce = async () => {
        try {
            const newDocRef = doc(db, "products", "product-9");

            await setDoc(newDocRef, {
                characteristicType: "two",
                featureType: "two",
                growingType: "slow",
                name: "SEEDRA Spinach Seeds - Bodacious Hybrid Seeds",
                photo: "https://res.cloudinary.com/dbhob7o7b/image/upload/v1773269969/product-3_hdg5n8.webp",
                price: 59.5,
                reviewsNumber: 103,
                seedType: "pollinated",
                star: 3.8,
                useType: "warm",
            });

        } catch (error) {
        }
    };

    // await addNewProductOnce(); // add to firebase



    burger();
    burgerAccordion();
    initMenuCategoryScroll();
    initCategoryDropdown();

    const productsToLoad = [
        { id: "card-hero", path: "product-1" },
        { id: "card-1", path: "product-1" },
        { id: "card-2", path: "product-2" },
        { id: "card-3", path: "product-3" },
        { id: "card-4", path: "product-4" },
        { id: "card-5", path: "product-5" },
        { id: "card-6", path: "product-6" },
    ];

    const reviewsToLoad = [
        { id: "card-review-1", path: "review-1" },
        { id: "card-review-2", path: "review-2" },
        { id: "card-review-3", path: "review-3" },
        { id: "card-review-4", path: "review-1" },
        { id: "card-review-5", path: "review-2" },
    ];


    await Promise.all([
        ...productsToLoad.map(p => loadProductsFirebase(p.id, p.path)),
        ...reviewsToLoad.map(r => loadReviewFirebase(r.id, r.path)),
    ]);
    addLocalStorage();


    initProductsPrevSwiper();
    initBlogPreviewSwiper();
    initFeedbackSwiper();

});

