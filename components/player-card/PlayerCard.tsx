import Image from "next/image";
import { Card, CardContent } from "../ui/card";

import { Player } from "@/app/types";

function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className=" hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${player.image.formats.medium.url}`}
          alt={player.name}
          width={200}
          height={200}
          className="w-full h-auto rounded-md mb-2"
        />
        <h3 className="font-semibold text-center">{player.name}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {player.position}
        </p>
      </CardContent>
    </Card>
  );
}

export default PlayerCard;
