import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
        aps: ['APS-DV-Prakash', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // Indian Ancient Theme Colors
        indian: {
          gold: 'var(--indian-gold)',
          red: 'var(--indian-red)',
          orange: 'var(--indian-orange)',
          yellow: 'var(--indian-yellow)',
          green: 'var(--indian-green)',
          blue: 'var(--indian-blue)',
          purple: 'var(--indian-purple)',
          brown: 'var(--indian-brown)',
          dark: 'var(--indian-dark)',
          darker: 'var(--indian-darker)',
          light: 'var(--indian-light)',
          bronze: 'var(--indian-bronze)',
          copper: 'var(--indian-copper)',
          silver: 'var(--indian-silver)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'spin-slow': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(360deg)' },
        },
        'ancient-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
          },
        },
        'ancient-spin': {
          '0%': {
            transform: 'rotate(0deg)',
            borderTopColor: 'var(--indian-gold)',
          },
          '25%': {
            borderTopColor: 'var(--indian-yellow)',
          },
          '50%': {
            borderTopColor: 'var(--indian-orange)',
          },
          '75%': {
            borderTopColor: 'var(--indian-red)',
          },
          '100%': {
            transform: 'rotate(360deg)',
            borderTopColor: 'var(--indian-gold)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin-slow 2s ease-in-out infinite',
        'ancient-pulse': 'ancient-pulse 3s ease-in-out infinite',
        'ancient-spin': 'ancient-spin 1s linear infinite',
      },
      backgroundImage: {
        'ancient-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(212, 175, 55, 0.03) 2px, rgba(212, 175, 55, 0.03) 4px)',
        'ancient-gradient': 'linear-gradient(135deg, var(--indian-darker) 0%, var(--indian-dark) 100%)',
        'ancient-card': 'linear-gradient(145deg, rgba(26, 15, 15, 0.95) 0%, rgba(15, 8, 8, 0.98) 100%)',
        'ancient-button': 'linear-gradient(145deg, var(--indian-gold) 0%, var(--indian-yellow) 50%, var(--indian-gold) 100%)',
        'ancient-title': 'linear-gradient(45deg, var(--indian-gold) 0%, var(--indian-yellow) 25%, var(--indian-orange) 50%, var(--indian-yellow) 75%, var(--indian-gold) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
