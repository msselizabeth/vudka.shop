import { CarpMenu } from "../../../components/Carp/CarpMenu";


export default function CarpLayout({ children }) {
  return (
      <>
          <CarpMenu/>
          {children}
        </>
  );
}