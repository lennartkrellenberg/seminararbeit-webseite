import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { Player } from "@/app/types";

type PlayerCardProps = {
  player: Player;
};

function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <Image
              src={player.imageUrl}
              alt={player.name}
              width={200}
              height={200}
              className="w-full h-auto rounded-md mb-2"
            />
            <h3 className="font-semibold text-center">{player.name}</h3>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{player.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Image
            src={player.imageUrl}
            alt={player.name}
            width={300}
            height={300}
            className="rounded-md mb-4"
          />
          <p className="text-lg mb-2">Position: {player.position}</p>
          <p className="text-sm text-muted-foreground">
            Weitere Informationen über {player.name} und seine Karriere...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerCard;
