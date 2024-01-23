import Reel from "../../../../../components/Reels/Reel";
import TheSameReelsList from "../../../../../components/Reels/TheSameReelsList";

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reels/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const reel = await res.json();
  const sameReels = await getSameData(reel.series);
   return { reel, sameReels };
}
async function getSameData(series) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reels/same?query=${series}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Katushka({ params }) {
  const { reel, sameReels } = await getData(params.id);
  return (
    <section className="section">
      <div className="container">
        <Reel reel={reel} />
      </div>
      <div className="container">
        {sameReels.length > 1 && (
          <TheSameReelsList reels={sameReels} currentReel={reel} />
        )}
      </div>
    </section>
  );
}
