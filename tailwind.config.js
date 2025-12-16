/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Keyframes for animations
      keyframes: {
        // The "Heart" popup animation when double-clicking a post
        'like-heart': {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '15%': { opacity: 1, transform: 'scale(1.2)' },
          '30%': { transform: 'scale(0.95)' },
          '40%, 80%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0)' },
        },
        // Standard Fade In
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        // Standard Zoom In
        'zoom-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      },
      // Registering the animations
      animation: {
        'like-heart': 'like-heart 1.2s ease-in-out forwards',
        'fade-in': 'fade-in 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
      },
    },
  },
  plugins: [
    // If you use the 'tailwindcss-animate' plugin, you can uncomment this:
    // require("tailwindcss-animate"), 
  ],
}