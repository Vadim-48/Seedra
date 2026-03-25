export const initMenuCategoryScroll = () => {
    const el = document.querySelector('.category__btn-list-wrap');

    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', (e) => {
        isDown = true;
        el.classList.add('dragging');
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
        isDown = false;
        el.classList.remove('dragging');
    });

    el.addEventListener('mouseup', () => {
        isDown = false;
        el.classList.remove('dragging');
    });

    el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = x - startX;
        el.scrollLeft = scrollLeft - walk;
    });
}

export const initCategoryDropdown = () => {
    const menuCategoryEl = document.querySelector('[data-menu-category]');
    const btnList = menuCategoryEl.querySelectorAll('.category__btn');
    const dropdownListEl = menuCategoryEl.querySelectorAll('.category-dropdown');

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
    window.addEventListener("resize", () => {
        dropdownListEl.forEach(el => {
            el.classList.remove('open');
        })
    })
}