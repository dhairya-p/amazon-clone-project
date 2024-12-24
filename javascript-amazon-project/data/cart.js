export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
    quantity: 1
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
    quantity: 2
}];

export function addToCart(productId) {
    const matchingItem = cart.find((cartItem) => productId === cartItem.productId);

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1
        });
    }
}


export function removeFromCart(productId) {
    const itemIndex = cart.findIndex((cartItem) => 
        productId === cartItem.productId
    );

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
}