import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import BoardView from "./PlayerBoardView";
import WinnerPlayerModal from "../../Winner/WinnerPlayerModal";
import ExitModal from "../../Winner/ExitModal";
import {
  BoardID,
  Pattern,
  SelectedNumbers,
  SelectedPositions,
  Winner,
} from "../../../types";
import { usePlayer } from "../../../hooks/usePlayer";

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
  const {
    handleNumberSelection,
    isNumberSelected,
    handleCheckWinnerPattern,
    isAtFirstBoard,
    isAtLastBoard,
    changeBoard,
  } = usePlayer({
    selectedNumbers,
    setSelectedPositions,
    selectedPositions,
    patterns,
    setTargets,
    unlockLevel,
    boardsId,
    targets,
    setSelectedNumbers,
    setcurrentBoardId,
    newBoards,
    setWinner,
    level,
    currentBoardId,
  });

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
                    <BoardView
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
