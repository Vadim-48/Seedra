export function innitToolbarDropdown() {
    const toolbarBtn = document.querySelector('[data-toolbar-btn]');
    let toolbarDropdown = document.querySelector('[data-cards-filter]');
    if (!toolbarDropdown) toolbarDropdown = document.querySelector('.toolbar__sort-wrap');;

    toolbarBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toolbarBtn.classList.toggle('is-dropdown-open');
        toolbarDropdown.classList.toggle('is-dropdown-open');
    })

    document.addEventListener("click",(e) => {
        const isClickInside = toolbarDropdown.contains(e.target);
        const isClickOnBtn = toolbarBtn.contains(e.target);

        if (!isClickInside && !isClickOnBtn) {
            toolbarBtn.classList.remove('is-dropdown-open');
            toolbarDropdown.classList.remove('is-dropdown-open');
        }
    })

    window.addEventListener("resize", () => {
        toolbarBtn.classList.remove('is-dropdown-open');
        toolbarDropdown.classList.remove('is-dropdown-open');
    })
}