async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rods/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function RodPage({ params }) {

    const data = await getData(params.id)
    console.log(data);
  return (
    <section className="section">
          <div className="container">{data.brand}</div>
    </section>
  );
}
