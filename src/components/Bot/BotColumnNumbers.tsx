import { Board } from "../../types";
import BotSquareNumber from "./BotSquareNumber";

type BotRowNumbersProps = {
  board: Board;
  handleIsSelectedNumber: (idBoard: number, number: number) => boolean;
  max: number;
  min: number;
  idBoard: number;
};

export default function BotColumnNumbers({
  board,
  handleIsSelectedNumber,
  max,
  min,
  idBoard,
}: BotRowNumbersProps) {
  return (
    <>
      <div className="flex flex-col">
        {
          // Itera sobre board seleccionando unos 5 numeros
          board
            .filter((n) => n.position >= min && n.position <= max)
            .map((n) => (
              <BotSquareNumber
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
