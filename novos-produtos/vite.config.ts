import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Gera uma página por produto: PRODUTO=canetinha ou PRODUTO=lanches
const produto = process.env.PRODUTO || "canetinha";
const meta: Record<string, { title: string; description: string }> = {
  canetinha: {
    title: "Pouca Comida, Muita Proteína — receitas em porções pequenas",
    description: "Receitas em porções pequenas, leves no estômago, com os gramas de proteína calculados em cada uma.",
  },
  lanches: {
    title: "Lanches Saudáveis para a Semana — faça no domingo, coma a semana toda",
    description: "Lanches de forno, de pote e de lancheira, prontos para a semana e com opção de congelar.",
  },
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: "meta-do-produto",
      transformIndexHtml: (html) =>
        html.replace(/%TITLE%/g, meta[produto].title).replace(/%DESCRIPTION%/g, meta[produto].description),
    },
  ],
  define: { "import.meta.env.PRODUTO": JSON.stringify(produto) },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  base: "./",
  build: { outDir: `dist/${produto}`, emptyOutDir: true },
});
