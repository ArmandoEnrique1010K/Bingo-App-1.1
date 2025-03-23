import TargetsNumbers from "../components/Target/TargetNumbersView";
import TargetPattern from "../components/Target/PatternView";
import BotView from "../components/Boards/Bot/BotView";
import WinnerBotModal from "../components/Winner/WinnerBotModal";
import PlayerView from "../components/Boards/Player/PlayerView";
import { useLevel } from "../hooks/useLevel";

type LevelPageProps = {
  level: number;
  unlockLevel: (number: number) => void;
};

export default function LevelPage({ level, unlockLevel }: LevelPageProps) {
  const {
    currentLevel,
    board,
    boardsId,
    currentBoardId,
    targets,
    patterns,
    selectedPositions,
    selectedNumbers,
    round,
    viewPlayerBoard,
    winner,
    newBoards,
    handleChangeTargets,
    clearTargets,
    handleChangeViewPlayerBoard,
    setWinner,
    setTargets,
    setSelectedPositions,
    setSelectedNumbers,
    setcurrentBoardId,
  } = useLevel({ level });

  return (
    <>
      <div className="text-white m-auto">
        <div className="container py-4 flex sm:flex-row flex-col items-start sm:gap-6 gap-4 justify-center mx-auto">
          <div className="flex flex-row sm:flex-col sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto">
            <div className=" flex flex-col min-w-20 sm:ml-0 ml-2 sm:w-auto w-full">
              <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                <h1 className="sm:text-2xl text-xl font-bold mb-2">
                  Nivel {level}
                </h1>
                <p className="sm:text-lg text-sm">
                  Ronda:{" "}
                  <span className="font-semibold text-cyan-400">{round}</span>
                </p>
              </div>

              {/* Números objetivos */}
              <TargetsNumbers
                round={round}
                targets={targets}
                handleChangeTargets={handleChangeTargets}
              />
            </div>

            {/* Patrón ganador */}
            <TargetPattern
              level={currentLevel.level}
              text={currentLevel.targetText}
            />
          </div>

          {/* Tablero del jugador */}
          <PlayerView
            viewPlayerBoard={viewPlayerBoard}
            boards={currentLevel.boards}
            currentBoardId={currentBoardId}
            selectedNumbers={selectedNumbers}
            board={board}
            selectedPositions={selectedPositions}
            patterns={patterns}
            setWinner={setWinner}
            setTargets={setTargets}
            unlockLevel={unlockLevel}
            boardsId={boardsId}
            targets={targets}
            setSelectedPositions={setSelectedPositions}
            setSelectedNumbers={setSelectedNumbers}
            level={level}
            setcurrentBoardId={setcurrentBoardId}
            newBoards={newBoards}
          />
        </div>

        {
          // Contenedor dinámico para mostrar los tableros de los bots
          <div
            className={`grid gap-3 mb-4 mt-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mx-auto container ${
              viewPlayerBoard === false ? "grid" : "hidden"
            } sm:grid`}
          >
            {
              // Grupo de los bots
              currentLevel.bots.map((bot, index) => (
                <BotView
                  key={bot.name}
                  currentLevel={currentLevel}
                  targets={targets}
                  interval={bot.interval}
                  name={bot.name}
                  patterns={patterns}
                  boards={bot.boards}
                  // Obtiene los tableros del siguiente bot en la lista, o 0 si no hay más
                  nextBoards={
                    bot.boards ? currentLevel.bots[index + 1]?.boards : 0
                  }
                  winner={winner}
                  setWinner={setWinner}
                  clearTargets={clearTargets}
                />
              ))
            }
          </div>
        }
        {
          // Muestra la ventana modal si el bot ha ganado
          winner === "bot" && (
            <WinnerBotModal level={currentLevel.level} setWinner={setWinner} />
          )
        }
      </div>

      {/* Botón en la esquina inferior derecha de la pantalla, visible solo en pantallas pequeñas */}
      <div className="fixed bottom-4 right-4 text-right sm:hidden">
        <button
          className="bg-cyan-500 p-3 rounded-full shadow-lg hover:bg-cyan-600 active:bg-cyan-700"
          onClick={handleChangeViewPlayerBoard}
        >
          {/* Muestra un ícono diferente dependiendo de la vista actual */}
          {viewPlayerBoard === true ? (
            <img src="images/bot.svg" alt="Bot" className="w-8 h-8" />
          ) : (
            <img src="images/board.svg" alt="Jugador" className="w-8 h-8" />
          )}
        </button>
      </div>
    </>
  );
}
