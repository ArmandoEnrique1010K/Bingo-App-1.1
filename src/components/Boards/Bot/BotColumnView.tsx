import { Board } from "../../../types";
import BotButtonView from "./BotButtonView";

type BotColumnViewProps = {
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
}: BotColumnViewProps) {
  return (
    <>
      <div className="flex flex-col">
        {
          // Itera sobre board seleccionando unos 5 numeros
          board
            .filter((n) => n.position >= min && n.position <= max)
            .map((n) => (
              <BotButtonView
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
