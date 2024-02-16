window.resize = function () {
    const totalHeight = window.innerHeight;
    const headerHeight =
        document.getElementById("header-container").offsetHeight;

    document.getElementById("body-container").style.height = `${
        totalHeight - headerHeight
    }px`;
};

const initialize = function () {
    window.resize();
};

document.addEventListener("DOMContentLoaded", initialize);
