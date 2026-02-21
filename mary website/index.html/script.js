// Simple cart functionality
let cart = [];

function addToCart(productElement) {
    const cartItems = document.getElementById('cart-items');
    const clonedProduct = productElement.cloneNode(true);
    clonedProduct.querySelector('button').remove(); // Remove add to cart button
    cartItems.appendChild(clonedProduct);
    productElement.style.display = 'none'; // Hide from products
    updateCart();
}

function updateCart() {
    // Update cart array if needed
    console.log('Cart updated');
}

function purchase() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
    }
    const cartItems = document.getElementById('cart-items');
    const products = cartItems.querySelectorAll('.product');
    let orderList = '';
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent;
        const price = product.querySelector('p').textContent;
        orderList += `${productName} - ${price}, `;
    });
    orderList = orderList.slice(0, -2); // Remove last comma
    const orderDetails = `Name: ${name}\nOrder: ${orderList}\nNumber: ${phone}`;
    const subject = 'New Order from Dr Mary Sabry Website';
    const body = encodeURIComponent(orderDetails);
    window.location.href = `mailto:pivoonessim@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    alert('Thank you for ordering! We will be calling you soon.');
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach((button) => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            addToCart(product);
        });
    });

    // Search functionality
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const name = product.querySelector('h3').textContent.toLowerCase();
            if (name.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Purchase button
    const purchaseBtn = document.getElementById('purchase-btn');
    purchaseBtn.addEventListener('click', purchase);
});