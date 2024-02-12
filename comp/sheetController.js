function addNewRow(event, label = undefined, value = undefined) {
    const tableBody = document
        .getElementById("data-table")
        .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow(tableBody.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const deleteButton = document.createElement("button");

    if (label === undefined) {
        cell1.innerHTML =
            '<input type="text" class="editable" placeholder="Digite o rótulo" value="">';
    } else {
        cell1.innerHTML = `<input type="text" class="editable" value="${label}">`;
    }

    if (value === undefined) {
        cell2.innerHTML =
            '<input type="text" class="editable" placeholder="Digite o valor">';
    } else {
        cell2.innerHTML = `<input type="text" class="editable" value="${value}">`;
    }

    deleteButton.innerHTML = "Excluir";
    deleteButton.onclick = function () {
        tableBody.deleteRow(newRow.rowIndex - 1);
        resizeContainer();
    };

    newRow.appendChild(deleteButton);
    resizeContainer();
}

function initializeSheet() {
    const initialRows = [
        { label: "a", value: 10 },
        { label: "b", value: 20 },
        { label: "c", value: 20 },
        { label: "d", value: 5 },
        { label: "e", value: 40 }
    ];

    for (const data of initialRows) {
        addNewRow(null, data.label, data.value);
    }
}

function resizeContainer() {
    window.parent.document.getElementById(
        "comp-" + window.location.pathname.split("/").pop().split(".")[0]
    ).style.height =
        document.getElementsByClassName("component")[0].offsetHeight + "px";
}

function initializeComponent() {
    document.getElementById("add-row-btn").addEventListener("click", addNewRow);
    initializeSheet();
    resizeContainer();
}

document.addEventListener("DOMContentLoaded", initializeComponent);
