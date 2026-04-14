export const initSortCards = () => {
    const toolbarWrap = document.querySelector(".toolbar__sort-wrap");
    if (!toolbarWrap) return;
    const toolbarBtn = toolbarWrap.querySelector(".toolbar__sort-btn");
    const toolbarDropdown = toolbarWrap.querySelector(".toolbar-dropdown");

    toolbarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toolbarWrap.classList.toggle("is-sort-open");
    })

    toolbarDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        const clickEl = e.target.closest("li");
        if (!clickEl) return;
        const currentEl = toolbarWrap.querySelector(".toolbar__sort-item");
        if (clickEl) {
            currentEl.textContent = clickEl.textContent;
            sortCards();
            toolbarWrap.classList.remove("is-sort-open");
        }

    })
    document.addEventListener("click", (e) => {
        // e.stopPropagation();

        if (!toolbarWrap.classList.contains("is-sort-open")) return;
        if (!e.target.closest(".toolbar__sort-wrap")) {
            toolbarWrap.classList.remove("is-sort-open");
        }
    })
    window.addEventListener("resize", () => {
        toolbarWrap.classList.remove("is-sort-open");
    });


    function sortCards() {
        const sortWrap = document.querySelector("[data-cards-wrap]");
        if (!sortWrap) return;

        const cardsList = sortWrap.querySelectorAll("[data-sort-card]");
        const sortRule = toolbarWrap.querySelector(".toolbar__sort-item").textContent.trim();


        const sortFunct = Array.from(cardsList)
            .sort((a, b) => {
                const priceTextA = a.querySelector(".card__price")?.textContent|| "0";
                const priceTextB = b.querySelector(".card__price")?.textContent|| "0";


                const priceA = priceTextA.replace(',', '.').replace(/[^\d.]/g, '');
                const priceB = priceTextB.replace(',', '.').replace(/[^\d.]/g, '');

                if (sortRule === "Most expensive") {
                    return priceB - priceA;

                }
                if (sortRule === "Less expensive") {
                    return priceA - priceB;
                }
                return 0;
            })

        sortFunct.forEach((element, index) => {
            sortWrap.appendChild(element);
        })
    }
}

