export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart(productId) {
    const matchingItem = cart.find((cartItem) => productId === cartItem.productId);

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage()
}


export function removeFromCart(productId) {
    const itemIndex = cart.findIndex((cartItem) => 
        productId === cartItem.productId
    );

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
    saveToStorage()
}