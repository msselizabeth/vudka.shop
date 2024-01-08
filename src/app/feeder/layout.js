import { MainNavLinksMenu } from "../../../components/MainNavLinksMenu/MainNavLinksMenu";
import { feederMenu } from "../../../data/feeder";

export default function FeederLayout({ children }) {
  return (
    <>
      <MainNavLinksMenu title={"Рибаловля на фідер"} menu={feederMenu} />
      {children}
    </>
  );
}
