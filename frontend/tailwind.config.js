/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FFD050",
				secondary: "#232536",
				purple: '#592ea9',
				lightGray: '#6d6e76',
				lightPurple: '#f4f0f8',
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
