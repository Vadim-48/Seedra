import {app} from '@/firebase/firebase.js';
import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {initSort} from "@/js/modules/innit-sort.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    updateCartIcon();
    updateFavoriteIcon();
    initSort();
});


// const toolbarWrap = document.querySelector(".toolbar__sort-wrap");
// const toolbarBtn = toolbarWrap.querySelector(".toolbar__sort-btn");
// const toolbarDropdown = toolbarWrap.querySelector(".toolbar-dropdown");
//
// toolbarBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     toolbarWrap.classList.toggle("open");
// })
//
// toolbarDropdown.addEventListener("click", (e) => {
//     const clickEl = e.target.closest("li");
//     const currentEl = toolbarWrap.querySelector(".toolbar__sort-item");
//     if (clickEl) {
//         currentEl.textContent = clickEl.textContent;
//         sortCards();
//         toolbarWrap.classList.remove("open");
//     }
// })
// window.addEventListener("click", (e) => {
//     if (!e.target.classList.contains("toolbar__sort-wrap")) {toolbarWrap.classList.remove("open");}
// })
//
//
// function sortCards() {
//     const sortWrap = document.querySelector("[data-cards-wrap]");
//     if (!sortWrap) return;
//
//     const cardsList = sortWrap.querySelectorAll(".news-card");
//     const sortRule = toolbarWrap.querySelector(".toolbar__sort-item").textContent;
//
//     const parseDate = (dateStr) => {
//         if (!dateStr) return new Date(0);
//         const [day, month, year] = dateStr.split('.');
//         return new Date(year, month - 1, day);
//     };
//
//
//
//
//     const sortDate = Array.from(cardsList)
//         .sort((a,b) =>{
//             const dateTextA = a.querySelector(".news-card__date-text")?.textContent;
//             const dateTextB = b.querySelector(".news-card__date-text")?.textContent;
//
//             const dateA = parseDate(dateTextA);
//             const dateB = parseDate(dateTextB);
//
//             if (sortRule ==="Recently") {return new Date(dateA) - new Date(dateB);}
//             if (sortRule ==="Older") {return new Date(dateB) - new Date(dateA);}
//             return 0;
//         })
//
//     sortDate.forEach((element, index) => {
//         sortWrap.appendChild(element);
//     })
// }


