import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
src: [
  {
    path: "../../public/fonts/Montserrat-Regular.ttf",
    weight: "400",
    style: "normal",
  },
  {
    path: "../../public/fonts/Montserrat-Medium.ttf",
    weight: "700",
    style: "normal",
  },
],
variable: "--font-montserrat",
display: "swap",
});

export const metadata = {
  title: "Farmácia Avena",
  description: "Farmácia Avena - Sua saúde em boas mãos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
