import ClubCard from "@/components/ClubCard";

async function fetchClubs() {
  const options = {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  };

  try {
    const strapiURL = process.env.STRAPI_URL + "/api/clubs?populate=*";
    console.log(strapiURL);
    const res = await fetch(strapiURL, options);
    const reponse = await res.json();
    return reponse;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  console.log(process.env.STRAPI_URL);
  const clubs = await fetchClubs();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {clubs?.data.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
