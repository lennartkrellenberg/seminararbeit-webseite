import Image from "next/image";

const ClubPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  async function fetchClub(id: string) {
    const options = {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    };

    try {
      const res = await fetch(
        `${process.env.STRAPI_URL}/api/clubs/${id}?populate=*`,
        options
      );
      const reponse = await res.json();
      return reponse.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { slug } = await params;

  const club = await fetchClub(slug);

  console.log(club);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{club.Name}</h1>
        <Image
          src={process.env.STRAPI_URL + club.Logo.url}
          alt={club.Name}
          width={400}
          height={400}
        />
      </main>
    </div>
  );
};

export default ClubPage;
