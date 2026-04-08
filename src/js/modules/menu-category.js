// import { disablePageScroll, enablePageScroll, addScrollableSelector } from 'scroll-lock';

export const initMenuCategoryScroll = () => {
    const el = document.querySelector('.category__btn-list-wrap');
    if (!el) return;

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
    if (!menuCategoryEl) return;

    const btnList = menuCategoryEl.querySelectorAll('.category__btn');
    const dropdownListEl = menuCategoryEl.querySelectorAll('.category-dropdown');
    const dropdownWrap = document.querySelector('.category__dropdown-list');

    // addScrollableSelector('.category-dropdown__content');

    const closeAll = () => {
        btnList.forEach(b => b.classList.remove('open'));
        dropdownListEl.forEach(el => el.classList.remove('open'));
        // enablePageScroll();
    };

    btnList.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const targetDropdown = dropdownListEl[index];
            if (!targetDropdown) return;

            const isOpen = targetDropdown.classList.contains('open');

            btnList.forEach(b => b.classList.remove('open'));
            dropdownListEl.forEach(el => el.classList.remove('open'));

            if (!isOpen) {
                targetDropdown.classList.add('open');
                btn.classList.add('open');
                // disablePageScroll();
            } else {
                // enablePageScroll();
            }
        });
    });

    dropdownWrap?.addEventListener('click', (e) => {
        const clickEl = e.target.closest("button");
        if (clickEl) {
            closeAll();
        }

    })

    document.addEventListener("click", (e) => {
        // const isClickInside = e.target.closest('[data-menu-category]') || e.target.closest('.category-dropdown');
        const isClickInside =
            e.target.closest('[data-menu-category]') ||
            e.target.closest('.category-dropdown') ||
            e.target.closest('.toolbar__sort-wrap');

        if (!isClickInside) {
            closeAll();
        }
    });

    window.addEventListener("resize", () => {
        closeAll();
    });
}
