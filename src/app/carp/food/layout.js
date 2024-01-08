import { Suspense } from "react";
import Loading from "@/app/loading";
import { MainNavLinksInnerMenu } from "../../../../components/MainNavLinksInnerMenu/MainNavLinksInnerMenu";
import { carpFoodMenu } from "../../../../data/carpFoodMenu";

export default function CarpReelsLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MainNavLinksInnerMenu
          title={"Коропова їжа"}
          menu={carpFoodMenu}
        />
      </Suspense>
      {children}
    </>
  );
}
