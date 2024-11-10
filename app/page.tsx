import Carousel from "@/components/carousel/Carousel";

import Image from "next/image";
import Header from "@/components/header/header";
import TeamCard from "@/components/team-card/TeamCard";
import Link from "next/link";
import { fetchNavbar } from "./api/route";

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
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  logo: Logo;
  description: string;
};

async function fetchClubs() {
  const options = {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  };

  try {
    const strapiURL = process.env.STRAPI_URL + "/api/clubs?populate=*";
    const res = await fetch(strapiURL, options);
    const reponse = await res.json();
    return reponse;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const teams = await fetchClubs();

  const carouselItems = [
    {
      imageUrl: "/placeholder.svg?height=600&width=1200",
      title: "Spannende Matches",
      description: "Erleben Sie packende Duelle in unserer Liga",
    },
    {
      imageUrl: "/placeholder.svg?height=600&width=1200",
      title: "Talentschmiede",
      description: "Entdecken Sie die Stars von morgen",
    },
    {
      imageUrl: "/placeholder.svg?height=600&width=1200",
      title: "Fußball-Tradition",
      description: "Über 100 Jahre Leidenschaft für den Sport",
    },
  ];

  const navbarData = await fetchNavbar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header navbarData={navbarData} />
      <main className="flex-grow">
        <Carousel items={carouselItems} />

        <div className="container mx-auto px-4 py-8">
          <section className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Fußballstadion"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Willkommen in unserer Fußball-Liga
                </h2>
                <p className="text-lg mb-4">
                  Unsere Liga vereint Tradition und Moderne im Fußball. Mit
                  erstklassigen Teams, spannenden Spielen und einer
                  leidenschaftlichen Fangemeinde bieten wir Fußball auf höchstem
                  Niveau.
                </p>
                <p className="text-lg mb-6">
                  Entdecken Sie die Vielfalt unserer Vereine, von
                  traditionsreichen Klubs bis hin zu aufstrebenden Newcomern.
                  Jedes Team hat seine eigene Geschichte und seinen
                  einzigartigen Spielstil.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Mehr über die Liga erfahren
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Fußballspieler in Aktion"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Spannende Matches und Top-Talente
                </h2>
                <p className="text-lg mb-4">
                  Erleben Sie Woche für Woche packende Duelle zwischen unseren
                  Teams. Von dramatischen Derbys bis hin zu taktischen
                  Meisterleistungen – unsere Liga bietet Fußball für jeden
                  Geschmack.
                </p>
                <p className="text-lg mb-6">
                  Entdecken Sie die Stars von morgen! Unsere Vereine sind
                  bekannt für ihre exzellente Jugendarbeit und bringen
                  regelmäßig neue Talente hervor, die den Sprung in die
                  nationalen und internationalen Top-Ligen schaffen.
                </p>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Spielplan ansehen
                </Link>
              </div>
            </div>
          </section>

          <h1 className="text-4xl font-bold mb-8 text-center">Unsere Teams</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.data.map((team: Club) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-muted mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; 2024 Fußball-Liga. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
