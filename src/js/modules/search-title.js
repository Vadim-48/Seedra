export function innitSearchTitle() {
    const searchInput = document.querySelector('.toolbar__search-input');
    const cardsWrapper = document.querySelector('[data-cards-wrap]');
    const cardsList = cardsWrapper.querySelectorAll('.card, .news-card');

    searchInput.addEventListener('input', (e) => {
        // if (e.target.value === '') {
        //     return
        // }
        filterCards(e.target.value);
    })

    searchInput.addEventListener('search', (e) => {
        filterCards(e.target.value);
    })

    function filterCards(inputValue) {
        const query = inputValue.toLowerCase().trim();
        const queryWords = query.split(' ').filter(word => word !== '');

        cardsList.forEach((card) => {
            const cardTitle = card.querySelector('[data-product-name], [data-card-name]').textContent.toLowerCase();
            const isMatch = queryWords.every(word => cardTitle.includes(word));

            if (isMatch || inputValue ==="") {
                card.style.display = '';
            } else {card.style.display = 'none';}

        })
    }
}