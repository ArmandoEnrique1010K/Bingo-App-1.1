import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

// Carga diferida de páginas para mejorar el rendimiento
const IndexPage = lazy(() => import('../pages/IndexPage'));
const LevelPage = lazy(() => import('../pages/LevelPage'));

export default function BingoRouter() {

    // Obtiene los niveles desbloqueados desde localStorage o lo inicializa con el nivel 1
    const initialLevels = (): number[] => {
        const localStorageLevels = localStorage.getItem('unlockedLevels')
        return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    }

    const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // Establece en el localStorage los niveles desbloqueados
    useEffect(() => {
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels))
    }, [unlockedLevels])

    // Desbloquea un nivel si no se encuentra desbloqueado
    const unlockLevel = (level: number) => {
        if (!unlockedLevels.includes(level)) {
            setUnlockedLevels([...unlockedLevels, level])
        }
    }

    // Contenido visible mientras se carga el componente definido
    const supenseElement = <div className="flex justify-center items-center h-full text-2xl">
        <p className="text-white text-center">Cargando...</p>
    </div>

    return (
        <BrowserRouter>
            <Routes>
                {/* El Layout se muestra en endpoint */}
                <Route element={<Layout />}>

                    <Route path="/" element={
                        <Suspense fallback={supenseElement}>
                            <IndexPage unlockedLevels={unlockedLevels} />
                        </Suspense>
                    } />

                    {
                        // Define las rutas dinamicas por cada nivel
                        unlockedLevels.map((level) => (
                            <Route key={level} path={`/level_${level}`} element={
                                <Suspense fallback={supenseElement}>
                                    <LevelPage level={level} unlockLevel={unlockLevel} />
                                </Suspense>
                            } />
                        ))
                    }

                    {/* Si el usuario se saltea de ruta, se redirige a la pagina principal */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}