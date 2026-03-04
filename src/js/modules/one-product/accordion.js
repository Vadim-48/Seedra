export const initAccordion = () => {
    document.querySelectorAll('.accordion__row').forEach((btn) => {
        btn.addEventListener('click', () => {
            // btn.parentElement.classList.toggle('active');
            btn.classList.toggle('active');
        });
    })
}