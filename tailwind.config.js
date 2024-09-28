/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
      boxShadow: {
        shape:
          '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)',
      },
      colors: {
        home: '#2565ED',
        primary: '#2188FF',
        secondary: '#023B78',
        section: '#17192D',
        text: '#24292F',
        energy: '#52C41A',
        critic: '#ED3833',
        dark: '#444',
        light: '#fff',
        bg_light: '#D8DFE6',
        bg_dark: '#585454',
      },
      screens: {
        mobile: '0px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px',
      }
    },    
  },
  plugins: [],
};
