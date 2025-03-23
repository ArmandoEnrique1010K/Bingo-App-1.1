import { useBot } from "../../../hooks/useBot";
import { Level, Pattern, Winner } from "../../../types";
import BotBoardView from "./BotBoardView";

type BotProps = {
  currentLevel: Level;
  targets: number[];
  interval: number;
  name: string;
  patterns: Pattern[];
  boards: number;
  winner: Winner;
  setWinner: React.Dispatch<React.SetStateAction<Winner>>;
  clearTargets: () => void;
  nextBoards: number;
};

export default function BotView({
  targets,
  interval,
  name,
  patterns,
  winner,
  setWinner,
  boards,
  clearTargets,
  nextBoards,
}: BotProps) {
  const { handleIsSelectedNumber, botBoard } = useBot({
    winner,
    boards,
    targets,
    interval,
    patterns,
    setWinner,
    clearTargets,
  });

  return (
    <div
      className={`flex flex-col items-center bg-gray-700 p-2 rounded-lg shadow-md  ${
        boards >= 2 ? "col-span-2" : ""
      } ${
        boards < 2 && (nextBoards !== 0 || nextBoards >= 2) ? "col-span-2" : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>
      <div className="flex flex-row gap-4">
        {Array.from({ length: boards }).map((_, index) => (
          <BotBoardView
            key={index + 1}
            board={botBoard.find((b) => b.id === index + 1)?.board || []}
            idBoard={index + 1}
            handleIsSelectedNumber={handleIsSelectedNumber}
          />
        ))}
      </div>
    </div>
  );
}
