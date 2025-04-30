const CART_KEY = 'rwady-cart';
export function getCartFromStorage() {
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
}

export function saveCartToStorage(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

export function clearCartFromStorage() {
    try {
        localStorage.removeItem(CART_KEY);
    } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
    }
}
