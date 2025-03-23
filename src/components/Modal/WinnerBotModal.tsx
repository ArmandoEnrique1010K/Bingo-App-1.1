import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Winner } from "../../types";

type WinnerBotModalProps = {
  level: number;
  setWinner: React.Dispatch<React.SetStateAction<Winner>>;
};

// Ventana modal si un bot ha ganado
export default function WinnerBotModal({ setWinner }: WinnerBotModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function exit() {
    navigate("/");
  }

  // Volver a intentar el mismo nivel
  function tryAgain() {
    setWinner("none");
    close();
  }

  return (
    <>
      {/* No hay un botón para abrir la ventana modal */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        // Evita que el usuario cierre la ventana modal al hacer clic fuera de ella
        onClose={open}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out sdata-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center text-gray-900 mb-10"
              >
                Mejor suerte para la proxima ⛔
              </DialogTitle>
              <div className="space-y-3 text-lg text-gray-700">
                <p className="text-center">
                  Uno de los bots te ha ganado. ¿Desea volver a intentar este
                  nivel?
                </p>
              </div>

              {/* Botones para reintentar el nivel e ir a la pagina de inicio */}
              <div className="mt-10 flex flex-row gap-4">
                <Button
                  onClick={tryAgain}
                  className="w-full py-2 px-4 font-semibold bg-cyan-500 text-white rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none "
                >
                  Volver a intentarlo
                </Button>
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
