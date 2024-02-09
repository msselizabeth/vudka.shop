import SiliconProduct from "../../../../../components/Silicones/Silicone";
import TheSameSiliconesList from "../../../../../components/Silicones/TheSameSilicones";

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/silicones/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const silicone = await res.json();
  const sameSilicones = await getSameData(silicone.series);
  return { silicone, sameSilicones };
}

async function getSameData(series) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/silicones/same?query=${series}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function SyliconPage({params}) {
  const { silicone, sameSilicones } = await getData(params.id);

  return (
    <section className="section">
      <div className="container">
        <h1
          className={"title"}
        >{`${silicone.name} ${silicone.brand} ${silicone.series} ${silicone.model}" ${silicone.size}мм`}</h1>
        <SiliconProduct silicone={silicone} />
        <div className="container">
          {sameSilicones.length > 1 && (
            <TheSameSiliconesList
              silicones={sameSilicones}
              currentSilicone={silicone}
            />
          )}
        </div>
      </div>
    </section>
  );
}
