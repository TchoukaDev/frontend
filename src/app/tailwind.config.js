// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            p: {
              marginBottom: theme("spacing.2"), // équiv. à mb-2
            },
            a: {
              color: theme("colors.blue3"),
              textDecoration: "none",
              transition: "all 0.2s",
              "&:hover": {
                color: theme("colors.blue.800"),
                textDecoration: "underline",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
