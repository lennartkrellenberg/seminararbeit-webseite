
"use server";

export async function fetchNavbar() {
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