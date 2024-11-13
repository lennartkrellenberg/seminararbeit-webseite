"use server";

const STRAPI_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
} as const;

async function fetchFromStrapi<T>(endpoint: string, queryParams?: string): Promise<T | null> {
  try {
    const url = `${STRAPI_CONFIG.baseURL}/api/${endpoint}${queryParams ? queryParams : ''}`;
    const res = await fetch(url, { headers: STRAPI_CONFIG.headers });
    
  
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// Query parameters for different endpoints
const QUERY_PARAMS = {
  landingPage: "?populate[seo][populate][0]=shareImage" +
               "&populate[content][on][shared.image-with-text][populate][0]=image" +
               "&populate[content][on][shared.text-with-image][populate][0]=image" +
               "&populate[content][on][shared.image-text-overlay][populate][0]=image",
  navbar: "?populate=*",
  clubs: "?populate=*",
  club: (id: string) => `/${id}?populate[logo]=true&populate[players][populate][image]=true&populate[stadium][populate][image]=true`
} as const;



// API functions
export async function fetchNavbar() {
  return fetchFromStrapi("navbar", QUERY_PARAMS.navbar);
}

export async function fetchLandingPage() {
  return fetchFromStrapi("landing-page", QUERY_PARAMS.landingPage);
}

export async function fetchClubs() {
  return fetchFromStrapi("clubs", QUERY_PARAMS.clubs);
}

export async function fetchClub(id: string) {
  return fetchFromStrapi("clubs" + QUERY_PARAMS.club(id));
}