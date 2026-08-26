const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'pages/workshops.html',
    'pages/products.html',
    'pages/about.html',
    'pages/checkout.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove GALLERY link
    // It could be 'gallery.html' or 'pages/gallery.html' depending on the file location
    content = content.replace(/<a[^>]*href="[^"]*gallery\.html"[^>]*>GALLERY<\/a>\s*/g, '');

    // 2. Ensure CART link is present
    // Check if CART link exists
    if (!content.includes('id="cart-count"')) {
        // Find the REQUEST QUOTE button to insert before it
        // The path to checkout.html depends on if we are in root or pages/
        const isRoot = file === 'index.html';
        const checkoutPath = isRoot ? 'pages/checkout.html' : 'checkout.html';
        const cartLink = `<a href="${checkoutPath}" class="nav-link">CART (<span id="cart-count">0</span>)</a>\n        `;
        
        // Find the REQUEST QUOTE line
        content = content.replace(/(<a[^>]*href="[^"]*#contact"[^>]*>REQUEST QUOTE<\/a>)/g, cartLink + '$1');
    }

    fs.writeFileSync(file, content);
});
console.log('Navigation updated in all files.');
