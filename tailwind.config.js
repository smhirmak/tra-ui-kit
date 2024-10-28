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
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        /* Custom Color Start */
        'tra-primary': {
          DEFAULT: 'hsl(var(--tra-primary))',
          soft: 'hsl(var(--tra-primary-soft))',
          focused: 'hsl(var(--tra-primary-focused))',
          foreground: 'hsl(var(--tra-primary-foreground))',
          5: 'hsl(var(--tra-primary-5))',
          15: 'hsl(var(--tra-primary-15))',
          30: 'hsl(var(--tra-primary-30))',
        },
        'tra-secondary': {
          DEFAULT: 'hsl(var(--tra-secondary))',
          foreground: 'hsl(var(--tra-secondary-foreground))',
          light: 'hsl(var(--tra-secondary-light))',
        },
        'tra-tetriary': {
          DEFAULT: 'hsl(var(--tra-tetriary))',
          foreground: 'hsl(var(--tra-tetriary-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--tra-error))',
          light: 'hsl(var(--tra-error-light))',
        },
        success: {
          DEFAULT: 'hsl(var(--tra-success))',
          light: 'hsl(var(--tra-success-light))',
        },
        warning: {
          DEFAULT: 'hsl(var(--tra-warning))',
          light: 'hsl(var(--tra-warning-light))',
        },
        'tra-input': {
          DEFAULT: 'hsl(var(--tra-input))',
          hover: 'hsl(var(--tra-input-soft))',
          light: 'hsl(var(--tra-input-light))',
          focused: 'hsl(var(--tra-input-focused))',
          fill: 'hsl(var(--tra-input-fill))',
        },
        'tra-neutral': {
          DEFAULT: 'hsl(var(--tra-neutral))',
          light: 'hsl(var(--tra-neutral-light))',
          black: 'hsl(var(--tra-neutral-black))',
          'light-black': 'hsl(var(--tra-neutral-light-black))',
          grey: 'hsl(var(--tra-neutral-grey))',
          'disabled-text': 'hsl(var(--tra-neutral-disabled-text))',
          white: 'hsl(var(--tra-neutral-white))',
          'dark-white': 'hsl(var(--tra-neutral-dark-white))',
        },
        'tra-disabled': {
          DEFAULT: 'hsl(var(--tra-disabled))',
          dark: 'hsl(var(--tra-disabled-dark))',
          'light-dark': 'hsl(var(--tra-disabled-light-dark))',
          light: 'hsl(var(--tra-disabled-light))',
        },
        'tra-button': {
          disabled: 'hsl(var(--tra-button-disabled))',
          'disabled-text': 'hsl(var(--tra-button-disabled-text))',
          text: 'hsl(var(--tra-button-text))',
        },
        'tra-background': 'hsl(var(--tra-background))',
        /* Custom Color End */

        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))',
        // },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
      },
      height: {
        13: '3.25rem',
        15: '3.75rem',
      },
      width: {
        13: '3.25rem',
        15: '3.75rem',
      },
      boxShadow: {
        'input-hover': '0 0 20px 0 hsl(var(--tra-primary-soft))',
        'input-focus': '0 0 20px 0 hsl(var(--tra-input-focused))',

        // 'input-error': '0 0 0 3px hsl(var(--error))',
        // 'input-success': '0 0 0 3px hsl(var(--success))',
        // 'input-warning': '0 0 0 3px hsl(var(--warning))',
      },
      transitionProperty: {
        'font-size': 'font-size',
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'linear-loader': 'linear-loader 2s infinite',
      },
      content: {
        required: "'*'",
      },
      zIndex: {
        1: '1',
        2: '2',
        9998: '9998',
        9999: '9999',
      },
    },
  },
  // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
};
