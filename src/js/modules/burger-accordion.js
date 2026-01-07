export function burgerAccordion() {
    const categoryBtns = document.querySelectorAll('.burger__category-btn');

    categoryBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.burger__category-item');
            if (!item) return;

            const subCategory = item.querySelector('.burger__subcategory');
            if (!subCategory) return;

            const isOpen = subCategory.classList.contains('open');

            // Закриваємо всі підкатегорії
            document.querySelectorAll('.burger__subcategory.open').forEach((ul) => {
                ul.classList.remove('open');
                ul.style.maxHeight = null;
                const otherBtn = ul.closest('.burger__category-item')
                    .querySelector('.burger__category-btn');
                otherBtn.classList.remove('active');
            });

            // Якщо був закритий — відкриваємо
            if (!isOpen) {
                subCategory.classList.add('open');
                subCategory.style.maxHeight = subCategory.scrollHeight + 'px';
                btn.classList.add('active');
            }
        });
    });
}

