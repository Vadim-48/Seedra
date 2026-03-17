import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

function debounce(func, wait) {
    let timeout;
    return function(...args) {
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
        };
    })
    delete productDataList.main;
    console.log("productDataList", productDataList);


    const formInputListEl = document.querySelectorAll(".filter-form input");
    const cardListEl = document.querySelectorAll('[data-product-id]');
    console.log("formInputListEl", formInputListEl);
    console.log("cardListEl", cardListEl);

    formInputListEl.forEach(input => {
        input.addEventListener("change", debounce(() => {
            const inputCheckedListEl = [...formInputListEl]
                .filter(el => el.checked)
            // .map(el => el.value && el.name)

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

                if (card.dataset.productFaerbase === key) {
                    if ((foundSeedType || (inputSeedList.length == 0))
                        && (foundFeaturedType || (inputFeaturedList.length == 0))
                        && (foundGrowingType || (inputGrowingList.length == 0))
                        && (foundUseType || (inputUseList.length == 0))
                        && (foundCharacteristicType || (inputCharacteristicList.length == 0))) {
                        card.style.display = "grid";
                    } else {
                        card.style.display = "none";
                    }
                }
            });

        }, 300));
    });

    const inputSearchEl = document.querySelector('[data-search-form] input');
    const cardsListEl = document.querySelectorAll('[data-product-id]');
    // const cardsPriceListEl = document.querySelectorAll('[data-product-price]');
    // console.log("cardsNameListEl", cardsNameListEl);

    const cardList = []
    cardsListEl.forEach(el => {
        const name = el;
        const nameValue = el.querySelector('[data-product-name]').textContent;
        cardList[el] = nameValue;
    })

    console.log("cardList", cardList);


    // console.log("cardsNameLis", cardsNameLis);

    inputSearchEl.addEventListener("input", (e) => {
        // console.log("inputSearchEl", e.target.value);
        // cardListEl.forEach(card => {
        //     console.log("inputSearchEldsf", card.dataset.productName.textContent);
        // })
    })

}