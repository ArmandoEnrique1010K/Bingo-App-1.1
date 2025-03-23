type BotNumberViewProps = {
  handleIsSelectedNumber: (idBoard: number, number: number) => boolean;
  value: {
    number: number;
    position: number;
  };
  idBoard: number;
};

export default function BotNumberView({
  handleIsSelectedNumber,
  value,
  idBoard,
}: BotNumberViewProps) {
  return (
    <>
      <div
        // Aplica un estilo de acuerdo a la condición ternaria
        className={`text-xs sm:text-sm sm:size-6 size-4 text-center sm:border-2 border-0 border-gray-600 text-white 
                    ${
                      handleIsSelectedNumber(idBoard, value.number) === true
                        ? "bg-cyan-500"
                        : "bg-gray-500"
                    }`}
      >
        {/* El bot no muestra los numeros de su tablero */}
        {value.number === 0 ? "F" : /* value.number */ ""}
      </div>
    </>
  );
}
