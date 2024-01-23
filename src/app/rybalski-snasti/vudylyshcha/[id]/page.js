import Rod from "../../../../../components/Rods/Rod";
import TheSameRodsList from "../../../../../components/Rods/TheSameRods";


async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rods/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const rod = await res.json();
  const sameRods = await getSameData(rod.series);
  return {rod, sameRods};
}
async function getSameData(series) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rods/same?query=${series}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function RodPage({ params }) {

  const { rod, sameRods } = await getData(params.id);
 
  return (
    <section className="section">
      <div className="container">
        <Rod rod={rod} />
      </div>
      <div className="container">
        {sameRods.length > 1 && <TheSameRodsList rods={sameRods} currentRod={rod} />}
      </div>
    </section>
  );
}
