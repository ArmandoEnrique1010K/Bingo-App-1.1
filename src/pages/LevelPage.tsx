import { useEffect, useMemo, useState } from "react";
import { levels } from "../data/levels";
import { generateBoard } from "../utils/generateBoard";
import {
  BoardID,
  Direction,
  Pattern,
  SelectedNumbers,
  SelectedPositions,
  Winner,
} from "../types";
import TargetsNumbers from "../components/Target/TargetNumbers";
import BoardNumbers from "../components/Player/BoardNumbers";
import TargetPattern from "../components/Target/TargetPattern";
import Bot from "../components/Bot/Bots";
import ExitModal from "../components/Modal/ExitModal";
import WinnerBotModal from "../components/Modal/WinnerBotModal";
import WinnerPlayerModal from "../components/Modal/WinnerPlayerModal";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { generateTargets } from "../utils/generateTargets";

type LevelPageProps = {
  level: number;
  unlockLevel: (number: number) => void;
};

export default function LevelPage({ level, unlockLevel }: LevelPageProps) {
  // Obtiene los datos del nivel actual
  // El operador de TypeScript "!" (non-null assertion) indica que nunca será nulo.
  const currentLevel = levels.find((l) => l.level === level)!;

  // Tableros del jugador
  const [board, setBoard] = useState<BoardID>([]);

  // Id de los tableros
  const [boardsId, setBoardsId] = useState<number[]>([0]);

  // Id del ablero actual, incialmente selecciona el primer tablero
  const [currentBoardId, setcurrentBoardId] = useState<number>(0);

  // Numeros objetivos
  const [targets, setTargets] = useState<number[]>([]);

  // Patrones ganadores
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  // Posiciones seleccionadas
  const [selectedPositions, setSelectedPositions] = useState<SelectedPositions>(
    []
  );

  // Números seleccionados
  const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbers>([]);

  // Ganador
  const [winner, setWinner] = useState<Winner>("none");

  // Ronda
  const [round, setRound] = useState(0);

  // Números excluidos (ya que se mostraron en los números objetivos)
  const [excludedTargets, setExcludedTargets] = useState<number[]>([]);

  // Vista en diseño responsive
  const [viewPlayerBoard, setViewPlayerBoard] = useState(true);

  // Establece los patrones ganadores y el id de los tableros del nivel actual
  useEffect(() => {
    setPatterns(currentLevel.patterns);
    setBoardsId(newBoards.map((n) => n.id));
    setcurrentBoardId(newBoards.length > 0 ? newBoards[0].id : 0);
  }, [currentLevel]);

  // Usar useMemo de esta manera asegura que newBoards se recalcule solo cuando currentLevel.level o winner cambie, lo cual es una buena práctica para evitar renders innecesarios y mejorar el rendimiento.
  const newBoards = useMemo(() => {
    if (winner === "none") {
      return Array.from({ length: currentLevel.boards }).map((_, index) => ({
        id: index + 1,
        board: generateBoard(),
      }));
    } else {
      return [];
    }
  }, [currentLevel.level, winner]);

  // Establece los valores iniciales...
  const resetLevel = (): void => {
    setBoard(newBoards);
    setTargets([]);
    setRound(0);
    setWinner("none");
    setExcludedTargets([]);

    // Por defecto se asigna el número del centro del tablero como un número seleccionado
    // tanto para las posiciones como para los números seleccionados de cada uno de los tableros
    setSelectedPositions(
      Array.from({ length: currentLevel.boards }).map((_, index) => ({
        idBoard: index,
        positions: [13],
      }))
    );

    setSelectedNumbers(
      Array.from({ length: currentLevel.boards }).map((_, index) => ({
        idBoard: index,
        numbers: [0],
      }))
    );
  };

  // ...si no hay ningun ganador
  useEffect(() => {
    if (winner === "none") {
      resetLevel();
    }
  }, [winner]);

  // Cambia los numeros objetivos
  const handleChangeTargets = (): void => {
    setRound((prevRound) => prevRound + 1);
    setTargets([]);

    // Espera 1 seg. para generar 3 números objetivos (excluyendo los números que fuerón generados)
    setTimeout(() => {
      const newTargets = generateTargets(3, excludedTargets);
      setTargets(newTargets);
      setExcludedTargets((prevExcluded) => [...prevExcluded, ...newTargets]);
    }, 1000);
  };

  // Verifica que el número ya se encuentre marcado en el tablero
  const isSelectedNumber = (idBoard: number, number: number): boolean => {
    return selectedNumbers.some(
      (board) => board.idBoard === idBoard && board.numbers.includes(number)
    );
  };

  // Maneja la selección de un número en el tablero
  const handleClickButton = (
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
  const handleIsSelectedNumber = (idBoard: number, number: number): boolean => {
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

  // Limpia los números objetivos
  const handleCleanTargets = (): void => {
    setTargets([]);
  };

  // Verifica si un tablero existe
  const verifyExistBoard = (id: number): boolean =>
    newBoards.some((b) => b.id === id);

  // Cambia el tablero actual
  const handleChangeBoard = (direction: Direction): void => {
    const newBoardId =
      direction === "left" ? currentBoardId - 1 : currentBoardId + 1;
    if (verifyExistBoard(newBoardId)) {
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

  // Cambia la vista en diseño responsive
  const handleChangeViewPlayerBoard = () => {
    setViewPlayerBoard(!viewPlayerBoard);
  };

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

          {/* Botones para comprobar el patron ganador y salir del nivel */}
          {viewPlayerBoard === true && (
            <div className="flex flex-col gap-4 sm:mx-0 mx-auto">
              <div className="flex flex-row mx-auto border-4 border-gray-700 rounded-xl">
                {
                  // Renderiza la cantidad de tableros definida en `currentLevel.boards`
                  Array.from({ length: currentLevel.boards }).map(
                    (_, index) =>
                      // Solo renderiza el tablero si coincide con el ID del tablero actual
                      currentBoardId === index + 1 && (
                        <BoardNumbers
                          selectedNumbers={selectedNumbers}
                          key={index}
                          idBoard={index}
                          // Pasa el tablero por su id
                          board={
                            board.find((b) => b.id === index + 1)?.board || []
                          }
                          handleIsSelectedNumber={handleIsSelectedNumber}
                          handleClickButton={handleClickButton}
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
                    onClick={() => handleChangeBoard("left")}
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
                    onClick={() => handleChangeBoard("right")}
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
                <Bot
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
                  handleCleanTargets={handleCleanTargets}
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
