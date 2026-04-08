let originalCards =[];

export function saveOriginalCads() {
    const cardsWrapper = document.querySelector("[data-product-cards-wrap]");
    if (originalCards.length > 0) {
        return originalCards;
    }
    originalCards = Array.from(cardsWrapper.querySelectorAll("[data-product-id]"));
    return originalCards;
}