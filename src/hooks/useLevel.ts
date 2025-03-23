import { useEffect, useMemo, useState } from "react";
import { levels } from "../data/levels";
import { BoardID, Pattern, SelectedNumbers, SelectedPositions, Winner } from "../types";
import { generateBoard } from "../utils/generateBoard";
import { generateTargets } from "../utils/generateTargets";

export const useLevel = ({ level }: { level: number }) => {

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

    // Limpia los números objetivos
    const clearTargets = (): void => {
        setTargets([]);
    };

    // Cambia la vista en diseño responsive
    const handleChangeViewPlayerBoard = () => {
        setViewPlayerBoard(!viewPlayerBoard);
    };

    return {
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
    }
}