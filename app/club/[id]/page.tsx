import { Player } from "@/app/types";
import Header from "@/components/header/header";
import PlayerCard from "@/components/player-card/PlayerCard";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ClubPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  async function fetchClub(id: string) {
    const options = {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    };

    try {
      const res = await fetch(
        `${process.env.STRAPI_URL}/api/clubs/${id}?populate[players][populate][image]=true&populate[stadium][populate][image]=true`,
        options
      );
      const reponse = await res.json();
      return reponse.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { id } = await params;

  const club = await fetchClub(id);

  async function fetchNavbar() {
    console.log("Fetching Navbar");
    const options = {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    };
    try {
      const res = await fetch(
        `${process.env.STRAPI_URL}/api/navbar?populate=*`,
        options
      );
      const reponse = await res.json();
      console.log(reponse.data);
      return reponse.data;
    } catch (error) {
      console.error(error);
    }
  }

  const navbarData = await fetchNavbar();

  console.log("Test");

  console.log("TEST: " + navbarData);

  //Logo für Verein

  return (
    <div className="min-h-screen flex flex-col">
      <Header navbarData={navbarData} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
          <p className="text-lg mb-6">{club.description}</p>

          <Card className="mb-8">
            <CardContent className="p-0">
              <Image
                src={process.env.STRAPI_URL + club.stadium.image.url}
                alt={`${club.name} Stadion`}
                width={800}
                height={400}
                className="w-full h-auto rounded-t-lg"
              />
              <p className="p-4 text-sm text-muted-foreground">
                Unser Heimstadion
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Spieler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {club.players.map((player: Player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubPage;
