import SiliconesList from "../../../../components/Silicones/SiliconeList";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/silicones`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Sylicon() {
  const data = await getData();

  return (
    <section className="section">
      <div className="container">
        <h1 className={"title"}>Силіконові приманки</h1>
         <SiliconesList silicones={data.result}/>
      </div>
    </section>
  );
}
