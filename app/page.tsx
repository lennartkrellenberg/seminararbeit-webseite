import Image from "next/image";
import Header from "@/components/header/header";
import TeamCard from "@/components/team-card/TeamCard";
import Link from "next/link";
import { fetchNavbar } from "./api/route";
import { ContentRenderer } from "@/components/ContentRenderer";
import { Carousel } from "@/components/carousel/Carousel";
import Footer from "@/components/footer/footer";

interface ImageFormats {
  thumbnail: Format;
  small?: Format;
  medium?: Format;
  large?: Format;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageWithText {
  __component: "shared.image-with-text";
  id: number;
  title: string;
  description: string;
  image: Image;
}

export interface TextWithImage {
  __component: "shared.text-with-image";
  id: number;
  title: string;
  description: string;
  image: Image;
}

export interface ImageTextOverlay {
  __component: "shared.image-text-overlay";
  id: number;
  title: string;
  description: string;
  image: Image;
}

interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: Image;
}

interface ContentData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: SEO;
  content: (ImageWithText | TextWithImage | Slider)[];
}

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

export async function fetchClubs() {
  const options = {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  };

  try {
    const strapiURL = process.env.STRAPI_URL + "/api/clubs?populate=*";
    const res = await fetch(strapiURL, options);
    const reponse = await res.json();

    console.log("-----------------");
    console.log(reponse);

    return reponse;
  } catch (error) {
    console.error(error);
  }
}

async function fetchLandingPage() {
  const options = {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  };

  try {
    const strapiURL =
      process.env.STRAPI_URL +
      "/api/landing-page?populate[seo][populate][0]=shareImage&populate[content][on][shared.image-with-text][populate][0]=image&populate[content][on][shared.text-with-image][populate][0]=image&populate[content][on][shared.image-text-overlay][populate][0]=image";
    const res = await fetch(strapiURL, options);
    const reponse = await res.json();
    return reponse.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const teams = await fetchClubs();

  const landingPage = await fetchLandingPage();

  const navbarData = await fetchNavbar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header navbarData={navbarData} />
      <main className="flex-grow">
        <ContentRenderer content={landingPage.content} />
      </main>
      <Footer />
    </div>
  );
}
