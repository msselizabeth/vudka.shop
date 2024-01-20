import { MainNavLinksMenu } from "../../../components/MainNavLinksMenu/MainNavLinksMenu";
import { rybalskiSnastiMenu } from "../../../data/rybalski-snasti";


export default function RybSnastiMenu({ children }) {
    return (
        <>
            <MainNavLinksMenu title={"Рибальські снасті"} menu={rybalskiSnastiMenu} />
        {children}
    
        </>)
}