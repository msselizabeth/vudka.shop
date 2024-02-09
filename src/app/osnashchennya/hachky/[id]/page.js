import Hook from "../../../../../components/Hooks/Hook";


async function getData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hooks/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const hook = await res.json();
  const sameHooks = await getSameData(hook.series);
  return { hook, sameHooks };
}

async function getSameData(series) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hooks/same?query=${series}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function HookPage({ params }) {
  const { hook, sameHooks } = await getData(params.id);

  return (
    <section className="section">
      <div className="container">
        <h1
          className={"title"}
        >{`${hook.name} ${hook.brand} ${hook.series}`}</h1>
              <Hook hook={hook} />
        {/* <div className="container">
          {sameSilicones.length > 1 && (
            <TheSameSiliconesList
              silicones={sameSilicones}
              currentSilicone={silicone}
            />
          )}
        </div> */}
      </div>
    </section>
  );
}
