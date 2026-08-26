import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKsJXVOIS3yCUxBQ_eij4z7FSYjNvvckY",
  authDomain: "droneveda-web.firebaseapp.com",
  projectId: "droneveda-web",
  storageBucket: "droneveda-web.firebasestorage.app",
  messagingSenderId: "35082820434",
  appId: "1:35082820434:web:dfec2fdc8aaf482a5a788b",
  measurementId: "G-ZXKEMNYE5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
