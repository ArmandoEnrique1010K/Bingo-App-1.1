import { useMemo } from "react";
import { SelectedNumbers } from "../../types";

type ButtonNumberProps = {
  handleClickButton: (
    idBoard: number,
    number: number,
    position: number
  ) => void;
  handleIsSelectedNumber: (idBoard: number, position: number) => boolean;
  value: {
    number: number;
    position: number;
  };
  idBoard: number;
  selectedNumbers: SelectedNumbers;
};

export default function ButtonNumber({
  handleClickButton,
  handleIsSelectedNumber,
  value,
  idBoard,
  selectedNumbers,
}: ButtonNumberProps) {
  // Memoriza la selección del número para evitar re-cálculos innecesarios
  const numberSelected = useMemo(() => {
    return handleIsSelectedNumber(idBoard, value.number);
  }, [selectedNumbers]);

  return (
    <button
      className={`sm:text-2xl text-xl font-bold sm:w-16 sm:h-16 w-12 h-12 border-none rounded-lg text-white hover:bg-cyan-700 active:bg-cyan-600 ${
        numberSelected === true ? "bg-cyan-500" : "bg-gray-500"
      }`}
      // Al hacer clic, se marca el número en el tablero
      onClick={() => handleClickButton(idBoard, value.number, value.position)}
    >
      {/* Si el número está en la posición central (posición 13), se muestra 'Free' */}
      {value.position === 13 ? "Free" : value.number}
    </button>
  );
}
