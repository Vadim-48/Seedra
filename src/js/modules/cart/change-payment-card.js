export const changePaymentCard = () => {
    const paymentCardsWrap = document.querySelector('.payment-form__cards-list');
    const paymentCardsList = document.querySelectorAll('.payment-form__cards-list-icon');
    paymentCardsWrap.addEventListener('click', (e) => {
        const closestCard = e.target.closest('.payment-form__cards-list-icon');
        if (!closestCard || closestCard.classList.contains('active')) return;

        paymentCardsList.forEach(paymentCard => {
            paymentCard.classList.remove('active');
        })
        closestCard.classList.add('active');
    })
};
