import Header from "@/components/header/header";
import { Club, fetchClubs } from "../page";
import TeamCard from "@/components/team-card/TeamCard";
import Footer from "@/components/footer/footer";

const ClubsPage = async () => {
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

  //Logo für Verein
  const teams = await fetchClubs();

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
          {teams.data.map((team: Club) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClubsPage;
