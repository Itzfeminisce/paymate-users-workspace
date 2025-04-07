
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			  // Add backdrop utilities
			  backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
				'3xl': '32px',
			  },
			  backdropBrightness: {
				0: '0',
				25: '.25',
				50: '.5',
				75: '.75',
				90: '.9',
				95: '.95',
				100: '1',
				105: '1.05',
				110: '1.1',
				125: '1.25',
				150: '1.5',
				200: '2',
			  },
			  backdropContrast: {
				0: '0',
				50: '.5',
				75: '.75',
				100: '1',
				125: '1.25',
				150: '1.5',
				200: '2',
			  },
			  backdropGrayscale: {
				0: '0',
				50: '.5',
				100: '1',
			  },
			  backdropHueRotate: {
				0: '0deg',
				15: '15deg',
				30: '30deg',
				60: '60deg',
				90: '90deg',
				180: '180deg',
			  },
			  backdropInvert: {
				0: '0',
				100: '1',
			  },
			  backdropOpacity: {
				0: '0',
				25: '0.25',
				50: '0.5',
				75: '0.75',
				100: '1',
			  },
			  backdropSaturate: {
				0: '0',
				50: '.5',
				100: '1',
				150: '1.5',
				200: '2',
			  },
			  backdropSepia: {
				0: '0',
				50: '.5',
				100: '1',
			  },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
				mono: ['SF Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'fade-down': 'fade-down 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
			},
			boxShadow: {
				'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
