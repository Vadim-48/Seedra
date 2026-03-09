export const initAccordionForm = () => {
    document.querySelectorAll('[data-accordion] .filter-form__group-btn')
        .forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.closest('[data-accordion]').classList.toggle('active');
            });
        });
};