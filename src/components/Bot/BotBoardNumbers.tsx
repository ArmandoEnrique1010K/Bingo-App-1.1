import { Board } from "../../types";
import BotColumnNumbers from "./BotColumnNumbers";

type BotBoardNumbersProps = {
  board: Board;
  handleIsSelectedNumber: (idBoard: number, number: number) => boolean;
  idBoard: number;
};

export default function BotBoardNumbers({
  board,
  handleIsSelectedNumber,
  idBoard,
}: BotBoardNumbersProps) {
  return (
    <div className="grid grid-cols-5">
      {/* Se crea un arreglo para generar dinamicamente las columnas del tablero */}
      {Array.from({ length: 5 }).map((_, index) => (
        <BotColumnNumbers
          key={index}
          board={board}
          handleIsSelectedNumber={handleIsSelectedNumber}
          idBoard={idBoard}
          min={index * 5 + 1}
          max={(index + 1) * 5}
        />
      ))}
    </div>
  );
}
