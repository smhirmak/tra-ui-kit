/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        // input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        /* Custom Color Start */
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          soft: 'hsl(var(--primary-soft))',
          focused: 'hsl(var(--primary-focused))',
          foreground: 'hsl(var(--primary-foreground))',
          5: 'hsl(var(--primary-5))',
          15: 'hsl(var(--primary-15))',
          30: 'hsl(var(--primary-30))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          light: 'hsl(var(--secondary-light))',
        },
        tetriary: {
          DEFAULT: 'hsl(var(--tetriary))',
          foreground: 'hsl(var(--tetriary-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
          light: 'hsl(var(--error-light))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          light: 'hsl(var(--success-light))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          light: 'hsl(var(--warning-light))',
        },
        input: {
          DEFAULT: 'hsl(var(--input))',
          hover: 'hsl(var(--input-soft))',
          light: 'hsl(var(--input-light))',
          focused: 'hsl(var(--input-focused))',
          fill: 'hsl(var(--input-fill))',
        },
        neutral: {
          DEFAULT: 'hsl(var(--neutral))',
          light: 'hsl(var(--neutral-light))',
          black: 'hsl(var(--neutral-black))',
          'light-black': 'hsl(var(--neutral-light-black))',
          grey: 'hsl(var(--neutral-grey))',
          'disabled-text': 'hsl(var(--neutral-disabled-text))',
          white: 'hsl(var(--neutral-white))',
          'dark-white': 'hsl(var(--neutral-dark-white))',
        },
        disabled: {
          DEFAULT: 'hsl(var(--disabled))',
          dark: 'hsl(var(--disabled-dark))',
          'light-dark': 'hsl(var(--disabled-light-dark))',
          light: 'hsl(var(--disabled-light))',
        },
        button: {
          disabled: 'hsl(var(--button-disabled))',
          'disabled-text': 'hsl(var(--button-disabled-text))',
          text: 'hsl(var(--button-text))',
        },
        background: 'hsl(var(--background))',
      },
      height: {
        13: '3.25rem',
        15: '3.75rem',
      },
      minHeight: {
        13: '3.25rem',
        15: '3.75rem',
      },
      width: {
        13: '3.25rem',
        15: '3.75rem',
      },
      boxShadow: {
        'input-hover': '0 0 20px 0 hsl(var(--primary-soft))',
        'input-focus': '0 0 20px 0 hsl(var(--input-focused))',
        'soft-grey': '0px 0px 20px 0px hsl(var(--neutral-soft-grey))',
        'soft-primary': '0px 0px 20px 0px hsl(var(--primary-soft))',
        'hard-grey': '0px 0px 20px 0px hsl(var(--neutral-hard-grey))',
        'hard-primary': '0px 0px 20px 0px hsl(var(--primary-hard))',
      },
      transitionProperty: {
        'font-size': 'font-size',
        height: 'height',
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2.5rem',
        '5xl': '3.125rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'linear-loader': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'linear-progress': {
          '0%': { width: '100%' },
          '100%': { width: '0' },
        },
        bounceInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '1', transform: 'translateX(-5%)' },
          '70%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceOutRight: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5%)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        bounceInLeft: {
          '0%': { opacity: '0', transform: 'translateX(0%)' },
          '50%': { opacity: '1', transform: 'translateX(5%)' },
          '70%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        bounceOutLeft: {
          '0%': { transform: 'translateX(0%)' },
          '20%': { transform: 'translateX(5%)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(100%)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(-100%)' },
        },
        flipIn: {
          '0%': { transform: 'rotateX(-90deg)', opacity: '0' },
          '40%': { transform: 'rotateX(45deg)', opacity: '1' },
          '60%': { transform: 'rotateX(-20deg)' },
          '80%': { transform: 'rotateX(20deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        flipOut: {
          '0%': { transform: 'rotateX(0deg)', opacity: '1' },
          '20%': { transform: 'rotateX(-45deg)' },
          '40%': { transform: 'rotateX(20deg)' },
          '60%': { transform: 'rotateX(-20deg)' },
          '100%': { transform: 'rotateX(90deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'linear-loader': 'linear-loader 2s infinite',
        'linear-progress': 'linear-progress linear',
        'bounce-in-right': 'bounceInRight 0.5s forwards',
        'bounce-out-right': 'bounceOutRight 0.5s forwards',
        'bounce-in-left': 'bounceInLeft 0.5s forwards',
        'bounce-out-left': 'bounceOutLeft 0.5s forwards',
        'slide-in-right': 'slideInRight 0.5s linear',
        'slide-out-right': 'slideOutRight 0.5s linear',
        'slide-in-left': 'slideInLeft 0.5s linear',
        'slide-out-left': 'slideOutLeft 0.5s linear',
        'flip-in': 'flipIn 0.7s forwards',
        'flip-out': 'flipOut 0.7s forwards',
      },
      content: {
        required: "'*'",
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        99: '99',
        9998: '9998',
        9999: '9999',
      },
    },
  },
  // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
};
