import SiliconProduct from "../../../../../components/Silicones/Silicone";

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/silicones/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function SyliconPage({params}) {
  const data = await getData(params.id);

  return (
    <section className="section">
      <div className="container">
        <h1
          className={"title"}
        >{`${data.name} ${data.brand} ${data.series} ${data.model}" ${data.size}мм`}</h1>
        <SiliconProduct silicone={data} />
      </div>
    </section>
  );
}
