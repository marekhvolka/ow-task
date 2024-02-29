import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      fontFamily: {
        sans: ["var(--font-outfit)", ...fontFamily.sans],
      },
      colors: {
        mainColor: "#006a87",
      }
    },
  },
  plugins: [],
} satisfies Config;
