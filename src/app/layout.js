import { Rubik_Mono_One, Roboto} from "next/font/google";
import "./globals.css";
import { Header } from "../../components/Header/Header";

const roboto= Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: "--font-roboto",
});
const rubik = Rubik_Mono_One({
  subsets: ["latin"],
  display: "swap",
  weight: ['400'],
  variable: "--font-rubik",
});


export const metadata = {
  title: "Vudka.shop",
  description: "Vudka.shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={`${rubik.variable} ${roboto.variable}`}>
        <main>
          <header>
            <Header />
          </header>
          {children}
          <footer></footer>
        </main>
      </body>
    </html>
  );
}
