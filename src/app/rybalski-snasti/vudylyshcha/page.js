async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rods`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Vudylyshcha() {
    const data = await getData()
    return <div className="container">Вудилища all page!!
        {/* <ul>{data.result.map(rod => {
            return <li key={rod._id}>
                <p>{`${rod.name} ${rod.brand} ${rod.series} ${rod.model}`}</p>
            </li>
        })}</ul> */}
    </div>;
}
