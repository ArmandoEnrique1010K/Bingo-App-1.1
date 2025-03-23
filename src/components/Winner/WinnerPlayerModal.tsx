import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Winner } from "../../types";

type WinnerPlayerModalProps = {
  level: number;
  handleCheckWinnerPattern: () => boolean;
  setWinner: React.Dispatch<React.SetStateAction<Winner>>;
};

// Ventana modal si el jugador ha ganado
export default function WinnerPlayerModal({
  level,
  handleCheckWinnerPattern,
  setWinner,
}: WinnerPlayerModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setWinner("none");
  }

  function exit() {
    navigate("/");
  }

  // Verifica si el jugador tiene el patrón ganador en su tablero
  function check() {
    if (handleCheckWinnerPattern() === true) {
      open();
    }
  }

  return (
    <>
      {/* Botón para comprobar el patrón ganador */}
      <button
        onClick={check}
        className="bg-cyan-500 text-white font-semibold px-6 sm:py-3 py-2 rounded-lg shadow-black shadow-md hover:bg-cyan-600 active:bg-cyan-700 sm:text-base text-sm"
      >
        Comprobar patrón
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={open}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center text-gray-900 mb-10"
              >
                {
                  // Dependiendo del nivel mostrara un mensaje de acuerdo a la condición
                  level !== 20
                    ? "Felicidades, usted gano 🏅"
                    : "Felicidades, usted ha ganado el juego 👑"
                }
              </DialogTitle>
              <div className="space-y-3 text-lg text-gray-700">
                <p className="text-center">
                  {level !== 20
                    ? "Usted ha derrotado a los bots, puede proceder al siguiente nivel"
                    : "Usted ha derrotado a todos los bots del juego"}
                </p>
              </div>
              <div className="mt-10 flex flex-row gap-4">
                {
                  // Si no es el ultimo nivel, muestra el botón para ir al siguiente nivel
                  level !== 20 && (
                    <Link
                      className="w-full py-2 px-4 font-semibold bg-cyan-500 text-white rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none  text-center"
                      to={`/level_${level + 1}`}
                      // Cierra la ventana modal
                      onClick={close}
                    >
                      Siguiente nivel
                    </Link>
                  )
                }

                <Button
                  onClick={exit}
                  className="w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600 active:bg-gray-700  focus:outline-none "
                >
                  Salir al menú
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
