const addToCartButtons = document.querySelectorAll('.add-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {

        const productElement = button.closest('.product');
        const productName = productElement.querySelector('.info h3').textContent;
        const productPrice = parseFloat(
            productElement.querySelector('.info span:first-of-type').textContent.replace('$', '')
        );

        const product = {
            id: index + 1,
            name: productName,
            price: productPrice,
        };

        const existingProduct = cart.find(item => item.id === product.id);
        if (!existingProduct) {
            cart.push(product);
            alert(`${productName} has been added to your cart.`);
        } else {
            alert(`${productName} is already in your cart.`);
        }

        updateCartStorage();
        displayCartItems();
    });
});

function displayCartItems() {
    const existingCartContainer = document.querySelector('.cart-container');
    if (existingCartContainer) {
        existingCartContainer.remove();
    }

    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    document.body.appendChild(cartContainer);

    const cartList = document.createElement('ul');
    cartContainer.innerHTML = '<h2>Your Cart</h2>';
    cartContainer.appendChild(cartList);

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem.id !== item.id);
            updateCartStorage();
            displayCartItems();
        });

        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
    });

    
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalPriceElement);
}


window.addEventListener('DOMContentLoaded', displayCartItems);
