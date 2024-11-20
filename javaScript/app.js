// Variables
const cart = [];
const cartButton = document.getElementById('cartBtn');
const cartModal = document.getElementById('cart');
const checkoutButton = document.getElementById('checkoutBtn');
const cartItemsList = document.getElementById('cartItems');

// Actualizar el contador del carrito
function updateCartCount() {
    cartButton.textContent = `Ver Carrito (${cart.length})`;
}

// Agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productElement = this.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = productElement.querySelector('p').textContent.replace('$', '');

        const product = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice)
        };

        console.log('Producto agregado:', product); // Para verificar que el producto se agregue correctamente

        // Agregar el producto al carrito
        cart.push(product);
        updateCartCount();
    });
});


// Ver carrito
cartButton.addEventListener('click', function () {
    console.log('Abriendo/cerrando el carrito');
    cartModal.classList.toggle('hidden');
    displayCart();
});


// Mostrar productos en el carrito
function displayCart() {
    cartItemsList.innerHTML = ''; // Limpiar la lista de productos cada vez que se muestra
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
        total += item.price; // Sumar al total
    });
    // Añadir una fila con el total
    const totalLi = document.createElement('li');
    totalLi.textContent = `Total: $${total.toFixed(2)}`;
    cartItemsList.appendChild(totalLi);
}

// Ver el producto final (pago)
checkoutButton.addEventListener('click', function () {
    let total = 0;
    cart.forEach(item => total += item.price);
    alert(`El total de tu compra es: $${total.toFixed(2)}`);
    cart.length = 0; // Vaciar carrito
    updateCartCount();
    cartModal.classList.add('hidden'); // Cerrar el carrito
});
