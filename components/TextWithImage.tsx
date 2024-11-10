import { TextWithImage } from "@/app/types";
import Image from "next/image";

export const TextWithImageComponent = ({ data }: { data: TextWithImage }) => {
  const logoUrl = "http://127.0.0.1:1337" + data.image.formats.small.url;
  console.log(logoUrl);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 container mx-auto px-4 py-8">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        <p className="text-lg mb-6">{data.description}</p>
      </div>
      <div className="w-full md:w-1/2">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.formats.large.url}`}
          alt={""}
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
