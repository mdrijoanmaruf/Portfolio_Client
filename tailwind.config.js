/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      minWidth: {
        '120': '120px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-reverse': 'spin 1s linear infinite reverse',
        'loading-bar': 'loadingBar 2s ease-in-out infinite',
        'float-1': 'float1 3s ease-in-out infinite',
        'float-2': 'float2 2.5s ease-in-out infinite',
        'float-3': 'float3 3.5s ease-in-out infinite',
        'float-4': 'float4 2.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        loadingBar: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        float1: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.7' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.6' },
          '50%': { transform: 'translateY(-15px) translateX(-8px)', opacity: '1' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.8' },
          '50%': { transform: 'translateY(18px) translateX(12px)', opacity: '1' },
        },
        float4: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.7' },
          '50%': { transform: 'translateY(15px) translateX(-10px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
