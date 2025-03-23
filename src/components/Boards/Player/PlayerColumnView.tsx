import { Board, SelectedNumbers } from "../../../types";
import PlayerNumberView from "./PlayerNumberView";

type PlayerColumnViewProps = {
  numberBoard: Board;
  isNumberSelected: (idBoard: number, position: number) => boolean;
  handleNumberSelection: (
    idBoard: number,
    number: number,
    position: number
  ) => void;
  min: number;
  max: number;
  idBoard: number;
  selectedNumbers: SelectedNumbers;
};

export default function PlayerColumnView({
  numberBoard,
  isNumberSelected,
  handleNumberSelection,
  max,
  min,
  idBoard,
  selectedNumbers,
}: PlayerColumnViewProps) {
  return (
    <div className="flex flex-col gap-2">
      {
        // Ordena los numeros por cada columna del tablero, filtra los números que se encuentran entra las posiciones
        numberBoard
          .filter((n) => n.position >= min && n.position <= max)
          .map((n) => (
            <PlayerNumberView
              key={n.position}
              isNumberSelected={isNumberSelected}
              handleNumberSelection={handleNumberSelection}
              value={{ number: n.number, position: n.position }}
              idBoard={idBoard}
              selectedNumbers={selectedNumbers}
            />
          ))
      }
    </div>
  );
}
