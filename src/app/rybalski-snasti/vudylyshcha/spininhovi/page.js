import RodsList from "../../../../../components/Rods/RodsList";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rods?query=spinning`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function SpininhoviVudylyshcha() {
  const data = await getData();
  
  return (
    <section className="section">
      <div className="container">
        <h1 className={"title"}>Спінінгові вудилища</h1>
        <RodsList rods={data.result} />
      </div>
    </section>
  );
}
