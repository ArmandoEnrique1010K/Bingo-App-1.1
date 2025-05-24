import { useEffect, useMemo, useState } from "react";
import { levels } from "../data/levels";
import { BoardID, Level, Pattern, SelectedNumbers, SelectedPositions, Winner } from "../types";
import { generateBoard } from "../utils/generateBoard";
import { generateTargets } from "../utils/generateTargets";
import { useLocation, useNavigate } from "react-router";

export const useLevel = (
    // { level }: { level: number }
) => {

    // Obtiene los niveles desbloqueados desde localStorage o lo inicializa con el nivel 1
    const initialLevels = (): number[] => {
        const localStorageLevels = localStorage.getItem('unlockedLevels')
        return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    }

    const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // Establece en el localStorage los niveles desbloqueados
    useEffect(() => {
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels))
    }, [unlockedLevels])

    // Desbloquea un nivel si no se encuentra desbloqueado
    const unlockLevel = (level: number) => {
        if (!unlockedLevels.includes(level)) {
            setUnlockedLevels([...unlockedLevels, level])
        }
    }

    // Obtiene los datos del nivel actual
    // El operador de TypeScript "!" (non-null assertion) indica que nunca será nulo.

    // El nivel actual se obtiene de la URL
    const navigate = useNavigate();
    const location = useLocation();

    // Si la ruta actual es de la forma "/level_1", "level_2". Obtiene solamente el número
    const pathLevel = parseInt(location.pathname.split("_")[1], 10);
    // console.log(location.pathname)


    const [currentLevel, setCurrentLevel] = useState<Level>();



    // SI EL JUGADOR HA GANADO Y HA HECHO CLIC EN EL BOTÓN DE LA VENTANA MODAL, DEBE AVANZAR DE NIVEL

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
    // Ronda
    const [round, setRound] = useState(0);

    const [winner, setWinner] = useState<Winner>("none");

    // Números excluidos (ya que se mostraron en los números objetivos)
    const [excludedTargets, setExcludedTargets] = useState<number[]>([]);

    // Vista en diseño responsive
    const [viewPlayerBoard, setViewPlayerBoard] = useState(true);


    useEffect(() => {
        if (winner === 'none') {
            const level = levels.find((l) => l.level === pathLevel)!;
            setCurrentLevel(level)
        }
    }, [winner, pathLevel])


    // TODO: CUANDO PASO DEL NIVEL 5 A 6, SE MUESTRA 1 SOLO TABLERO PARA EL JUGADOR, A PESAR DE QUE ESE NIVEL VA A SER CON 2 TABLEROS
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
    }, [/*currentLevel.level,*/ winner, currentLevel.boards]);

    // Establece los patrones ganadores y el id de los tableros del nivel actual
    useEffect(() => {
        setPatterns(currentLevel.patterns);
        setBoardsId(newBoards.map((n) => n.id));
        setcurrentBoardId(newBoards.length > 0 ? newBoards[0].id : 0);
    }, [currentLevel, newBoards]);

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
        unlockedLevels,
        unlockLevel,

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