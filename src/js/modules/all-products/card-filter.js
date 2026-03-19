import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export async function initCardFilter() {

    const productsSnapshot = await getDocs(collection(db, "products"));
    const productDataList = {};
    productsSnapshot.forEach((doc) => {
        const data = doc.data();
        productDataList[doc.id] = {
            seedType: data.seedType,
            featureType: data.featureType,
            growingType: data.growingType,
            characteristicType: data.characteristicType,
            useType: data.useType,
            price: data.price,
        };
    })
    delete productDataList.main;

    const formInputListEl = document.querySelectorAll("input");
    const cardListEl = document.querySelectorAll('[data-product-id]');

    formInputListEl.forEach(input => {
        input.addEventListener("input", debounce(() => {
            const inputCheckedListEl = [...formInputListEl]
                .filter(el => el.checked)
            // .map(el => el.value && el.name)
            const inputPriceListEl = [...formInputListEl]
                .filter(el => el.type === "number")
                .map(el => el.value);
            const priceMin = Number(inputPriceListEl[0]) || 0;
            const priceMax = Number(inputPriceListEl[1]) || Infinity;

            const inputSeedList = inputCheckedListEl.filter(el => el.name == "seedType")
                .map(el => el.value);
            const inputFeaturedList = inputCheckedListEl.filter(el => el.name == "featureType")
                .map(el => el.value);
            const inputGrowingList = inputCheckedListEl.filter(el => el.name == "growingType")
                .map(el => el.value);
            const inputUseList = inputCheckedListEl.filter(el => el.name == "useType")
                .map(el => el.value);
            const inputCharacteristicList = inputCheckedListEl.filter(el => el.name == "characteristicType")
                .map(el => el.value);

            cardListEl.forEach(card => {
                let key = card.dataset.productFaerbase;
                const product = productDataList[key];

                let foundSeedType = false;
                let foundFeaturedType = false;
                let foundGrowingType = false;
                let foundUseType = false;
                let foundCharacteristicType = false;
                let foundPrice = false;

                if (inputSeedList.includes(product.seedType)) {
                    foundSeedType = true;
                }
                if (inputFeaturedList.includes(product.featureType)) {
                    foundFeaturedType = true;
                }
                if (inputGrowingList.includes(product.growingType)) {
                    foundGrowingType = true;
                }
                if (inputUseList.includes(product.useType)) {
                    foundUseType = true;
                }
                if (inputCharacteristicList.includes(product.characteristicType)) {
                    foundCharacteristicType = true;
                }

                if (product.price >= priceMin && product.price <= priceMax) {
                    foundPrice = true;
                }

                if (card.dataset.productFaerbase === key) {
                    if ((foundSeedType || (inputSeedList.length == 0))
                        && (foundFeaturedType || (inputFeaturedList.length == 0))
                        && (foundGrowingType || (inputGrowingList.length == 0))
                        && (foundUseType || (inputUseList.length == 0))
                        && (foundCharacteristicType || (inputCharacteristicList.length == 0))
                        && (foundPrice == true)) {
                        card.style.display = "grid";
                    } else {
                        card.style.display = "none";
                    }
                }
            });

        }, 300));
    });
}