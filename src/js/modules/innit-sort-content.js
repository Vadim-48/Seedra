export const initSortContent = () => {
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
            sortContent();
            toolbarWrap.classList.remove("is-sort-open");
            console.log(cardsElArr);
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


    const sortWrap = document.querySelector("[data-cards-wrap]");
    const cardsList = sortWrap.querySelectorAll(".news-card");

    let cardsElArr = [];
    cardsList.forEach(card => {
        const date = card.querySelector(".news-card__date-text").textContent.trim();
        const title = card.querySelector(".news-card__title").textContent.trim();
        const text = card.querySelector(".news-card__text").textContent.trim();
        // const picture = card.querySelector(".news-card__photo").innerHTML;
        const picture = card.querySelector(".news-card__photo");
        let obj = {"date": date, "title": title, "text": text, "picture": picture};
        cardsElArr.push(obj);
    })

    const parseDate = (dateStr) => {
        if (!dateStr) return new Date(0);
        const [day, month, year] = dateStr.split('.');
        return new Date(year, month - 1, day);
    };

    function sortCards() {
        if (!sortWrap) return;
        const sortRule = toolbarWrap.querySelector(".toolbar__sort-item").textContent.trim();

        cardsElArr.sort((a,b) =>{
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            if (sortRule ==='Recently') {return dateA - dateB;}
            if (sortRule ==='Older') {return dateB - dateA;}

        });
    }

    function sortContent() {
        sortCards();
        for (let i = 0; i < cardsList.length; i++) {
            const date = cardsList[i].querySelector(".news-card__date-text");
            const title = cardsList[i].querySelector(".news-card__title");
            const text = cardsList[i].querySelector(".news-card__text");
            const picture = cardsList[i].querySelector(".news-card__photo");

            if (date) date.textContent = cardsElArr[i].date;
            if (picture) picture.replaceWith(cardsElArr[i].picture.cloneNode(true));
            if (title) title.textContent = cardsElArr[i].title;
            if (text) text.textContent = cardsElArr[i].text;
            console.log(i);
        }
    }
}


