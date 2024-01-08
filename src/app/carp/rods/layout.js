import { Suspense } from "react";
import Loading from "@/app/loading";
import { MainNavLinksInnerMenu } from "../../../../components/MainNavLinksInnerMenu/MainNavLinksInnerMenu";
import { carpRodsMenu } from "../../../../data/carpRodsMenu";

export default function CarpRodsLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MainNavLinksInnerMenu
          title={"Коропові вудилища"}
          menu={carpRodsMenu}
        />
      </Suspense>
      {children}
    </>
  );
}
