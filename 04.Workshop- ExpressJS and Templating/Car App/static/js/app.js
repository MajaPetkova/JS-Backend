document.getElementById("cars").addEventListener("click", (ev) => {
  if (ev.target.classList.contains("more")) {
    const desc = ev.target.parentElement.querySelector(".description");
    if (desc.style.display == "block") {
        desc.style.display = "none";
        ev.target.innerHTML = "Show More"
    }else{
        desc.style.display = "block";
        ev.target.innerHTML = "Show Less"
    }
  }
});
