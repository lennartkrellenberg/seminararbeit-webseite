import { fetchClub, fetchNavbar } from "@/lib/route";
import { Club, NavbarData, Player } from "@/app/types";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import PlayerCard from "@/components/player-card/PlayerCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const ClubPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const club = (await fetchClub(id)) as Club;
  const navbarData = await fetchNavbar();

  if (!navbarData || !club) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header navbarData={navbarData as NavbarData} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col pb-20 md:flex-row items-center gap-8 ">
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_URL + club.logo.formats.small.url
              }
              alt={`${club.stadium.name}`}
              width={400}
              height={400}
              className=" rounded-full w-64 h-64"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
              <p className="text-lg mb-6">{club.description}</p>
            </div>
          </div>
          <Card className="mb-8">
            <CardContent className="p-0">
              <Image
                src={
                  process.env.NEXT_PUBLIC_STRAPI_URL + club.stadium.image.url
                }
                alt={`${club.stadium.name}`}
                width={800}
                height={400}
                className="w-full h-auto rounded-t-lg"
              />
              <p className="pl-4 pt-4 font-bold ">{club.stadium.name}</p>
              <p className="pl-4 text-sm ">{club.stadium.description}</p>
            </CardContent>

            <div className="flex flex-col md:flex-row gap-8 justify-center py-8 m-4 ">
              <Card className="w-36">
                <CardHeader>Kapazität</CardHeader>
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4">
                    {club.stadium.capacity}
                  </h2>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>Eröffnung</CardHeader>
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4">
                    {club.stadium.opening}
                  </h2>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>Adresse</CardHeader>
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4">
                    {club.stadium.address}
                  </h2>
                </CardContent>
              </Card>
            </div>
          </Card>
          <h2 className="text-2xl font-semibold mb-4">Spieler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {club.players.map((player: Player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClubPage;
