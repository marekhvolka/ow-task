import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", ...fontFamily.sans],
      },
      colors: {
        textColor: "#006a87",
        tertiaryColor: "#ff6e30",
      }
    },
  },
  plugins: [],
} satisfies Config;
