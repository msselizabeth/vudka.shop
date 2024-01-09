import { Suspense } from "react";
import Loading from "@/app/loading";
import { MainNavLinksInnerMenu } from "../../../../components/MainNavLinksInnerMenu/MainNavLinksInnerMenu";
import { carpReelsMenu } from "../../../../data/caprReelsMenu";


export default function CarpReelsLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <MainNavLinksInnerMenu title={"Коропові катушки"} menu={carpReelsMenu} />
      </Suspense>
      {children}
    </>
  );
}