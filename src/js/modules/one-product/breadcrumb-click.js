export function innitBreadcrumbClick() {
    const breadcrumbWrap = document.querySelector("[data-breadcrumb-wrap]");
    if (!breadcrumbWrap) return;
    breadcrumbWrap.addEventListener("click", (e) => {
        const clickEl = e.target.closest("[data-breadcrumb-item]");
        if (clickEl) e.preventDefault();

        const filterType = clickEl.dataset.breadcrumbType;
        const filterCategory = clickEl.dataset.breadcrumbCategory;

        const queries = {
            ...(filterCategory && {_chosenCategory: filterCategory}),
            ...(filterType && {_chosenType: filterType}),
        }

        const params = new URLSearchParams(queries);
        const baseElUrl = clickEl.href.split('?')[0];
        window.location.href = baseElUrl + "?" + params;
    })
}