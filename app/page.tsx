import Header from "@/components/header/header";
import { fetchLandingPage, fetchNavbar } from "../lib/route";
import { ContentRenderer } from "@/components/ContentRenderer";
import Footer from "@/components/footer/footer";
import { LandingPage, NavbarData } from "./types";

export default async function Home() {
  const landingPage = (await fetchLandingPage()) as LandingPage;
  const navbarData = (await fetchNavbar()) as NavbarData;

  return (
    <div className="min-h-screen flex flex-col">
      <Header navbarData={navbarData} />
      <main className="flex-grow">
        {landingPage != null && landingPage.content != null && (
          <ContentRenderer content={landingPage.content} />
        )}
      </main>
      <Footer />
    </div>
  );
}
