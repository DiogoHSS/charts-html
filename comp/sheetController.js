window.resourceBundle = {
    "en-US": {
        label: "Label",
        value: "Value"
    },
    "pt-BR": {
        label: "Rótulo",
        value: "Valor"
    }
};

const localize = function (key, locale = "pt-BR") {
    return window.resourceBundle[locale][key];
};

const fillLabels = function () {
    const locale = navigator.language || "en-US";
    const labels = document.querySelectorAll('[id*="localize-"]');

    labels.forEach((label) => {
        label.textContent = localize(label.id.split("-").pop(), locale);
    });
};

const deleteRow = function (rowIndex) {
    const tableBody = document.getElementById("table-body");
    tableBody.deleteRow(rowIndex);
    resize();
};

const addNewRow = function (label = "", value = "") {
    const tableBody = document.getElementById("table-body");
    const newRow = tableBody.insertRow(tableBody.rows.length);
    const rowLabel = newRow.insertCell(0);
    const rowValue = newRow.insertCell(1);
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");

    rowLabel.innerHTML = `<input type="text" class="editable" placeholder="Digite o rótulo" value="${label}">`;
    rowLabel.className = "table_cell";

    rowValue.innerHTML = `<input type="text" class="editable" placeholder="Digite o valor" value="${value}">`;
    rowValue.className = "table_cell";

    deleteIcon.src = "../img/trash.svg";
    deleteIcon.alt = "Deletar";

    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = (event) => {
        deleteRow(event.target.parentElement.parentElement.rowIndex - 1);
        resize();
    };
    deleteButton.className = "table_rowIconButton";

    newRow.className = "table_row";
    newRow.appendChild(deleteButton);
    resize();
};

const initializeSheet = function () {
    const initialRows = [
        { label: "a", value: 10 },
        { label: "b", value: 20 },
        { label: "c", value: 20 },
        { label: "d", value: 5 },
        { label: "e", value: 40 }
    ];

    fillLabels();

    for (const data of initialRows) {
        addNewRow(data.label, data.value);
    }
};

const resize = function () {
    window.parent.document.getElementById(
        "comp-" + window.location.pathname.split("/").pop().split(".")[0]
    ).style.height =
        document.getElementById("component-container").offsetHeight + "px";

    window.parent.resize();
};

const initialize = function () {
    document
        .getElementById("add-row-btn")
        .addEventListener("click", () => addNewRow());
    initializeSheet();
    resize();
};

document.addEventListener("DOMContentLoaded", initialize);
