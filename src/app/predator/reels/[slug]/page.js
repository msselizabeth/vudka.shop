import { ReelProduct } from "../../../../../components/Reels/ReelProduct";

// async function getData(slug) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/reel/${slug}`
//   );
//   // The return value is *not* serialized

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// export default async function PredatorReel({params}) {

//     const data = await getData(params.slug);


//     return <ReelProduct test={data} />;
// }