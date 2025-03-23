import { Board } from "../../../types";
import BotNumberView from "./BotNumberView";

type BotNumberViewProps = {
  board: Board;
  handleIsSelectedNumber: (idBoard: number, number: number) => boolean;
  max: number;
  min: number;
  idBoard: number;
};

export default function BotColumnView({
  board,
  handleIsSelectedNumber,
  max,
  min,
  idBoard,
}: BotNumberViewProps) {
  return (
    <>
      <div className="flex flex-col">
        {
          // Itera sobre board seleccionando unos 5 numeros
          board
            .filter((n) => n.position >= min && n.position <= max)
            .map((n) => (
              <BotNumberView
                key={n.position}
                idBoard={idBoard}
                handleIsSelectedNumber={handleIsSelectedNumber}
                value={{ number: n.number, position: n.position }}
              />
            ))
        }
      </div>
    </>
  );
}
