/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Integral", "sans-serif"],
                robo: ["Roboto Slab", "serif"],
                dance: ["Dancing Script", "cursive"],
            },
        },
    },
    plugins: [],
};
