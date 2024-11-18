const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const dataTable = document.getElementById('dataTable');

let products = [];
let originalProducts = [];

fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        products = data.products.slice(0, 30);
        originalProducts = [...products];
        renderTable(products);
    })

function renderTable(data) {
    dataTable.innerHTML = '';
    data.forEach(product => {
        const row = `
            <tr>
                <td><img src="${product.thumbnail}" alt="${product.title}"></td>
                <td>${product.title}</td>
                <td>${product.description}</td>
            </tr>
        `;
        dataTable.innerHTML += row;
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredProducts);
});

sortSelect.addEventListener('change', () => {
    const sortType = sortSelect.value;

    if(sortType === 'ascending') {
        products.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if(sortType === 'descending') {
        products.sort((a, b) => b.title.localeCompare(a.title));
    }
    else {
        products = [...originalProducts];
    }
    renderTable(products);
});