import ClubCard from "@/components/ClubCard";

type Format = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
};

type Formats = {
  thumbnail: Format;
  small: Format;
  medium: Format;
};

type Logo = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Club = {
  id: number;
  documentId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Logo: Logo;
};

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
  const clubs: { data: Club[] } | undefined = await fetchClubs();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {clubs?.data.map((club: Club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
