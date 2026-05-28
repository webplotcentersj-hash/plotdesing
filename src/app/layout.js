// layout.js
import { Outfit, Fira_Code } from "next/font/google";
import { AppLayout } from "@/components/AppLayout";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Plot φ — Consola Operativa Corporativa | Plot Center SRL",
  description: "Plataforma de misiones creativas para clientes, profesionales y directores de Plot Center SRL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.variable} ${firaCode.variable}`}>
      <head>
        <meta name="theme-color" content="#040508" />
      </head>
      <body>
        {/* Deep tech glowing background meshes */}
        <div className="bg-mesh">
          <div className="bg-blob bg-blob-orange" />
          <div className="bg-blob bg-blob-purple" />
        </div>
        
        {/* Render pages wrapped inside high-fidelity desktop AppLayout */}
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
