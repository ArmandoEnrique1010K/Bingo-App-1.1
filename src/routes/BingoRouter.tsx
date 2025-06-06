import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import { useLevel } from "../hooks/useLevel";

// Carga diferida de páginas para mejorar el rendimiento
const IndexPage = lazy(() => import("../pages/IndexPage"));
const LevelPage = lazy(() => import("../pages/LevelPage"));

export default function BingoRouter() {
  const { unlockedLevels } = useLevel();

  // Contenido visible mientras se carga el componente definido
  const supenseElement = (
    <div className="flex justify-center items-center h-full text-2xl">
      <p className="text-white text-center">Cargando...</p>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout se muestra en endpoint */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={supenseElement}>
                <IndexPage unlockedLevels={unlockedLevels} />
              </Suspense>
            }
          />

          {
            // Define las rutas dinamicas por cada nivel
            unlockedLevels.map((level: number) => (
              <Route
                key={level}
                path={`/level_${level}`}
                element={
                  <Suspense fallback={supenseElement}>
                    <LevelPage />
                  </Suspense>
                }
              />
            ))
          }

          {/* Si el usuario se saltea de ruta, se redirige a la pagina principal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
