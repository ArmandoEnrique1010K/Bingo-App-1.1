import { useMemo } from "react";
import { SelectedNumbers } from "../../../types";

type ButtonNumberProps = {
  handleNumberSelection: (
    idBoard: number,
    number: number,
    position: number
  ) => void;
  isNumberSelected: (idBoard: number, position: number) => boolean;
  value: {
    number: number;
    position: number;
  };
  idBoard: number;
  selectedNumbers: SelectedNumbers;
};

export default function ButtonNumber({
  handleNumberSelection,
  isNumberSelected,
  value,
  idBoard,
  selectedNumbers,
}: ButtonNumberProps) {
  // Memoriza la selección del número para evitar re-cálculos innecesarios
  const numberSelected = useMemo(() => {
    return isNumberSelected(idBoard, value.number);
  }, [selectedNumbers]);

  return (
    <button
      className={`sm:text-2xl text-xl font-bold sm:w-16 sm:h-16 w-12 h-12 border-none rounded-lg text-white hover:bg-cyan-700 active:bg-cyan-600 ${
        numberSelected === true ? "bg-cyan-500" : "bg-gray-500"
      }`}
      // Al hacer clic, se marca el número en el tablero
      onClick={() =>
        handleNumberSelection(idBoard, value.number, value.position)
      }
    >
      {/* Si el número está en la posición central (posición 13), se muestra 'Free' */}
      {value.position === 13 ? "Free" : value.number}
    </button>
  );
}
