import {collection, getDocs} from "firebase/firestore";
import {query, where} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

// function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, args), wait);
//     };
// }

export async function initCardFilter() {
    const filterFormList = document.querySelectorAll(".filter-form");
    const inputList = document.querySelectorAll(".filter-form input");
    const cardsList = document.querySelectorAll('[data-product-firebase]');

    let checkboxNameList = [...inputList]
        .map(el => el.name)
        .filter(el => el !== "")
    checkboxNameList = [...new Set(checkboxNameList)]
    console.log("fddfsd", checkboxNameList);

    inputList.forEach(input => {
        input.addEventListener("input", async (e) => {
            const inputChecked = [...inputList]
                .filter(el => el.checked)
                .map(el => el.value);
            console.log("inputChecked", inputChecked);

            const productsFirebase = collection(db, "products");
            let docsObj = {};

            for (const name of checkboxNameList) {
                docsObj[name] = [];
                const q = query(productsFirebase, where(name, "in", inputChecked));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    docsObj[name].push(doc.id);
                });
            }
            console.log("allDocs", docsObj);

            // const filter = query(productsFirebase, where('seedType', 'in', inputChecked),
            //     where('featureType', 'in', inputChecked),
            //     where('growingType', 'in', inputChecked),
            //     where('useType', 'in', inputChecked),
            //     where('characteristicType', 'in', inputChecked));
            // const querySnapshot = await getDocs(filter);
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, ' => ', doc.data());
            // });


            // cardsList.forEach((el) => {
            //     if (allDocs.includes(el.dataset.productFirebase)) {
            //         el.style.display = "grid";
            //     } else {
            //         el.style.display = "none";
            //     }
            // });

        })
    })


    // const formInputListEl = document.querySelectorAll("input");
// const cardListEl = document.querySelectorAll('[data-product-id]');
//     const cardsListEl = document.querySelectorAll('[data-product-firebase]');
//
//     cardsListEl.forEach((el) => {
//         console.log("fddfsd", el.dataset.productFirebase);
//     })
//
//
//     formInputListEl.forEach(input => {
//         input.addEventListener("input", async () => {
//             let inputCheckboxList = [...formInputListEl]
//                 .map(el => el.name)
//                 .filter(el => el !== "")
//
//             inputCheckboxList = [...new Set(inputCheckboxList)];
//
//             console.log("fddddd", inputCheckboxList);
//
//             const inputCheckedListEl = [...formInputListEl]
//                 .filter(el => el.checked)
//                 .map(el => el.value)
//             console.log(inputCheckedListEl);
//
//
//             const productsFirebase = collection(db, "products");
//             const q = query(productsFirebase, where("seedType", "in", inputCheckedListEl));
//             const querySnapshot = await getDocs(q);
//             const filterListId = querySnapshot.docs.map(el => el.id);
//             console.log(filterListId);
//
//             cardsListEl.forEach((el) => {
//                 if (filterListId.includes(el.dataset.productFirebase)) {
//                     el.style.display = "grid";
//                 } else {
//                     el.style.display = "none";
//                 }
//             });
//
//         });
//
//     });
}