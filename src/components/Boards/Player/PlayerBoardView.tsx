import { Board } from "../../../types";
import PlayerColumnView from "./PlayerColumnView";
import { SelectedNumbers } from "../../../types/index";

type PlayerBoardViewProps = {
  board: Board;
  handleNumberSelection: (
    idBoard: number,
    number: number,
    position: number
  ) => void;
  isNumberSelected: (idBoard: number, position: number) => boolean;
  idBoard: number;
  selectedNumbers: SelectedNumbers;
};

export default function PlayerBoardView({
  board,
  handleNumberSelection,
  isNumberSelected,
  idBoard,
  selectedNumbers,
}: PlayerBoardViewProps) {
  return (
    <div className="flex flex-row gap-2 sm:p-4 p-2 bg-gray-700 justify-center items-center">
      {/* Conviene usar un arreglo para generar dinamicamente las columnas del tablero */}
      {Array.from({ length: 5 }).map((_, index) => (
        <PlayerColumnView
          key={index}
          numberBoard={board}
          handleNumberSelection={handleNumberSelection}
          isNumberSelected={isNumberSelected}
          idBoard={idBoard}
          min={index * 5 + 1}
          max={(index + 1) * 5}
          selectedNumbers={selectedNumbers}
        />
      ))}
    </div>
  );
}
