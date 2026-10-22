export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { kid: ['Fredoka', 'Baloo 2', 'Comic Sans MS', 'system-ui', 'sans-serif'] },
      keyframes: {
        pop: { '0%': { transform: 'scale(.8)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
        flame: { '0%,100%': { transform: 'scale(1) rotate(-3deg)' }, '50%': { transform: 'scale(1.15) rotate(3deg)' } },
        shake: { '0%,100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-8px)' }, '75%': { transform: 'translateX(8px)' } },
      },
      animation: { pop: 'pop .25s ease-out', flame: 'flame 1s ease-in-out infinite', shake: 'shake .3s ease-in-out' },
    },
  },
  plugins: [],
}
