/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                glow: '0 0 15px rgba(59, 130, 246, 0.3)',
            },
            colors: {
                bg: "var(--color-bg)",
                card: "var(--color-card)",
                border: "var(--color-border)",
                text: "var(--color-text)",
                accent: "var(--color-accent)",
                accentHover: "var(--color-accent-hover)",
            },
        },
    },
    plugins: [],
};