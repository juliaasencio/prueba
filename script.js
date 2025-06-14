/* Script principal para gestionar la lista de la compra */

// Claves de localStorage
const STORAGE_KEY = 'shoppingListData';
const STATS_KEY = 'shoppingStatsData';

// Obtener datos de la lista desde localStorage
function getList() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar lista en localStorage
function saveList(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Obtener estadísticas acumuladas
function getStats() {
    return JSON.parse(localStorage.getItem(STATS_KEY)) || {};
}

// Guardar estadísticas en localStorage
function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

const listElement = document.getElementById('shoppingList');
const addForm = document.getElementById('addForm');
const clearBtn = document.getElementById('clearList');
const statsCanvas = document.getElementById('statsChart');
let chart; // instancia de Chart.js

// Renderizar la lista de productos
function renderList() {
    const items = getList();
    listElement.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = item.bought ? 'bought' : '';

        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.bought;
        checkbox.addEventListener('change', () => {
            item.bought = checkbox.checked;
            items[index] = item;
            saveList(items);
            renderList();
        });

        const span = document.createElement('span');
        span.className = 'name';
        span.textContent = `${item.name} (x${item.quantity})`;

        label.appendChild(checkbox);
        label.appendChild(span);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete';
        delBtn.addEventListener('click', () => {
            items.splice(index, 1);
            saveList(items);
            renderList();
        });

        li.appendChild(label);
        li.appendChild(delBtn);
        listElement.appendChild(li);
    });
}

// Actualizar gráfico de estadísticas
function updateChart() {
    const stats = getStats();
    const labels = Object.keys(stats);
    const data = Object.values(stats);

    if (!chart) {
        chart = new Chart(statsCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Veces añadido',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }
}

// Manejar envío del formulario para añadir productos
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('productName');
    const qtyInput = document.getElementById('productQuantity');

    const newItem = {
        name: nameInput.value.trim(),
        quantity: parseInt(qtyInput.value, 10),
        bought: false
    };

    if (!newItem.name) return;

    const items = getList();
    items.push(newItem);
    saveList(items);

    // actualizar estadísticas
    const stats = getStats();
    stats[newItem.name] = (stats[newItem.name] || 0) + 1;
    saveStats(stats);

    // Resetear formulario
    nameInput.value = '';
    qtyInput.value = 1;

    renderList();
    updateChart();
});

// Vaciar la lista completa (no afecta a las estadísticas)
clearBtn.addEventListener('click', () => {
    saveList([]);
    renderList();
});

// Inicializar interfaz al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderList();
    updateChart();
});
