import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: "hsl(var(--secondary))",
        cream: "hsl(var(--cream))",
        ink: "hsl(var(--ink))",
        sage: "hsl(var(--sage))",
        forest: "hsl(var(--forest))",
        terracotta: "hsl(var(--terracotta))",
        ochre: "hsl(var(--ochre))",
      },
    },
  },
} satisfies Config;
