import { MainNavLinksInnerMenu } from "../../../../components/MainNavLinksInnerMenu/MainNavLinksInnerMenu";
import { vudylyshchaMenu } from "../../../../data/vudylyshcha";


export default function VudylyshchaMenu({ children }) {
  return (
    <>
      <MainNavLinksInnerMenu title={"Вудилища"} menu={vudylyshchaMenu} />
      {children}
    </>
  );
}