/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#8FBF9F', // verde-claro
          200: '#68a67d', // verde-medio
          300: '#24613b', // verde-oscuro
        },
        accent: {
          100: '#F18F01', // naranja-vivo
          200: '#833500', // marrón-oscuro
        },
        text: {
          100: '#353535', // gris-oscuro
          200: '#5f5f5f', // gris-medio
        },
        bg: {
          100: '#F5ECD7', // crema-claro
          200: '#ebe2cd', // crema-medio
          300: '#c2baa6', // crema-oscuro
        },
      },
      backgroundImage: {
        'fondo-perfil': "url('/Fondos/Fondoperfil.png')",
      },
    },
  },
  plugins: [],
}

