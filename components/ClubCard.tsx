import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Club } from "@/app/page";

const ClubCard = ({ club }: { club: Club }) => {
  return (
    <div
      key={club.id}
      className="flex flex-col gap-4 p-4 bg-[#f9f9f9] rounded-lg shadow-md w-full max-w-[400px]"
    >
      <Image
        src={process.env.STRAPI_URL + club.Logo.url}
        alt={club.Name}
        width={400}
        height={400}
      />
      <h2 className="text-2xl font-bold">{club.Name}</h2>
      <Button asChild>
        <Link href={`/club/${club.documentId}`}>Zum Verein</Link>
      </Button>
    </div>
  );
};

export default ClubCard;
