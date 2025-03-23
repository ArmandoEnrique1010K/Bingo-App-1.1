import { Board } from "../../../types";
import BotColumnView from "./BotColumnView";

type BotBoardViewProps = {
  board: Board;
  handleIsSelectedNumber: (idBoard: number, number: number) => boolean;
  idBoard: number;
};

export default function BotBoardView({
  board,
  handleIsSelectedNumber,
  idBoard,
}: BotBoardViewProps) {
  return (
    <div className="grid grid-cols-5">
      {/* Se crea un arreglo para generar dinamicamente las columnas del tablero */}
      {Array.from({ length: 5 }).map((_, index) => (
        <BotColumnView
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
