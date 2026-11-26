import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        creme: "hsl(var(--creme))",
        papel: "hsl(var(--papel))",
        choco: "hsl(var(--choco))",
        laranja: "hsl(var(--laranja))",
        vermelho: "hsl(var(--vermelho))",
        amarelo: "hsl(var(--amarelo))",
        verde: "hsl(var(--verde))",
        pastel: "hsl(var(--pastel))",
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
