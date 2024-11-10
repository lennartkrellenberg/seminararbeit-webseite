import Header from "@/components/header/header";
import TeamCard from "@/components/team-card/TeamCard";
import Footer from "@/components/footer/footer";
import { fetchClubs, fetchNavbar } from "../api/route";
import { Club, NavbarData } from "../types";

const ClubsPage = async () => {
  const navbarData = (await fetchNavbar()) as NavbarData;
  const teams = (await fetchClubs()) as Club[];

  return (
    <div className="min-h-screen flex flex-col">
      <Header navbarData={navbarData} />
      <main
        className="flex-grow 
        container mx-auto px-4 py-8
      "
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Unsere Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team: Club) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClubsPage;
