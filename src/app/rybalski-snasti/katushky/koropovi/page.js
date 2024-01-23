import ReelsList from "../../../../../components/Reels/ReelList";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reels?query=carp`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function KoropoviKatushky() {
  const data = await getData();

  return (
    <section className="section">
      <div className="container">
        <h1 className={"title"}>Коропові котушки</h1>
        <ReelsList reels={data.result} />
      </div>
    </section>
  );
}