type TargetPatternProps = {
  level: number;
  text: string;
};

// Componente para mostrar el patrón objetivo
export default function TargetPattern({ level, text }: TargetPatternProps) {
  return (
    <div className="w-full bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col sm:min-w-20 sm:ml-0 sm:mr-0 mr-2 sm:w-auto ">
      <div className="sm:text-xl font-semibold text-center text-cyan-400 mb-4 ">
        Patrón objetivo
      </div>

      <div className="flex flex-col md:flex-row gap-2 justify-center w-auto items-stretch">
        <div className="flex justify-center items-center flex-1">
          {/* Imagen del patrón, se especifica la clase min-w-20, ancho minimo */}
          <img
            src={`/images/patterns/level_${level}.svg`}
            alt={`Patrón del nivel ${level}`}
            className="w-36  md:w-48 shadow-lg"
          />
        </div>

        <div className="sm:text-lg text-sm text-white text-center my-auto flex-1 flex items-center justify-center">
          {text}
        </div>
      </div>
    </div>
  );
}
