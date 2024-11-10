import Image from "next/image";
import { Card, CardContent } from "../ui/card";

import { Player } from "@/app/types";

type PlayerCardProps = {
  player: Player;
};

function PlayerCard({ player }: PlayerCardProps) {
  const logoUrl = "http://127.0.0.1:1337" + player.image.formats.medium.url;

  return (
    <Card className=" hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Image
          src={logoUrl}
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
