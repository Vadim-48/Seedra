import {collection, getDocs} from "firebase/firestore";
import {query, where, and, or} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";
import {loadProductCardsList} from "@/js/modules/product-firebase.js";




export async function initCardFilter() {
    const inputFilterFormWrap = document.querySelectorAll("[data-cards-filer]");
    const cardsWrap = document.querySelector("[data-cards-wrap]");
    const cardsList = cardsWrap.querySelectorAll('[data-product-id]');
    const saveCardsList = loadProductCardsList();
    const collectionProducts = collection(db, "products");

    inputFilterFormWrap.forEach((form) => {
        const priceSlider = form.querySelector(".filter-form__price-slider");
        priceSlider.noUiSlider.on('change', async function (){
            await filterFunction();
        })

        form.addEventListener("change", async (e) => {
            await filterFunction();
        })

        async function filterFunction() {
            cardsWrap.innerHTML = '';

            const seedTypeCheck = Array.from(form.querySelectorAll("input[name='seedType']:checked")).map(el => el.value);
            const featureTypeCheck = Array.from(form.querySelectorAll("input[name='featureType']:checked")).map(el => el.value);
            const growingTypeCheck = Array.from(form.querySelectorAll("input[name='growingType']:checked")).map(el => el.value);
            const useTypeCheck = Array.from(form.querySelectorAll("input[name='useType']:checked")).map(el => el.value);
            const characteristicTypeCheck = Array.from(form.querySelectorAll("input[name='characteristicType']:checked")).map(el => el.value);
            const minPrice = Number(form.querySelector('input[data-price-min]').value);
            const maxPrice = Number(form.querySelector('input[data-price-max]').value);

            let seedFilter = collectionProducts;
            let featureFilter = collectionProducts;
            let growingFilter = collectionProducts;
            let useFilter = collectionProducts;
            let characteristicFilter = collectionProducts;
            let priceFilter = collectionProducts;

            if (seedTypeCheck.length > 0) seedFilter = query(collectionProducts, where('seedType', 'in', seedTypeCheck));
            if (featureTypeCheck.length > 0) featureFilter = query(collectionProducts, where('featureType', 'in', featureTypeCheck));
            if (growingTypeCheck.length > 0) growingFilter = query(collectionProducts, where('growingType', 'in', growingTypeCheck));
            if (useTypeCheck.length > 0) useFilter = query(collectionProducts, where('useType', 'in', useTypeCheck));
            if (characteristicTypeCheck.length > 0) characteristicFilter = query(collectionProducts, where('characteristicType', 'in', characteristicTypeCheck));
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                priceFilter = query(collectionProducts,
                    where('price', '>=', minPrice),
                    where('price', '<=', maxPrice),
                );
            }

            const [seedRes, featureRes, growingRes, useRes, charRes, priceRes] = await Promise.all([
                getDocs(seedFilter),
                getDocs(featureFilter),
                getDocs(growingFilter),
                getDocs(useFilter),
                getDocs(characteristicFilter),
                getDocs(priceFilter),
            ]);

            const seedArr = seedRes.docs.map(doc => (doc.id));
            const featureArr = featureRes.docs.map(doc => (doc.id));
            const growingArr = growingRes.docs.map(doc => (doc.id));
            const useArr = useRes.docs.map(doc => (doc.id));
            const charArr = charRes.docs.map(doc => (doc.id));
            const priceArr = priceRes.docs.map(doc => (doc.id));
            const typeArray = [seedArr, featureArr, growingArr, useArr, charArr, priceArr];

            const resultFilter = typeArray.reduce((acc, current) => {
                const currentSet = new Set(current);
                return acc.filter(item => currentSet.has(item));
            });
            saveCardsList.forEach(card => {
                if (resultFilter.includes(card.dataset.productId)) {
                    cardsWrap.appendChild(card);
                }
            });
        }
    })
}
