const headerContainerLogo = document.querySelector(".header_container_logo");
const purpleLogo = document.querySelector(".purple-logo");
const whiteLogo = document.querySelector(".white-logo");

whiteLogo.style.display = "none";

headerContainerLogo.addEventListener("mouseenter", function () {
    purpleLogo.style.display = "none";
    whiteLogo.style.display = "block";
})
headerContainerLogo.addEventListener('mouseleave', () => {
    purpleLogo.style.display = 'block';
    whiteLogo.style.display = 'none';
});

const burgerBtn = document.querySelector(".header_container_navi_btn-menu");
const headerContainerNaviList = document.querySelector(".header_container_navi_list");
const visibleImage = document.querySelector(".visible");
const hiddenImage = document.querySelector(".hidden");

let statusNavOpen = "none"

burgerBtn.addEventListener("click", function () {
    statusNavOpen = statusNavOpen === "none" ? "block" : "none"
    headerContainerNaviList.style.display = statusNavOpen;
    visibleImage.classList.toggle("visible");
    visibleImage.classList.toggle("hidden");
    hiddenImage.classList.toggle("hidden");
    hiddenImage.classList.toggle("visible");
})

document.addEventListener("click", function(event) {
    console.log(event.target.parentNode)
        if (event.target.id !== "headerContainerNaviList" && event.target.id!=="naviBtnMenu" && event.target.parentNode.id!=="naviBtnMenu" && statusNavOpen!=="none"){
            statusNavOpen = "none"
            headerContainerNaviList.style.display = statusNavOpen;
            visibleImage.classList.toggle("visible");
            visibleImage.classList.toggle("hidden");
            hiddenImage.classList.toggle("hidden");
            hiddenImage.classList.toggle("visible");
        }
})
