// Cart functionality using LocalStorage

let cart = JSON.parse(localStorage.getItem('droneveda_cart')) || [];

// Function to update cart badge in the navbar
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = totalItems;
    }
    
    updateFloatingCart(totalItems);
}

// Function to manage floating cart button
function updateFloatingCart(totalItems) {
    let fab = document.getElementById('floating-cart-btn');

    if (totalItems > 0) {
        if (!fab) {
            fab = document.createElement('a');
            fab.id = 'floating-cart-btn';
            fab.href = '/pages/checkout.html';
            
            fab.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span id="floating-cart-count" style="position: absolute; top: -2px; right: -2px; background: var(--logo-green, #00C853); color: white; border-radius: 50%; min-width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold; border: 2px solid #111;">${totalItems}</span>
            `;
            
            Object.assign(fab.style, {
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                zIndex: '9998',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s',
                transform: 'scale(0)',
                opacity: '0',
                textDecoration: 'none'
            });

            fab.onmouseover = () => { fab.style.transform = 'scale(1.1)'; };
            fab.onmouseout = () => { fab.style.transform = 'scale(1)'; };

            document.body.appendChild(fab);
            
            setTimeout(() => {
                fab.style.transform = 'scale(1)';
                fab.style.opacity = '1';
            }, 10);
        } else {
            const countElement = document.getElementById('floating-cart-count');
            if (countElement) {
                countElement.innerText = totalItems;
            }
        }
    } else {
        if (fab) {
            fab.style.transform = 'scale(0)';
            fab.style.opacity = '0';
            setTimeout(() => fab.remove(), 300);
        }
    }
}

// Custom Toast Notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.getElementById('cart-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.innerText = message;
    
    // Styling the toast to match design
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '12px 32px',
        borderRadius: '50px',
        fontFamily: 'var(--font-family)',
        fontWeight: '500',
        fontSize: '0.95rem',
        border: 'none',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: '9999',
        opacity: '0',
        transition: 'opacity 0.3s ease-in-out'
    });

    document.body.appendChild(toast);
    
    // Fade in
    setTimeout(() => { toast.style.opacity = '1'; }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Function to update item quantity (handles Add, Remove, and Modify)
function updateQuantity(productName, price, delta) {
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += delta;
        
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
            showToast(productName + " removed from cart.");
        } else if (delta > 0) {
            showToast(productName + " quantity increased.");
        } else {
            showToast(productName + " quantity decreased.");
        }
    } else if (delta > 0) {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
        showToast(productName + " added to cart!");
    }

    localStorage.setItem('droneveda_cart', JSON.stringify(cart));
    updateCartBadge();
    renderAllCartControls();
    
    // If on checkout page, re-render cart
    if (typeof renderCheckoutCart === 'function') {
        renderCheckoutCart();
    }
}

// Function to get quantity of an item in the cart
function getCartItemQuantity(productName) {
    const item = cart.find(i => i.name === productName);
    return item ? item.quantity : 0;
}

// Render dynamic buttons on product pages
function renderAllCartControls() {
    const controls = document.querySelectorAll('.cart-controls');
    controls.forEach(container => {
        const productName = container.getAttribute('data-product');
        const price = parseFloat(container.getAttribute('data-price'));
        const qty = getCartItemQuantity(productName);
        
        if (qty === 0) {
            container.innerHTML = `
                <button onclick="let btn = this; btn.style.transform='scale(0.85)'; setTimeout(() => { btn.style.transform='scale(1)'; setTimeout(() => updateQuantity('${productName}', ${price}, 1), 150); }, 150);" class="btn"
                        style="width: 100% !important; text-align: center; display: block; border: none; cursor: pointer; transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    ADD TO CART
                </button>
            `;
        } else {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; border: 1px solid #fff; width: 100%; min-height: 54px; transition: all 0.3s;">
                    <button onclick="updateQuantity('${productName}', ${price}, -1)" style="flex: 1; height: 100%; min-height: 54px; border: none; border-right: 1px solid #fff; background: transparent; color: #fff; cursor: pointer; font-size: 1.2rem; transition: all 0.3s;" onmouseover="this.style.background='#fff'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#fff';">-</button>
                    <span style="flex: 1; text-align: center; font-family: var(--font-family); font-weight: 700; font-size: 1rem; color: #fff;">${qty}</span>
                    <button onclick="updateQuantity('${productName}', ${price}, 1)" style="flex: 1; height: 100%; min-height: 54px; border: none; border-left: 1px solid #fff; background: transparent; color: #fff; cursor: pointer; font-size: 1.2rem; transition: all 0.3s;" onmouseover="this.style.background='#fff'; this.style.color='#000';" onmouseout="this.style.background='transparent'; this.style.color='#fff';">+</button>
                </div>
            `;
        }
    });
}

// Function to clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('droneveda_cart', JSON.stringify(cart));
    updateCartBadge();
    renderAllCartControls();
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderAllCartControls();
});
