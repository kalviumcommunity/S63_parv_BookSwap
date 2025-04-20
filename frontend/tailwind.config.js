/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in src
  ],
  theme: {
    extend: {
      // --- Add Your Custom Theme ---
      colors: {
         // Use names that make sense for your design
        'brand-brown': '#5C3A21', // Example: Dark brown for logo/hovers
        'link-text': '#4A4A4A',      // Example: Dark grey/brown for links
        'button-bg': '#A08C7D',      // Example: Medium brown button bg
        'button-bg-hover': '#8a7465', // Example: Darker button hover
        'navbar-bg': '#FAF7F0',      // Example: Light beige navbar bg
        'border-blue': '#3b82f6',    // Example: Tailwind's blue-500 (Adjust!)
        // Add other custom colors from Figma here
      },
      fontFamily: {
         // Ensure you import these fonts (e.g., in index.html)
        'serif': ['Merriweather', 'serif'], // Example serif
        'sans': ['"Nunito Sans"', 'sans-serif'], // Example sans-serif (quote if name has space)
        // Add other custom fonts here
      }
    },
  },
  plugins: [],
}