// Obtener referencias a los elementos del DOM
const pages = document.querySelectorAll('.page');
const cartCount = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart-container');
const cartTotal = document.getElementById('cart-total');
const cartSummary = document.getElementById('cart-summary');
const emptyCartMessage = document.getElementById('empty-cart-message');

// Recuperar el carrito del almacenamiento local o inicializarlo como un array vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Lista de productos disponibles
const products = [
    { id: 1, name: 'Iphone 11', price: 195.00, img: 'https://www.donnyb.ca/files/image/attachment/4079/preview_iphone_11_256GB_Purple.jpg' },
    { id: 2, name: 'PlayStation 5', price: 565.00, img: 'https://store.ee.co.uk/images/product/uni2/DigitalContent/hh/HHCW_310DBE5B-6DF5-4809-B8F8-62F7024FAF62_large.jpg' },
    { id: 3, name: 'Apple Watch Series 5', price: 85.99, img: 'https://images-na.ssl-images-amazon.com/images/I/71kw4xDLrPL._SS400_.jpg' },
    { id: 4, name: 'MacBook Air 13', price: 2279.99, img: 'https://bitlogic.ec/wp-content/uploads/2025/05/Macbook-Air-15_-400x400.png' }
];

// Función para mostrar la página correcta según el ID
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Función para actualizar la visualización del carrito
function updateCart() {
    cartCount.textContent = cart.length;
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartSummary.classList.add('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');
        cartSummary.classList.remove('hidden');
        cart.forEach(item => {
            total += item.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4';
            cartItem.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.img}" alt="${item.name}" class="w-16 h-16 rounded-md">
                    <div>
                        <h3 class="font-bold text-gray-900">${item.name}</h3>
                        <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button class="text-red-500 hover:text-red-700 transition duration-300" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    cartTotal.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Añadir eventos a los botones de eliminar después de renderizar el carrito
    document.querySelectorAll('#cart-container button').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Manejar el evento de clic en los botones de "Añadir al Carrito"
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            cart.push(productToAdd);
            updateCart();
        }
    });
});

// Manejar el evento de clic en la imagen del primer producto
document.getElementById('prod-img-1').addEventListener('click', (e) => {
    const newImage = 'https://store.ee.co.uk/images/product/uni2/DigitalContent/hh/HHCW_310DBE5B-6DF5-4809-B8F8-62F7024FAF62_large.jpg';
    e.currentTarget.src = newImage;
});

// Manejar el envío del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos, por ejemplo, a una API.
    console.log('Formulario enviado:', new FormData(e.target));
    // Mostrar un mensaje de éxito sin usar alert
    const successMessage = document.createElement('div');
    successMessage.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center';
    successMessage.textContent = '¡Mensaje enviado con éxito!';
    e.target.parentNode.appendChild(successMessage);
    e.target.reset();
});

// Inicializar la página al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
    updateCart();
});
