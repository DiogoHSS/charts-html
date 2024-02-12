function calcVertice(index, value, total, lastVertice) {
    if (index === 1) {
        return {
            x: "0%",
            y: "0%"
        };
    } else if (index === 6) {
        return {
            x: "50%",
            y: "50%"
        };
    }

    const percentage = value / total;

    if (index === 2) {
        if (percentage > 0.25) {
            return {
                x: 100 * percentage * 4 + "%",
                y: "0%"
            };
        }

        return {
            x: "100%",
            y: "0%"
        };
    }

    if (index === 3) {
        if (percentage < 0.25) {
            return lastVertice;
        }

        if (percentage < 0.5) {
            return {
                x: "100%",
                y: 100 * (percentage - 0.25) * 4 + "%"
            };
        }

        return {
            x: "100%",
            y: "100%"
        };
    }

    if (index === 4) {
        if (percentage < 0.5) {
            return lastVertice;
        }

        if (percentage < 0.75) {
            return {
                x: 100 * (1 - (percentage - 0.5)) * 4 + "%",
                y: "100%"
            };
        }

        return {
            x: "0%",
            y: "100%"
        };
    }

    if (index === 5) {
        if (percentage < 0.75) {
            return lastVertice;
        }

        return {
            x: "0%",
            y: 100 * (1 - (percentage - 0.75)) * 4 + "%"
        };
    }
}

function addSlice() {
    const pieContainer = document.getElementById("pie-container");
    const tds = window.parent.parent.document
        .getElementById("comp-sheet")
        .contentDocument.getElementById("data-table")
        .getElementsByTagName("td");

    const data = [];
    let total = 0;
    Array.from(tds).map((td, index, array) => {
        if (index % 2 === 0) {
            const key = array[index].children[0].value;
            const value = parseInt(array[index + 1].children[0].value, 10);
            data.push({ [key]: value });
            total += value;
            return value;
        }
    });

    let angle = 0;

    for (let i = 0; i < data.length; i++) {
        const slice = document.createElement("div");
        const vertice_1 = calcVertice(1, null, null, null);
        const vertice_2 = calcVertice(
            2,
            data[i][Object.keys(data[i])],
            total,
            null
        );
        const vertice_3 = calcVertice(
            3,
            data[i][Object.keys(data[i])],
            total,
            vertice_2
        );
        const vertice_4 = calcVertice(
            4,
            data[i][Object.keys(data[i])],
            total,
            vertice_3
        );
        const vertice_5 = calcVertice(
            5,
            data[i][Object.keys(data[i])],
            total,
            vertice_4
        );
        const vertice_6 = calcVertice(6, null, null, null);

        slice.className = "pie-slice";
        slice.style.backgroundColor = `#${Math.floor(
            Math.random() * 16777215
        ).toString(16)}`;
        slice.style.clipPath = `polygon(${vertice_1.x} ${vertice_1.y}, ${vertice_2.x} ${vertice_2.y}, ${vertice_3.x} ${vertice_3.y}, ${vertice_4.x} ${vertice_4.y}, ${vertice_5.x} ${vertice_5.y}, ${vertice_6.x} ${vertice_6.y})`;
        slice.style.transform = `rotate(${angle}deg)`;
        pieContainer.appendChild(slice);

        angle += (data[i][Object.keys(data[i])] / total) * 360;

        const tooltip = document.createElement("div");
        tooltip.className = "slice-content";
        tooltip.innerHTML = `${Object.keys(data[i])}`;
        // tooltip.style.transform = `rotate(${angle}deg)`;

        slice.appendChild(tooltip);
    }
}

function resizeContainer() {
    window.parent.document.getElementById(
        "comp-" + window.location.pathname.split("/").pop().split(".")[0]
    ).style.height = document.body.offsetHeight + "px";
}

function initializeComponent() {
    addSlice();
    resizeContainer();
    window.parent.resizeContainer();
}

document.addEventListener("DOMContentLoaded", initializeComponent);
