# Drone Veda Website

> **Intelligence in Every Flight.**

This repository contains the front-end codebase for the official **Drone Veda** website. Drone Veda operates at the intersection of advanced aerial robotics and aerospace education, engineering bespoke UAV systems and providing institutional robotics training.

## Tech Stack

The website is built with a lightweight, dependency-free architecture focusing on performance, responsive design, and cutting-edge aesthetics:
* **HTML5**: Semantic document structure.
* **CSS3**: Custom properties (variables), modern layouts (Grid/Flexbox), dark-themed glassmorphism UI, and scroll-reveal micro-animations.
* **Vanilla JavaScript**: Lightweight DOM manipulation, intersection observers for scroll animations, and mobile navigation toggling.
* **Firebase**: Used for backend integration (e.g., contact form submissions).

## Project Structure

```
.
├── assets/
│   ├── css/          # Core stylesheets and animations (style.css)
│   ├── js/           # Scripts for UI interactions and Firebase logic
│   └── img/          # Site graphics, logos, and gallery images
├── pages/            # Inner pages (Workshops, Products, About, Checkout, etc.)
├── index.html        # Main landing page
└── firebase.json     # Firebase deployment and hosting configuration
```

## Running Locally

Since the project uses Vanilla HTML/CSS/JS, no complex build tools are required. 

To run the site locally:
1. Clone the repository.
2. Open `index.html` in your web browser. 
3. *Alternatively*, for the best development experience with live reloading, use a local server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code or run:
   ```bash
   npx serve .
   ```

## Contact

* **Operations Site**: Navi Mumbai, Maharashtra, India
* **Inquiries**: +91 6383445994

---
&copy; 2026 Drone Veda Technologies (OPC) Private Limited. All rights reserved.
