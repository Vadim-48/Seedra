export const initFilterDropdown = () => {
    const mobFilterBtn = document.querySelector(".toolbar__filter-btn");
    const filterDropdown = document.querySelector(".search-bar__filter-dropdown");

    mobFilterBtn.addEventListener("click", (e) => {
        filterDropdown.classList.toggle("open");
    })

    document.addEventListener("click",  (e) => {
        if (!filterDropdown.contains(e.target) && !mobFilterBtn.contains(e.target)) {
            filterDropdown.classList.remove("open");
        }
    })
    window.addEventListener("resize", () => {
        filterDropdown.classList.remove("open");
    })
}