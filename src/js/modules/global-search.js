import {db} from "@/firebase/firebase.js";
import {collection, getDocs} from "firebase/firestore";

let productsMapData = null;

async function getProducts() {
    if (productsMapData) return productsMapData;

    const productsSnapshot = await getDocs(collection(db, "products"));

    productsMapData = {};
    productsSnapshot.forEach((doc) => {
        productsMapData[doc.id] = doc.data().shortName;
    });
    return productsMapData;
}

let fragmentList = document.createDocumentFragment();

async function loadDropdown(wrap) {
    const linkTemplateWrap = wrap.querySelector('.global-search__dropdown-template');
    const dropdownInner = wrap.querySelector('.global-search__dropdown');
    const linkTemplate = linkTemplateWrap.content.querySelector('.global-search__dropdown-item');
    const spanTemplate = linkTemplateWrap.content.querySelector('.global-search__dropdown-not-found');
    const notFound = spanTemplate.cloneNode(true);

    const productsData = await getProducts();

    for (let key in productsData) {
        const textClone = linkTemplate.cloneNode(true);
        textClone.textContent = productsData[key];
        textClone.dataset.productId = key;
        fragmentList.appendChild(textClone);
    }
    fragmentList.appendChild(notFound);
    dropdownInner.appendChild(fragmentList);

}


export async function innitGlobalSearch() {
    const globalSearchWrap = document.querySelectorAll('[data-global-search]');

    globalSearchWrap.forEach(wrap => {
        const searchInput = wrap.querySelector('.global-search__search');
        const dropdownInner = wrap.querySelector('.global-search__dropdown-wrap');
        const links = dropdownInner.querySelectorAll('a');
        loadDropdown(wrap);

        searchInput.addEventListener('input', (e) => {
            e.preventDefault();
            inputActive(wrap, searchInput);
            filterNames(wrap, searchInput);
        })
        searchInput.addEventListener('search', (e) => {
            e.preventDefault();
            inputActive(wrap, searchInput);
            filterNames(wrap, searchInput);
        })

        dropdownInner.addEventListener('click', (e) => {
            e.preventDefault();
            const elClicked = e.target.closest('a');
            if (!elClicked) return;
            const clickedProductId = elClicked.dataset.productId;
            const queries = {
                _productId: clickedProductId,
            }
            const params = new URLSearchParams(queries);
            const baseElUrl = elClicked.getAttribute('href').split('?')[0];
            window.location.href = baseElUrl + "?" + params;
        })

        const dropdown = wrap.querySelector('.global-search__dropdown-wrap');
        document.addEventListener('click', (e) => {
            const isClickInside = wrap.contains(e.target);

            if (!isClickInside) {
                dropdown.classList.remove('open');
            } else {inputActive(wrap, searchInput);}
        })
        window.addEventListener("resize", () => {
            dropdown.classList.remove('open');
        })
    })


    function inputActive(form, searchInput) {
        const dropdown = form.querySelector('.global-search__dropdown-wrap');
        if (searchInput.value.trim().length > 0) {
            dropdown.classList.add('open');
        } else {
            dropdown.classList.remove('open');
        }
    }


    function filterNames(wrap, searchInput) {
        const query = searchInput.value.toLowerCase().trim();
        const queryWords = query.split(' ').filter(word => word !== '');
        const namesList = wrap.querySelectorAll('.global-search__dropdown-item');
        const notFound = wrap.querySelector('.global-search__dropdown-not-found');

        let visibleCount = 0;
        namesList.forEach((name) => {
            const cardName = name.textContent.toLowerCase();
            const isMatch = queryWords.every(word => cardName.includes(word));

            if (isMatch || searchInput === "") {
                name.style.display = '';
            } else {
                name.style.display = 'none';
                visibleCount++
            }
        })

        if (visibleCount >= namesList.length) {
            notFound.style.display = 'block';
        } else {
            notFound.style.display = '';
        }
    }
}