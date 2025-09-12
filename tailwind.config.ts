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
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: {
					DEFAULT: 'hsl(var(--border))',
					light: 'hsl(var(--border-light))',
					dark: 'hsl(var(--border-dark))'
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))',
					light: 'hsl(var(--primary-light))',
					lighter: 'hsl(var(--primary-lighter))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-hover))',
					light: 'hsl(var(--secondary-light))',
					dark: 'hsl(var(--secondary-dark))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					light: 'hsl(var(--muted-light))',
					dark: 'hsl(var(--muted-dark))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))',
					light: 'hsl(var(--accent-light))',
					lighter: 'hsl(var(--accent-lighter))',
					dark: 'hsl(var(--accent-dark))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				footer: {
					bg: 'hsl(var(--footer-bg))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-mesh': 'var(--gradient-mesh)',
				'gradient-cream': 'var(--gradient-cream)',
				'warm-gradient': 'var(--gradient-primary)',
				'hero-gradient': 'var(--gradient-hero)',
				'accent-gradient': 'var(--gradient-accent)',
				'subtle-gradient': 'var(--gradient-subtle)',
			},
			boxShadow: {
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)',
				'inner': 'var(--shadow-inner)',
				'glow': 'var(--shadow-glow)',
				'glow-primary': 'var(--shadow-glow-primary)',
				'card': 'var(--shadow-md)',
				'gentle': 'var(--shadow-sm)',
				'accent': 'var(--shadow-glow)',
			},
			borderRadius: {
				'xs': 'var(--radius-xs)',
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				DEFAULT: 'var(--radius)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'3xl': 'var(--radius-3xl)',
				'full': 'var(--radius-full)'
			},
			spacing: {
				'px': 'var(--spacing-px)',
				'0': 'var(--spacing-0)',
				'1': 'var(--spacing-1)',
				'2': 'var(--spacing-2)',
				'3': 'var(--spacing-3)',
				'4': 'var(--spacing-4)',
				'5': 'var(--spacing-5)',
				'6': 'var(--spacing-6)',
				'8': 'var(--spacing-8)',
				'10': 'var(--spacing-10)',
				'12': 'var(--spacing-12)',
				'16': 'var(--spacing-16)',
				'20': 'var(--spacing-20)',
				'24': 'var(--spacing-24)',
				'32': 'var(--spacing-32)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in-delayed': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
				'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-down': 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-left': 'slideLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-right': 'slideRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce-gentle': 'bounceGentle 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'rotate-slow': 'rotate-slow 8s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
