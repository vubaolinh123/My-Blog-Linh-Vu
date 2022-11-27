/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                base: "8px",
                baseXl: "12px",
              },
        },
    },
    plugins: [require("daisyui")],
};
