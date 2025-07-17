let products = [];

const box = document.getElementById('products');
const search = document.getElementById('title');
const button_srch = document.getElementById('button_srch');
const price_sort = document.getElementById('price_sort');

window.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('u_name');
    const product = localStorage.getItem('usr_p');
    if (name && product) {
        const greet = document.getElementById('greetMsg');
        if (greet) {
            greet.textContent = `Welcome back, ${name}! You are interested in ${product}.`;
            greet.classList.remove('hidden');
        }
    }
    fetchProducts();
});

async function fetchProducts() {
    try {
        const resp = await fetch('https://fakestoreapi.com/products');
        const data = await resp.json();
        products = data.slice(0, 8);
        show(products);
    } catch (err) {
        box.textContent = 'Failed to load products.';
    }
}

function show(list) {
    box.className = 'grid grid-cols-2 md:grid-cols-4 gap-4';
    box.innerHTML = '';
    list.forEach(p => {
        let item = document.createElement('div');
        item.className = 'flex flex-col items-center bg-white p-2 rounded shadow';
        item.innerHTML = `
            <img src="${p.image}" alt="${p.title}" class="w-32 h-32 object-contain mb-2" />
            <span class="font-semibold">${p.title}</span>
            <span class="text-gray-600">₹${p.price}</span>
        `;
        box.appendChild(item);
    });
}

button_srch.addEventListener('click', () => {
    let word = search.value.trim().toLowerCase();
    let filtered = products.filter(p => p.title.toLowerCase().includes(word));
    show(filtered);
});

price_sort.addEventListener('change', () => {
    let sorted = [...products];
    if (price_sort.value === 'low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (price_sort.value === 'high') {
        sorted.sort((a, b) => b.price - a.price);
    }
    show(sorted);
});

function findLocation() {
    let where = document.getElementById('locationDisplay');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            where.innerText = `lat: ${pos.coords.latitude}, lng: ${pos.coords.longitude}`;
        }, 
        function () {where.innerText = "Can't get location.";});
    } else {
        where.innerText = "Browser doesn't support location.";
    }
}


const form = document.getElementById('form');
const msg = document.getElementById('formStatus');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.elements['username'].value.trim();
    const product = form.elements['product'].value.trim();
    if (name && product) {
        localStorage.setItem('u_name', name);
        localStorage.setItem('usr_p', product);
        msg.textContent = "Thanks for your message!";
        form.reset();
    } else {
        msg.textContent = "Please fill all fields.";
    }
});
window.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('u_name');
    const product = localStorage.getItem('usr_p');
    if (name && product) {
        const greet = document.getElementById('greetMsg');
        if (greet) {
            greet.textContent = `Welcome back, ${name}! You were interested in ${product}.`;
            greet.classList.remove('hidden');
        }
    }
    fetchProducts();
});
