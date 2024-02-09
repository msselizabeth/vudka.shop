import HooksList from "../../../../components/Hooks/HooksList";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hooks`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Hachky() {

    const data = await getData();

  return (
    <section className="section">
      <div className="container">
              <h1 className="title">Гачки</h1>
              <HooksList hooks={data.result} />
      </div>
    </section>
  );
}
