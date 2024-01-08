import { MainNavLinksMenu } from "../../../components/MainNavLinksMenu/MainNavLinksMenu";
import { predatorMenu } from "../../../data/predator";

export default function PredatorLayout({ children }) {
  return (
    <>
      <MainNavLinksMenu title={"Рибаловля на хижу рибу"} menu={predatorMenu} />
      {children}
    </>
  );
}
