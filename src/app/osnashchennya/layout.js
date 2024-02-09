import { MainNavLinksMenu } from "../../../components/MainNavLinksMenu/MainNavLinksMenu";
import { osnashchennyaMenu } from "../../../data/osnashchennya";



export default function RybSnastiMenu({ children }) {
  return (
    <>
      <MainNavLinksMenu title={"Оснащення"} menu={osnashchennyaMenu} />
      {children}
    </>
  );
}