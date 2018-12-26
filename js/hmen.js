
function addHandlers() {
    let eHmenBtn = document.querySelector(".hmen__btn");
    let ePage = document.querySelector(".page");
    let menuIsOpen = false;

    function hmenToggle(e) {
        eHmenBtn.classList.toggle("change");
        if (!menuIsOpen) {
            ePage.classList.remove("page--nav-animation--retract");
            ePage.classList.add("page--nav-animation--expand");
        } else {
            ePage.classList.remove("page--nav-animation--expand");
            ePage.classList.add("page--nav-animation--retract");
            ePage.classList.remove("page--nav-animation--expanded");
        }

        menuIsOpen = !menuIsOpen;
    }

    function hmenAnimationEnd(e) {
        console.log("daffadfads");

        if (menuIsOpen) {
            ePage.classList.add("page--nav-animation--expanded");
        }

        ePage.classList.remove("page--nav-animation--expand");
        ePage.classList.remove("page--nav-animation--retract");
    }

    eHmenBtn.addEventListener("click", hmenToggle);
    ePage.addEventListener("animationend", hmenAnimationEnd);
}


window.addEventListener("load", function(e) {
    addHandlers();
});

if (document.readyState === "complete") {
    addHandlers();
}