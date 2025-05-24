import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import PlayerBoardView from "./PlayerBoardView";
import WinnerPlayerModal from "../../Winner/WinnerPlayerModal";
import ExitModal from "../../Winner/ExitModal";
import {
  BoardID,
  Direction,
  Pattern,
  SelectedNumbers,
  SelectedPositions,
  Winner,
} from "../../../types";
import { useMemo } from "react";

type PlayerViewProps = {
  viewPlayerBoard: boolean;
  boards: number;
  currentBoardId: number;
  selectedNumbers: SelectedNumbers;
  board: BoardID;
  selectedPositions: SelectedPositions;
  patterns: Pattern[];
  setWinner: React.Dispatch<React.SetStateAction<Winner>>;
  setTargets: React.Dispatch<React.SetStateAction<number[]>>;
  unlockLevel: (number: number) => void;
  boardsId: number[];
  targets: number[];
  setSelectedPositions: React.Dispatch<React.SetStateAction<SelectedPositions>>;
  setSelectedNumbers: React.Dispatch<React.SetStateAction<SelectedNumbers>>;
  level: number;
  setcurrentBoardId: React.Dispatch<React.SetStateAction<number>>;
  newBoards: {
    id: number;
    board: {
      number: number;
      position: number;
    }[];
  }[];
};

export default function PlayerView({
  viewPlayerBoard,
  boards,
  currentBoardId,
  selectedNumbers,
  board,
  selectedPositions,
  patterns,
  setWinner,
  setTargets,
  unlockLevel,
  boardsId,
  targets,
  setSelectedPositions,
  setSelectedNumbers,
  level,
  setcurrentBoardId,
  newBoards,
}: PlayerViewProps) {
  // Verifica que el número ya se encuentre marcado en el tablero
  const isSelectedNumber = (idBoard: number, number: number): boolean => {
    return selectedNumbers.some(
      (board) => board.idBoard === idBoard && board.numbers.includes(number)
    );
  };

  // Maneja la selección de un número en el tablero
  const handleNumberSelection = (
    idBoard: number,
    number: number,
    position: number
  ): void => {
    // Verifica si el número seleccionado es un número objetivo y si aún no ha sido marcado en el tablero.
    if (targets.includes(number) && !isSelectedNumber(idBoard, number)) {
      // Crea una copia del estado anterior y se actualiza el tablero correspondiente, agregando la nueva posición y el nuevo número al array correspondiente.
      setSelectedPositions((prevState) =>
        prevState.map((board) =>
          board.idBoard === idBoard
            ? { ...board, positions: [...board.positions, position] }
            : board
        )
      );
      setSelectedNumbers((prevState) =>
        prevState.map((board) =>
          board.idBoard === idBoard
            ? { ...board, numbers: [...board.numbers, number] }
            : board
        )
      );
    }
  };

  // Verifica si es un número seleccionado según el tablero
  const isNumberSelected = (idBoard: number, number: number): boolean => {
    return (
      selectedNumbers
        .find((board) => board.idBoard === idBoard)
        ?.numbers.includes(number) || false
    );
  };

  // Verifica si el usuario ha completado un patrón ganador en alguno de sus tableros
  const handleCheckWinnerPattern = (): boolean => {
    // Recorre las posiciones seleccionadas de cada tablero y compara con los patrones ganadores
    for (const board of selectedPositions) {
      // La verificación se realiza de la siguiente manera:
      // - `some(p => ...)`: Verifica si al menos un patrón `p` cumple la condición.
      // - `every(n => ...)`: Dentro de`some`, se usa `every` para asegurarse de que todos los números del patrón `p` están en las posiciones seleccionadas del tablero.
      // - `some(position => ...)`: Dentro de`every`, se usa `some` para confirmar si al menos una posición en el tablero coincide con un número del patrón.
      if (
        patterns?.some((p) =>
          p.every((n) => board.positions.some((position) => position === n))
        )
      ) {
        setWinner("player");

        // Limpia los números objetivos y desbloquea el siguiente nivel
        setTargets([]);
        if (level !== 20) {
          unlockLevel(level + 1);
        }
        return true;
      }
    }
    return false;
  };

  // Verifica si un tablero existe
  const doesBoardExist = (id: number): boolean =>
    newBoards.some((b) => b.id === id);

  // Cambia el tablero actual
  const changeBoard = (direction: Direction): void => {
    const newBoardId =
      direction === "left" ? currentBoardId - 1 : currentBoardId + 1;
    if (doesBoardExist(newBoardId)) {
      setcurrentBoardId(newBoardId);
    }
  };

  // Verifica si currentBoardId tiene el primer o ultimo tablero por su id
  const isAtFirstBoard = useMemo(() => {
    return currentBoardId === boardsId[0];
  }, [currentBoardId, boardsId]);

  const isAtLastBoard = useMemo(() => {
    return currentBoardId === boardsId[boardsId.length - 1];
  }, [currentBoardId, boardsId]);

  return (
    <>
      {viewPlayerBoard === true && (
        <div className="flex flex-col gap-4 sm:mx-0 mx-auto">
          <div className="flex flex-row mx-auto border-4 border-gray-700 rounded-xl">
            {
              // Renderiza la cantidad de tableros definida en `currentLevel.boards`
              Array.from({ length: boards }).map(
                (_, index) =>
                  // Solo renderiza el tablero si coincide con el ID del tablero actual
                  currentBoardId === index + 1 && (
                    <PlayerBoardView
                      selectedNumbers={selectedNumbers}
                      key={index}
                      idBoard={index}
                      // Pasa el tablero por su id
                      board={board.find((b) => b.id === index + 1)?.board || []}
                      isNumberSelected={isNumberSelected}
                      handleNumberSelection={handleNumberSelection}
                    />
                  )
              )
            }
          </div>

          <div className="bg-gray-700 flex flex-col px-3 sm:mx-0 mx-3 gap-3 rounded-xl py-4">
            {/* Botones para cambiar entre tableros */}
            <div className="flex flex-row justify-between gap-4">
              <button
                className={`px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md w-full  shadow-black ${
                  isAtFirstBoard
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
                onClick={() => changeBoard("left")}
                disabled={isAtFirstBoard}
              >
                <ArrowLeftIcon className="h-6 mx-auto" />
              </button>

              <button
                className={`px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md w-full  sm:text-base text-sm shadow-black ${
                  isAtLastBoard
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
                onClick={() => changeBoard("right")}
                disabled={isAtLastBoard}
              >
                <ArrowRightIcon className="h-6 mx-auto" />
              </button>
            </div>

            {/* Botones para comprobar el patrón ganador y salir del nivel */}
            <div className="flex flex-row justify-center gap-4">
              <WinnerPlayerModal
                level={level}
                handleCheckWinnerPattern={handleCheckWinnerPattern}
                setWinner={setWinner}
              />
              <ExitModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
