function t(){const i=JSON.parse(localStorage.getItem("finalPrice")),e=document.querySelectorAll("[data-final-price]");e&&e.forEach(n=>{n.textContent="$"+i})}export{t as i};
