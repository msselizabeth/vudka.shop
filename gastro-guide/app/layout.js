import './globals.scss'
import { Montserrat, Days_One, Montserrat_Alternates } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const mons = Montserrat({ subsets: ['cyrillic'] });
export const monsA = Montserrat_Alternates({
  subsets: ["cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const daysOne = Days_One({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Гасторомічний гід",
  description:
    "Гастрономічний гід - путівник в світі кулінарії. Кращі традиції харчування в світі, національні кухні народів.",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '16x16',
      url: '/favicon.svg',
    },
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
   
      <body className={mons.className}>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
