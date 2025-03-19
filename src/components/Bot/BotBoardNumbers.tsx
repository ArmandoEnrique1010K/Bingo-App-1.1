import { Board } from "../../types";
import BotColumnNumbers from "./BotColumnNumbers";

type BotBoardNumbersProps = {
  board: Board;
  handleSelectedPosition: (idBoard: number, position: number) => boolean;
  idBoard: number;
};

export default function BotBoardNumbers({
  board,
  handleSelectedPosition,
  idBoard,
}: BotBoardNumbersProps) {
  return (
    <div className="grid grid-cols-5">
      {/* Conviene usar un arreglo para generar dinamicamente las columnas del tablero */}
      {Array.from({ length: 5 }).map((_, index) => (
        <BotColumnNumbers
          key={index}
          board={board}
          handleSelectedPosition={handleSelectedPosition}
          idBoard={idBoard}
          min={index * 5 + 1}
          max={(index + 1) * 5}
        />
      ))}
    </div>
  );
}
