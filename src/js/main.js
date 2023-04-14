const headerContainerLogo = document.querySelector(".header_container_logo");
const purpleLogo = document.querySelector(".purple-logo");
const whiteLogo = document.querySelector(".white-logo");

const burgerBtn = document.querySelector(".header_container_navi_btn-menu");
const headerContainerNaviList = document.querySelector(".header_container_navi_list");
const visibleImage = document.querySelector(".visible");
const hiddenImage = document.querySelector(".hidden");
whiteLogo.style.display = "none";

headerContainerLogo.addEventListener("mouseenter", function () {
    purpleLogo.style.display = "none";
    whiteLogo.style.display = "block";
})
headerContainerLogo.addEventListener('mouseleave', () => {
    purpleLogo.style.display = 'block';
    whiteLogo.style.display = 'none';
});

let statusNavOpen = "none"

window.addEventListener('resize', () => {
    let width = window.innerWidth

    if (width >= 481) {
        headerContainerNaviList.style.display = "flex";
        burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
        })
    } else {
        statusNavOpen = "none"

        visibleImage.classList.toggle("visible");
        if (visibleImage.classList[1] == "hidden") {
            statusNavOpen = "block"
        }
        headerContainerNaviList.style.display = statusNavOpen;

    }
})


burgerBtn.addEventListener("click", function () {
    statusNavOpen = statusNavOpen === "none" ? "block" : "none"
    headerContainerNaviList.style.display = statusNavOpen;
    visibleImage.classList.toggle("visible");
    visibleImage.classList.toggle("hidden");
    hiddenImage.classList.toggle("hidden");
    hiddenImage.classList.toggle("visible");
})

document.addEventListener("click", function (event) {
    console.log(event.target.parentNode)
    if (event.target.id !== "headerContainerNaviList" && event.target.id !== "naviBtnMenu" && event.target.parentNode.id !== "naviBtnMenu" && statusNavOpen !== "none") {
        statusNavOpen = "none"
        headerContainerNaviList.style.display = statusNavOpen;
        visibleImage.classList.toggle("visible");
        visibleImage.classList.toggle("hidden");
        hiddenImage.classList.toggle("hidden");
        hiddenImage.classList.toggle("visible");
    }
})