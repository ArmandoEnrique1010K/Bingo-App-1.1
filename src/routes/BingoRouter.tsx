import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

// Mejora el performance de la aplicación web al momento de hacer un build
const IndexPage = lazy(() => import('../pages/IndexPage'));
const LevelPage = lazy(() => import('../pages/LevelPage'));

// Componente de tipo router, define las rutas que tendrá la aplicación
export default function BingoRouter() {

    // Almacena los niveles desbloqueados en un arreglo utilizando la API LocalStorage
    const initialLevels = (): number[] => {
        const localStorageLevels = localStorage.getItem('unlockedLevels')

        // Siempre el nivel 1 estara desbloqueado, por lo cual se asigna si no existe el key 
        // 'unlockedLevels'
        return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    }

    // Estado para los niveles desbloqueados
    const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // Efecto para desbloquear los niveles
    useEffect(() => {
        // Establece el nivel desbloqueado, JSON.stringify convierte de texto a JSON
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels))
    }, [unlockedLevels])

    // Función para verificar que el nivel ya se encuentre desbloqueado
    const verifyUnlockedLevel = (level: number) => {
        // El metodo includes retorna true si en unlockedLevels se encuentra el elemento
        // numerico (nivel)
        return unlockedLevels.includes(level);
    };

    // Función para desbloquear un nivel
    const unlockLevel = (level: number) => {
        // Primero verifica que el nivel ya este desbloqueado
        if (!verifyUnlockedLevel(level)) {
            // Agrega el nivel desbloqueado en el state de unlockedLevels
            setUnlockedLevels([...unlockedLevels, level])
        }
    }

    return (
        // Habilita el sistema de rutas de React Router
        <BrowserRouter>

            <Routes>

                {/* Un Route contiene el Layout, lo muestra en cada pagina web */}
                <Route element={<Layout />}>

                    <Route path="/" element={
                        // Suspense lleva la propiedad fallback para mostrar un contenido mientras
                        // se carga la página web
                        <Suspense fallback="Cargando...">
                            <IndexPage unlockedLevels={unlockedLevels} />
                        </Suspense>
                    } />

                    {
                        // Itera con unlockedLevels para definir las rutas dinamicas
                        unlockedLevels.map((level) => (
                            // No olvidar la propiedad key para definir el ID
                            <Route key={level} path={`/level_${level}`} element={
                                <Suspense fallback="Cargando...">
                                    <LevelPage level={level} unlockLevel={unlockLevel}/>
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