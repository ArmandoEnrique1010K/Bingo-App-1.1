import { useEffect, useState } from "react";

type TargetNumbersProps = {
  handleChangeTargets: () => void;
  targets: number[];
  round: number;
};

export default function TargetNumbers({
  handleChangeTargets,
  targets,
  round,
}: TargetNumbersProps) {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    // Si no hay objetivos, el botón se deshabilita
    // Pero si la ronda es 0 (inicio del juego), el botón debe estar habilitado
    if (targets.length === 0) {
      setIsButtonDisabled(true);
      if (round === 0) {
        setIsButtonDisabled(false);
      }
    } else {
      // Si hay objetivos, el botón se habilita después de 1.5 segundos
      const timer = setTimeout(() => setIsButtonDisabled(false), 1500);
      return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    }
  }, [targets, round]);

  // Define el texto dinámico del botón
  const getButtonText = () => {
    if (round === 0) {
      return "Iniciar";
    }
    return "Siguiente";
  };

  return (
    <div className="bg-gray-700 rounded-xl p-3 shadow-lg sm:min-h-52 min-h-40 sm:mb-4">
      <h2 className="text-cyan-400 sm:text-xl font-semibold sm:mb-2">
        Objetivos
      </h2>

      {/* Renderiza los numeros objetivos si existen */}
      {targets.length > 0 && (
        <div className="flex flex-wrap justify-center sm:gap-2 gap-1 sm:py-4 py-2">
          {targets.map((n, index) => (
            <div
              key={index}
              className="sm:w-11 sm:h-11 w-8 h-8 flex items-center justify-center border-2 border-none bg-white text-black font-semibold rounded-full sm:text-lg text-sm shadow-md shadow-black"
            >
              {n}
            </div>
          ))}
        </div>
      )}

      {/* Botón para cambiar los números objetivos */}
      <div className="text-center mt-2">
        <button
          className={`bg-cyan-500 text-white font-semibold sm:px-6 px-4 sm:py-3 py-2 text-sm sm:text-base rounded-lg shadow-black shadow-md hover:bg-cyan-600 active:bg-cyan-700  sm:mb-4 ${isButtonDisabled ? "bg-gray-300 hover:bg-gray-500 opacity-50 cursor-not-allowed" : ""}`}
          disabled={isButtonDisabled}
          onClick={handleChangeTargets}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
