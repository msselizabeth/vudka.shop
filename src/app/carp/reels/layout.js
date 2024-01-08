import { Suspense } from "react";
import { CarpReelsMenu } from "../../../../components/Carp/Reels/CarpReelsMenu";
import Loading from "@/app/loading";



export default function CarpReelsLayout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <CarpReelsMenu />
      </Suspense>
      {children}
    </>
  );
}