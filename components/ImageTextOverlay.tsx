import { ImageTextOverlay } from "@/app/page";
import Image from "next/image";

export const ImageTextOverlayComponent = ({
  data,
}: {
  data: ImageTextOverlay;
}) => {
  const logoUrl = "http://127.0.0.1:1337" + data.image.formats.large.url;
  console.log(logoUrl);

  return (
    // Image and text overlay
    <div className="relative mb-10">
      <Image
        src={logoUrl}
        alt={""}
        width={1200}
        height={600}
        className="h-screen w-screen object-cover"
      ></Image>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-white">{data.title}</h2>
        <p className="text-lg text-white">{data.description}</p>
      </div>
    </div>
  );
};
