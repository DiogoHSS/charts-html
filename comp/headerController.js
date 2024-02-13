function resizeContainer() {
    window.parent.document.getElementById(
        "comp-" + window.location.pathname.split("/").pop().split(".")[0]
    ).style.height =
        document.getElementsByClassName("component")[0].offsetHeight + "px";

    window.parent.resize();
}

function initializeComponent() {
    resizeContainer();
}

document.addEventListener("DOMContentLoaded", initializeComponent);
