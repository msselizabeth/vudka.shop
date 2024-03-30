import { MainNavLinksInnerMenu } from "../../../../components/MainNavLinksInnerMenu/MainNavLinksInnerMenu";
import { shnuryVolosinMenu } from "../../../../data/shnury-ta-volosin";


export default function ShnuryVolosinMenu({ children }) {
  return (
    <>
      <MainNavLinksInnerMenu title={"Шнури та волосінь"} menu={shnuryVolosinMenu} />
      {children}
    </>
  );
}