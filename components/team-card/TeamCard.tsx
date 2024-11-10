import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Club } from "@/app/types";

type TeamCardProps = {
  team: Club;
};

function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + team.logo.url}
          alt={team.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{team.name}</CardTitle>
        <p className="text-muted-foreground mb-4">{team.description}</p>
        <Link
          href={`/club/${team.documentId}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Mehr erfahren
        </Link>
      </CardContent>
    </Card>
  );
}

export default TeamCard;
