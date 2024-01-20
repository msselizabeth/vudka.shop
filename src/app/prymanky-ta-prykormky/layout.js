import { MainNavLinksMenu } from "../../../components/MainNavLinksMenu/MainNavLinksMenu";
import { prymankyPrykormkyMenu } from "../../../data/prymanky-ta-prykormky";


export default function PrymankiPrykormkiLayout({ children }) {
    
    return (<>
        <MainNavLinksMenu title={"Приманки та прикормки"} menu={prymankyPrykormkyMenu} />
        {children}
    </>)
}