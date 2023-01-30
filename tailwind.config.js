/** @type {import('tailwindcss').Config} */

const darkThemeColors = {
  bgPrimary: '#000000',
  bgTertiary: '#27272A',
  bgSecondary: '#18181B',
  bgQuarternary: '#3F3F46',
  bgAccent: '#FFD121',
  textSecondary: '#FFFFFFa3',
  textPrimary: '#FFFFFF',
  textTertiary: 'rgba(255, 255, 255, 0.4)',
  textQuarternary: '#FFFFFF33',
  textBlack: '#000000',
  textError: '#EF4444',
  textAccent: '#FFD121',
  borderPrimary: '#FFFFFF',
  borderSecondary: '#FFFFFFA3',
  borderQuarternary: '#FFFFFF33',
  borderTertiary: '#FFFFFF66',
  iconPrimary: '#FFFFFF',
  iconTertiary: '#A3A3A3',
  iconSecondary: '#FFFFFFa3',
  hcPaletteYellow500: '#FFD121',
  hcPaletteGray300: '#FFFFFF',
  hcPaletteGray200: '#FFFFFF14',
  hcPaletteGray100: '#FFFFFF0A',
  twPaletteGray400: '#9CA3AF',
  twPaletteZinc700: '#3F3F46',
  bgOutlineHover: 'rgba(161, 161, 170, 0.08)',
  bgButtonHover: '#52525B',
  bgHeader: 'rgba(0,0,0,0.9)',
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'sans-serif',
        ],
        mark: ['MarkPro'],
        markHeavy: ['MarkPro-Heavy'],
      },
      borderRadius: {
        sm: '4px',
      },
      colors: darkThemeColors,
      maxWidth: {
        containerMedium: '1024px',
      },
      boxShadow: {
        itemCard: '0px 20px 40px rgba(0, 0, 0, 0.16)',
      },
      gridTemplateColumns: {
        itemDetailActivity: '16.5% 45.75% 15.86% 21.86%',
        itemDetailActivityMobile: '51.2% 24.39% 24.39%',
        searchDetailFilterOff: '56px 1fr',
        searchDetailFilterOn: '320px 1fr',
        searchDetailItemSM: 'repeat(auto-fill, minmax(150px, 1fr))',
        searchDetailItemMD: 'repeat(auto-fill, minmax(230px, 1fr))',
        searchDetailItemLG: 'repeat(auto-fill, minmax(280px, 1fr))',
        defaultItemSM: 'repeat(auto-fill, minmax(328px, 1fr))',
        defaultItemMD: 'repeat(auto-fill, minmax(360px, 1fr))',
        defaultItemLG: 'repeat(auto-fill, minmax(280px, 1fr))',
        profileCollection: 'repeat(auto-fill, minmax(300px, 1fr))',
        profileCollectionLarge: 'repeat(auto-fill, minmax(400px, 1fr))',
      },
      keyframes: {
        blinking: {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '0.5',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'text-blink': 'blinking 1s linear infinite',
      },
      screens: {
        '3xl': '1440px',
        '4xl': '1600px',
        '5xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
  ],
}
