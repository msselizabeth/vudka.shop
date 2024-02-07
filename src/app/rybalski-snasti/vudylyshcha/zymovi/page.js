import RodsList from "../../../../../components/Rods/RodsList";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rods?query=winter`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ZymoviVudylyshcha() {
  const data = await getData();
  return (
    <section className="section">
      <div className="container">
        <h1 className={"title"}>Зимові вудилища</h1>
        <RodsList rods={data.result} />
      </div>
    </section>
  );
}
