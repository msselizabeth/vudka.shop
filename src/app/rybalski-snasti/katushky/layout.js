
import { MainNavLinksInnerMenu } from "../../../../components/MainNavLinksInnerMenu/MainNavLinksInnerMenu";
import { katushkyMenu } from "../../../../data/katushky";


export default function VudylyshchaMenu({ children }) {
  return (
    <>
      <MainNavLinksInnerMenu title={"Котушки"} menu={katushkyMenu} />
      {children}
    </>
  );
}
