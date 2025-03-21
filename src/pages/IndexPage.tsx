import { useState } from "react";
import { Link } from "react-router";

type IndexProps = {
  unlockedLevels: number[];
};

export default function IndexPage({ unlockedLevels }: IndexProps) {

  const [showLevels, setShowLevels] = useState(false);

  return (
    <div className="min-h-full max-h-full flex flex-col items-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center my-8">BingoApp <span className="text-xl">v1.1</span></h1>
      {showLevels === false ? (
        // Botón de inicio, ocupa toda la pantalla y muestra los niveles al hacer clic
        <button
          className="w-full flex-grow flex items-center justify-center bg-cyan-500 text-white text-2xl font-semibold hover:bg-cyan-600 active:bg-cyan-700 p-4"
          onClick={() => setShowLevels(true)}
        >
          Iniciar juego
        </button>
      ) : (
        <>
          <div className="w-full max-w-4xl px-4 mb-4">
            <p className="text-lg text-center mb-6">
              Seleccione un nivel para empezar
            </p>

            {/* Muestra los niveles desbloqueados en un grid adaptable a distintos tamaños de pantalla */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {unlockedLevels.map((level: number) => (
                <Link
                  key={level}
                  to={`/level_${level}`}
                  className="bg-cyan-500 text-white text-center py-4 rounded-md shadow-lg hover:bg-cyan-600 active:bg-cyan-700"
                >
                  Nivel {level}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
