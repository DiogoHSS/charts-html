const resize = function () {
    window.parent.document.getElementById(
        "comp-" + window.location.pathname.split("/").pop().split(".")[0]
    ).style.height =
        document.getElementsByClassName("component")[0].offsetHeight + "px";

    window.parent.resize();
};

const initialize = function () {
    resize();
};

document.addEventListener("DOMContentLoaded", initialize);
