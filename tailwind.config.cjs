/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xl': {'max': '1920px'},      // Desktop HD
      'lg': {'max': '1440px'},      // Desktop
      'md': {'max': '1280px'},      // Laptop
      'sm': {'max': '1024px'},      // Tablet landscape (including iPad Air)
      'xsm': {'max': '768px'},      // Tablet portrait
      'xxsm': {'max': '640px'},     // Large mobile landscape (e.g., iPhone 6/7/8 Plus)
      'xxxsm': {'max': '480px'},    // Mobile landscape (e.g., iPhone 6/7/8)
      'xxxxsm': {'max': '414px'},   // Mobile portrait (e.g., iPhone X/XS/11 Pro)
      'xxxxxsm': {'max': '375px'},  // Small mobile landscape (e.g., iPhone 5/SE)
      'xxxxxxsm': {'max': '320px'}, // Very small mobile (e.g., iPhone 4)
    }
  },
  plugins: [],
}
