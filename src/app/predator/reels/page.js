import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reels/predator`
  );
  // The return value is *not* serialized

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PredatorReels() {

  const data = await getData();


  return <div className="container">
    <ul>
      {data.map(reel => {
        return (
          <li key={reel._id}>
            <Image src={reel.img[0]} alt={reel.alt} width={200} height={200} />
            <Link href={`/predator/reels/${reel._id}`}>{`Котушка ${reel.brand} ${reel.series} `}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>;
}
