import { numbers } from "../data/numbers";
import { fisherYatesShuffle } from "./fisherYatesShuffle";

// Obtiene los números de una columna, retorna un arreglo
export const getColumnNumbers = (row: number) => {
    // Busca el primer elemento que cumpla con la condición
    const selectedRow = numbers.find((r) => r.row === row);

    if (selectedRow) {

        // Baraja los 15 números de la columna seleccionada utilizando el algoritmo de Fisher-Yates
        const shuffledValues = fisherYatesShuffle([...selectedRow.values]);


        // Asegura que el número central del tablero (posición [3][2]) sea un 0
        if (row === 3) {
            shuffledValues[2] = 0;
        }

        return shuffledValues;
    }

    return []
}
