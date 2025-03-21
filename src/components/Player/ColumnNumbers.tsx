import { Board, SelectedNumbers } from "../../types"
import ButtonNumber from "./ButtonNumber"

type RowNumbersProps = {
    numberBoard: Board,
    handleIsSelectedNumber: (idBoard: number, position: number) => boolean,
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    min: number
    max: number,
    idBoard: number
    selectedNumbers: SelectedNumbers

}


export default function ColumnNumbers({ numberBoard, handleIsSelectedNumber, handleClickButton, max, min, idBoard, selectedNumbers }: RowNumbersProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                {
                    // Utiliza un filter para ordenar los numeros por cada columna del tablero
                    // numberBoard contiene un arreglo con 25 numeros, debe seleccionar los numeros
                    // por su posicion y mostrarlo en un botón
                    numberBoard.filter(n => n.position >= min && n.position <= max).map((n) => (
                        <ButtonNumber
                            key={n.position}
                            handleIsSelectedNumber={handleIsSelectedNumber}
                            handleClickButton={handleClickButton}
                            value={{ number: n.number, position: n.position }}
                            idBoard={idBoard}
                            selectedNumbers={selectedNumbers}
                        />
                    ))
                }

            </div>
        </>
    )
}