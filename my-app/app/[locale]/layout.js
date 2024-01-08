import './globals.scss';
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Montserrat, Days_One, Montserrat_Alternates } from "next/font/google";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";


export const mons = Montserrat({ subsets: ["cyrillic"] });
export const monsA = Montserrat_Alternates({
  subsets: ["cyrillic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const daysOne = Days_One({
  subsets: ["latin"],
  weight: "400",
});

const locales = ["en", "ua"];


export default function RootLayout({ children, params}) {
  
  const isValidLocale = locales.some((cur) => cur === params.locale);
  if (!isValidLocale) notFound();
  
  return (
    <html lang={params.locale}>
      <body className={mons.className}>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
