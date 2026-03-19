export const initCategoryDropdown = () => {
    const menuCategoryEl = document.querySelector('[data-menu-category]');
    const btnList = menuCategoryEl.querySelectorAll('.category__btn');
// const dropdownWrap = menuCategoryEl.querySelector('.category__dropdown-list');
    const dropdownListEl = menuCategoryEl.querySelectorAll('.category-dropdown');
// const doc = document;
    console.log(dropdownListEl);

    btnList.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            const isOpen = dropdownListEl[index].classList.contains('open');

            dropdownListEl.forEach(el => {
                el.classList.remove('open');
            })
            if (!isOpen) {dropdownListEl[index].classList.add('open'); }
        })
    })

    document.addEventListener("click", (e) => {
        if (!menuCategoryEl.contains(e.target)) {
            dropdownListEl.forEach(el => {
                el.classList.remove('open');
            })
        }
    })
}