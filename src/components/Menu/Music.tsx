import { useEffect, useState } from "react";
import * as Tone from "tone";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";

export default function Music() {

  // Estado para reproducir el audio
  const [isPlaying, setIsPlaying] = useState(false);

  // Estado para almacenar el reproductor de audio
  const [player, setPlayer] = useState<Tone.Player>(new Tone.Player());

  useEffect(() => {
    // Inicializa el reproductor de audio
    const audioPlayer = new Tone.Player({
      url: "/music/background.mp3",
      loop: true,
      autostart: false,
      volume: -15,
    }).toDestination(); // Conecta el audio a la salida principal (parlante)

    // Actualiza el estado de player
    setPlayer(audioPlayer);

    // Limpieza del reproductor al desmontar el componente
    return () => {
      audioPlayer.stop();
      audioPlayer.dispose();
    };
  }, []);

  // Inicia la música si el audio está cargado
  const startMusic = async () => {
    try {
      await Tone.start();

      if (player?.loaded) {
        player.start();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("No se pudo cargar el archivo de audio" + error);
    }
  };

  // Detiene la música
  const stopMusic = () => {
    player?.stop();
    setIsPlaying(false);
  };

  return (
    <button
      // Muestra un estilo y reproduce el audio dependiendo de isPlaying
      className={`sm:py-4 py-2 px-3 ${isPlaying ? "text-cyan-500 hover:text-cyan-600 active:text-cyan-700" : "text-cyan-800 hover:text-cyan-600 active:text-cyan-700"}`}
      onClick={isPlaying ? stopMusic : startMusic}
    >
      <MusicalNoteIcon
        className={`sm:w-7 w-5`}
      />
    </button>
  );
}
