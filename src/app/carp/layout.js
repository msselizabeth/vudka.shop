import { MainNavLinksMenu } from "../../../components/MainNavLinksMenu/MainNavLinksMenu";
import { carpMenu } from "../../../data/carp";

export default function CarpLayout({ children }) {
  return (
    <>
      <MainNavLinksMenu title={"Рибаловля на коропа"} menu={carpMenu} />
      {children}
    </>
  );
}
