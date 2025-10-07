import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BackTop from "../components/BackTop/BackTop";

const montserrat = localFont({
src: [
  {
    path: "../../public/fonts/Montserrat-Regular.ttf",
    weight: "400",
    style: "normal",
  },
  {
    path: "../../public/fonts/Montserrat-Bold.ttf",
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
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className={montserrat.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
          {children}
        <Footer />
        <BackTop />
      </body>
    </html>
  );
}
