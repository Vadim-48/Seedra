import {db} from "@/firebase/firebase.js";
import {where, query, collection, getDocs} from "firebase/firestore";
import {
    destroyAll,
    initProductsSwiper
} from "@/js/pages/main/product-prev-swiper.js";
import {
    loadProductCardsList
} from "@/js/modules/product-firebase.js";


export async function menuCategoryFilter() {
    const paramsOriginUrl = new  URLSearchParams(window.location.search);
    const cardsWrapper = document.querySelector("[data-product-cards-wrap]");
    if (paramsOriginUrl.has('_chosenType')){cardsWrapper.innerHTML = "";}

    const menuDropdownWrap = document.querySelector(".category__dropdown-list");
    if (!cardsWrapper || !menuDropdownWrap) return;

    const collectionProducts = collection(db, "products");
    const originalList = loadProductCardsList();

    // cardsWrapper.appendChild(originalList);

    const isSwiperPage = !!document.querySelector('.products-prev__swiper');
    const refreshSwiperIfNeeded = () => {
        if (isSwiperPage && window.innerWidth <= 576) {
            destroyAll();
            initProductsSwiper();
        }
    };
    let isProcessing = false;

    const runFilter = async (filterData) => {
        if (!filterData || isProcessing) return;
        isProcessing = true;

        if (isSwiperPage) destroyAll();
        if (!filterData) return;
        cardsWrapper.innerHTML = "";
        try {
            const querySnapshot = await getDocs(filterData);
            const filtProductList = new Set(querySnapshot.docs.map(doc => doc.id));
            // if (isSwiperPage) destroyAll();
            // cardsWrapper.innerHTML = "";
            const fragment = document.createDocumentFragment();
            originalList.forEach(card => {
                if (filtProductList.has(card.dataset.productId)) {
                    // cardsWrapper.appendChild(card);
                    fragment.appendChild(card);
                }
            });
            cardsWrapper.appendChild(fragment);

            refreshSwiperIfNeeded(); //
        } catch (error) {
        } finally {
            isProcessing = false;
        }
    }

    let chosenCategory = null;
    let chosenType = null;
    // const originUrl = window.location.href;
    // const paramsOriginUrl = new  URLSearchParams(window.location.search);

    if (paramsOriginUrl.has('_chosenType')) { chosenType = paramsOriginUrl.get('_chosenType');}
    if (paramsOriginUrl.has('_chosenCategory')) { chosenCategory = paramsOriginUrl.get('_chosenCategory');}

    menuDropdownWrap.addEventListener("click", async (e) => {
        const itemBtn = e.target.closest("[data-type-filter]");
        const categoryBtn = e.target.closest("[data-category-filter]");
        if (!itemBtn && !categoryBtn || isProcessing) return;

        // document.querySelectorAll('.swiper-slide-duplicate').forEach(clone => clone.remove());

        if (categoryBtn && categoryBtn.dataset.categoryFilter === "all") {
            if (isSwiperPage) destroyAll();
            cardsWrapper.innerHTML = "";
            originalList.forEach(card => {
                cardsWrapper.appendChild(card);
            })
            refreshSwiperIfNeeded();
            return;
        }
        let filterData = null;
        if (itemBtn) {
            let chosenType = itemBtn.dataset.typeFilter;
            // let chosenElementField = itemBtn.dataset.itemField;itemValue
            // filterData = query(collectionProducts, where(chosenCategoryValue, "==", chosenElementField));
            filterData = query(collectionProducts, where("type", "==", chosenType));
            // console.log("chosenElementField",chosenType)
        }
        if (categoryBtn && categoryBtn.dataset.categoryFilter !== "all") {
            let chosenCategory = categoryBtn.dataset.categoryFilter;
            filterData = query(collectionProducts, where("category", "==", chosenCategory));
        }
        await runFilter(filterData);
    })

    if (chosenType) {
        const initialQuery = query(collectionProducts, where("type", "==", chosenType));
        await runFilter(initialQuery);
        return;
    } else if (chosenCategory) {
        const initialQuery = query(collectionProducts, where("category", "==", chosenCategory));
        await runFilter(initialQuery);
        return;
    }
}