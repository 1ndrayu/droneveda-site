const fs = require('fs');

// 1. Fix URL encoding in workshops.html
let ws = fs.readFileSync('pages/workshops.html', 'utf8');
ws = ws.replace('product=Beginner Build & Fly Workshop', 'product=Beginner%20Build%20%26%20Fly%20Workshop');
ws = ws.replace('product=Intermediate Tune & Control Workshop', 'product=Intermediate%20Tune%20%26%20Control%20Workshop');
ws = ws.replace('product=Autonomous UAVs Workshop', 'product=Autonomous%20UAVs%20Workshop');
// Also fix bottom navigation text in workshops.html
ws = ws.replace('NEXT: CUSTOM BUILDS &rarr;', 'NEXT: PRODUCTS &rarr;');
// And make sure it points to products.html
fs.writeFileSync('pages/workshops.html', ws);

// 2. Fix bottom navigation in index.html
// index.html points to workshops.html, this is fine.

// 3. Fix bottom navigation in products.html
let pr = fs.readFileSync('pages/products.html', 'utf8');
// Should point to about.html and say NEXT: ABOUT
pr = pr.replace('href="../index.html#gallery" class="btn" style="background: transparent; border: 1px solid var(--border-color);">NEXT:\n          GALLERY &rarr;</a>', 
    'href="about.html" class="btn" style="background: transparent; border: 1px solid var(--border-color);">NEXT: ABOUT &rarr;</a>');
pr = pr.replace('href="gallery.html" class="btn" style="background: transparent; border: 1px solid var(--border-color);">NEXT:\n          GALLERY &rarr;</a>', 
    'href="about.html" class="btn" style="background: transparent; border: 1px solid var(--border-color);">NEXT: ABOUT &rarr;</a>');

fs.writeFileSync('pages/products.html', pr);

// 4. Fix bottom navigation in about.html
let ab = fs.readFileSync('pages/about.html', 'utf8');
// Should point to products.html and say PREV: PRODUCTS
ab = ab.replace('href="../index.html#gallery" class="btn"\n          style="background: transparent; border: 1px solid var(--border-color);">&larr; PREV: GALLERY</a>',
    'href="products.html" class="btn"\n          style="background: transparent; border: 1px solid var(--border-color);">&larr; PREV: PRODUCTS</a>');
ab = ab.replace('href="gallery.html" class="btn"\n          style="background: transparent; border: 1px solid var(--border-color);">&larr; PREV: GALLERY</a>',
    'href="products.html" class="btn"\n          style="background: transparent; border: 1px solid var(--border-color);">&larr; PREV: PRODUCTS</a>');

fs.writeFileSync('pages/about.html', ab);

console.log("Fixed navigation buttons");
