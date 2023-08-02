import { IBloxburgCashier } from "Interfaces";
import { Button } from "@/components/ui/button";

interface Props {
  image: string;
  identifier: keyof IBloxburgCashier;
  positions: IBloxburgCashier;
  setPositions: React.Dispatch<React.SetStateAction<IBloxburgCashier>>;
}

export default function PositionCard({
  image,
  identifier,
  positions,
  setPositions,
}: Props) {
  async function handleSetPosition() {
    setPositions({
      ...positions,
      [identifier]: {
        ...positions[identifier],
        status: "setting",
      },
    });
    const position = await api.getPosition();
    setPositions({
      ...positions,
      [identifier]: {
        ...positions[identifier],
        status: "set",
        position,
      },
    });
  }

  function handleResetPosition() {
    setPositions({
      ...positions,
      [identifier]: {
        ...positions[identifier],
        status: "unset",
        position: { x: 0, y: 0 },
      },
    });
  }

  return (
    <div>
      <div className="relative border border-zinc-700 rounded mb-1 w-full h-20">
        <img
          src={image}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width={84}
        />
      </div>
      {positions[identifier].status === "unset" ? (
        <Button
          size="sm"
          onClick={handleSetPosition}
          className="w-full"
          variant="default">
          Set Position
        </Button>
      ) : positions[identifier].status === "setting" ? (
        <Button size="sm" disabled className="w-full" variant="default">
          Press F Key On Item
        </Button>
      ) : (
        <Button
          onClick={handleResetPosition}
          size="sm"
          className="w-full"
          variant="default">
          {`X:${positions[identifier].position.x} Y:${positions[identifier].position.y}`}
        </Button>
      )}
    </div>
  );
}
