export const initAccordion = () => {
    document.querySelectorAll('[data-accordion]').forEach((btn) => {
        btn.addEventListener('click', () => {
            // btn.parentElement.classList.toggle('active');
            btn.classList.toggle('active');
        });
    })
}