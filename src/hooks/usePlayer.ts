import { useMemo } from "react";
import { BoardID, Direction, Pattern, SelectedNumbers, SelectedPositions, Winner } from '../types/index';

type UsePlayerProps = {
    selectedNumbers: SelectedNumbers
    setSelectedPositions: React.Dispatch<React.SetStateAction<SelectedPositions>>
    selectedPositions: SelectedPositions
    patterns: Pattern[]
    setTargets: React.Dispatch<React.SetStateAction<number[]>>
    unlockLevel: (number: number) => void
    boardsId: number[]
    targets: number[]
    setSelectedNumbers: React.Dispatch<React.SetStateAction<SelectedNumbers>>
    setcurrentBoardId: React.Dispatch<React.SetStateAction<number>>
    newBoards: BoardID
    setWinner: React.Dispatch<React.SetStateAction<Winner>>;
    level: number
    currentBoardId: number;
}

export const usePlayer = ({ selectedNumbers,
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
    currentBoardId
}: UsePlayerProps) => {
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

    return {
        handleNumberSelection,
        isNumberSelected,
        handleCheckWinnerPattern,
        isAtFirstBoard,
        isAtLastBoard,
        changeBoard,
    }
}