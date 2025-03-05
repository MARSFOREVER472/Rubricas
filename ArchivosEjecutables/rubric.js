// FUNCIÓN PARA AGREGAR UN NUEVO CRITERIO A LA RÚBRICA...

function addCriterion()
{
    const criterionInput = document.getElementById('criterion');
    const criterionText = criterionInput.value.trim();

    if (criterionText === '')
        return;

    const table = document.getElementById('rubricTable');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td class="border p-2">${criterionText}</td>
        <td class="border p-2"><input type="text" class="w-full p-1 border"></td>
        <td class="border p-2"><input type="text" class="w-full p-1 border"></td>
        <td class="border p-2"><input type="text" class="w-full p-1 border"></td>
        <td class="border p-2">
        <button onclick=removeCriterion(this)" class="bg-red-500 text-black px-2 py-1 rounded">Eliminar</button>
        </td>
        `;

    table.appendChild(row);
    criterionInput.value = '';
}

// FUNCIÓN MEDIANTE UN BOTÓN EJECUTABLE PARA ELIMINAR UN CRITERIO DE LA TABLA...

function removeCriterion(button)
{
    button.parentElement.remove();
}

// FUNCIÓN PARA EXPORTAR LA RÚBRICA EN FORMATO PDF...

function exportToPDF()
{
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.text("Rúbrica de evaluación", 10, y);
    y += 10;

    const tableRows = document.querySelectorAll('#rubricTable tr');

    tableRows.forEach(row => {
       const cells = row.querySelectorAll('td');
       let rowData = [];
       cells.forEach(cell => {
           const input = cell.querySelector('input');
           rowData.push(input ? input.value : cell.innerText);
       });

       doc.text(rowData.join(' | '), 10, y);
       y += 10;
    });

    doc.save("rubrica.pdf");
}