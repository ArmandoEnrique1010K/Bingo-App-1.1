import { Level } from "../types";


// Posiciones de los numeros en el tablero
/*
1   6   11  16  21
2   7   12  17  22
3   8   13  18  23
4   9   14  19  24
5   10  15  20  25
*/

// Datos de cada uno de los niveles
export const levels: Level[] = [
    {
        // Nivel
        level: 1,
        // Texto descriptivo para el patron objetivo
        targetText: "Columna o fila de 5 números",
        // Numero de tableros del jugador
        boards: 1,
        // Patrones ganadores (dado por coordenadas)
        patterns: [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [5, 10, 15, 20, 25],
        ],
        // Oponentes automatizados (Bots)
        bots: [
            {
                // Nombre (debe ser único)
                name: "Bot-2300",
                // Tiempo de respuesta en milisegundos
                interval: 2300,
                // Número de tableros para el bot (maximo: 3)
                boards: 1
            },
        ]
    },
    {
        level: 2,
        targetText: "Cruz de 5 números",
        boards: 1,
        patterns: [
            [6, 2, 7, 12, 8],
            [11, 7, 12, 17, 13],
            [16, 12, 17, 22, 18],

            [7, 3, 8, 13, 9],
            [12, 8, 13, 18, 14],
            [17, 13, 18, 23, 19],

            [8, 4, 9, 14, 10],
            [13, 9, 14, 19, 15],
            [18, 14, 19, 24, 20],
        ],
        bots: [
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 1
            },
        ]
    },
    {
        level: 3,
        targetText: "Rectángulo de 6 números",
        boards: 1,
        patterns: [
            [1, 2, 6, 7, 11, 12],
            [2, 3, 7, 8, 12, 13],
            [3, 4, 8, 9, 13, 14],
            [4, 5, 9, 10, 14, 15],

            [6, 7, 11, 12, 16, 17],
            [7, 8, 12, 13, 17, 18],
            [8, 9, 13, 14, 18, 19],
            [9, 10, 14, 15, 19, 20],

            [11, 12, 16, 17, 21, 22],
            [12, 13, 17, 18, 22, 23],
            [13, 14, 18, 19, 23, 24],
            [14, 15, 19, 20, 24, 25],
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            }
        ]
    },
    {
        level: 4,
        targetText: "Un aspa de 5 números",
        boards: 1,
        patterns: [
            [1, 11, 7, 3, 13],
            [6, 16, 12, 8, 18],
            [11, 21, 17, 13, 23],
            [2, 12, 8, 4, 14],
            [7, 17, 13, 9, 19],
            [12, 22, 18, 14, 24],
            [3, 13, 9, 5, 15],
            [8, 18, 14, 10, 20],
            [13, 23, 19, 15, 25],
        ],
        bots: [
            {
                name: "Bot-2100",
                interval: 2100,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 1
            }
        ],
    },
    {
        level: 5,
        targetText: "Ángulo de 90 grados",
        boards: 1,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2,
                3,
                4,
                5,
            ],
            [
                1, 6, 11, 16, 21,
                22,
                23,
                24,
                25
            ],
            [
                21,
                22,
                23,
                24,
                5, 10, 15, 20, 25
            ],
            [
                1,
                2,
                3,
                4,
                5, 10, 15, 20, 25
            ]
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 1
            }
        ]
    },

    {
        level: 6,
        targetText: "2 cuadrados en 2 esquinas",
        boards: 2,
        patterns: [
            [1, 6, 2, 7, 16, 21, 17, 22],
            [1, 6, 2, 7, 19, 24, 20, 25],
            [4, 9, 5, 10, 16, 21, 17, 22],
            [4, 9, 5, 10, 19, 24, 20, 25],
            [1, 6, 2, 7, 4, 9, 5, 10],
            [16, 21, 17, 22, 19, 24, 20, 25],
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 2
            },
        ]
    },

    {
        level: 7,
        targetText: "Ojo en el centro",
        boards: 1,
        patterns: [
            [
                6, 11, 16,
                2, 22,
                3, 13, 23,
                4, 24,
                10, 15, 20,
            ]
        ],
        bots: [
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 1
            },
        ]
    },
    {
        level: 8,
        targetText: "Matriz de 9 números",
        boards: 1,
        patterns: [
            [
                1, 11, 21,
                3, 13, 23,
                5, 15, 25
            ]
        ],
        bots: [
            // 1 vs 4 bots
            {
                name: "Bot-1700-I",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 1
            },
            {
                name: "Bot-2100",
                interval: 2100,
                boards: 1
            },
            {
                name: "Bot-1700-II",
                interval: 1700,
                boards: 1
            },
        ]
    },

    {
        level: 9,
        targetText: "Aspa de 9 números",
        boards: 2,
        patterns: [
            [
                1, 21,
                7, 17,
                13,
                9, 19,
                5, 25,
            ],
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 2
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
        ]
    },


    {
        level: 10,
        targetText: "Cuadrado de 16 números",
        boards: 2,
        patterns: [
            [1, 6, 11, 16, 2, 7, 12, 17,
                3, 8, 13, 18, 4, 9, 14, 19],
            [2, 7, 12, 17, 3, 8, 13, 18,
                4, 9, 14, 19, 5, 10, 15, 20],
            [6, 11, 16, 21, 7, 12, 17, 22,
                8, 13, 18, 23, 9, 14, 19, 24],
            [7, 12, 17, 22, 8, 13, 18, 23,
                9, 14, 19, 24, 10, 15, 20, 25],
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 2
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 2
            }
        ],
    },


    {
        level: 11,
        targetText: "El número 1",
        boards: 1,
        patterns: [
            [6, 2, 7, 8, 9, 5, 10, 15],
            [11, 7, 12, 13, 14, 10, 15, 20],
            [16, 12, 17, 18, 19, 15, 20, 25]

        ],
        bots: [
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 1
            },
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 1
            },
        ],
    },
    {
        level: 12,
        targetText: "Las letras 'H' e 'I'",
        boards: 2,
        patterns: [
            [
                1, 11, 21,
                2, 12, 22,
                3, 8, 13, 23,
                4, 14, 24,
                5, 15, 25,
            ]
        ],

        bots: [
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 2
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 2
            },
        ]
    },
    {
        level: 13,
        targetText: "Cuadrado de 9 números",
        boards: 1,
        patterns: [
            [
                1, 6, 11,
                2, 7, 12,
                3, 8, 13,
            ],
            [
                6, 11, 16,
                7, 12, 17,
                8, 13, 18,
            ],
            [
                11, 16, 21,
                12, 17, 22,
                13, 18, 23,
            ],
            [
                2, 7, 12,
                3, 8, 13,
                4, 9, 14,
            ],
            [
                7, 12, 17,
                8, 13, 18,
                9, 14, 19,
            ],
            [
                12, 17, 22,
                13, 18, 23,
                14, 19, 24,
            ],
            [
                3, 8, 13,
                4, 9, 14,
                5, 10, 15,
            ],
            [
                8, 13, 18,
                9, 14, 19,
                10, 15, 20,
            ],
            [
                13, 18, 23,
                14, 19, 24,
                15, 20, 25,
            ],
        ],
        bots: [
            {
                name: "Bot-1300-I",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1700-I",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-2100",
                interval: 2100,
                boards: 2
            },
            {
                name: "Bot-1700-II",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-1300-II",
                interval: 1300,
                boards: 1
            }

        ]
    },
    {
        level: 14,
        targetText: "Pirámide simetrica de 8 números",
        boards: 1,
        patterns: [
            [
                13,
                9, 14, 19,
                5, 10, 15, 20, 25,
            ],
            [
                1, 6, 11, 16, 21,
                7, 12, 17,
                13,
            ],
            [
                1,
                2, 7,
                3, 8, 13,
                4, 9,
                5,
            ],
            [
                21,
                17, 22,
                13, 18, 23,
                19, 24,
                25,
            ],
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 2
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 2
            },
        ]
    },
    {
        level: 15,
        targetText: "Aspa invertida",
        boards: 2,
        patterns: [
            [
                6, 11, 16,
                2, 12, 22,
                3, 8, 18, 23,
                4, 14, 24,
                10, 15, 20
            ]
        ],
        bots: [
            {
                name: "Bot-2100",
                interval: 2100,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 2
            },
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 2
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
        ],
    },
    {
        level: 16,
        targetText: "3 filas o 3 columnas separadas",
        boards: 2,
        patterns: [
            [
                1, 6, 11, 16, 21,
                3, 8, 13, 18, 23,
                5, 10, 15, 20, 25,
            ],
            [
                1, 11, 21,
                2, 12, 22,
                3, 13, 23,
                4, 14, 24,
                5, 15, 25,
            ],
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 3
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 3
            },
        ]
    },
    {
        level: 17,
        targetText: "Diamante invertido",
        boards: 2,
        patterns: [
            [
                1, 6, 16, 21,
                2, 12, 22,
                8, 13, 18,
                4, 14, 24,
                5, 10, 20, 25,
            ]
        ],
        bots: [
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 1
            },
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            }
        ]
    },
    {
        level: 18,
        targetText: "Simbolo de asterisco",
        boards: 2,
        patterns: [
            [
                1, 11, 21,
                7, 12, 17,
                3, 8, 13, 18, 23,
                9, 14, 19,
                5, 15, 25
            ],
        ],
        bots: [
            {
                name: "Bot-1700",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-1500-II",
                interval: 1500,
                boards: 3
            },
            {
                name: "Bot-1300",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1500-I",
                interval: 1500,
                boards: 1
            },
        ]
    },
    {
        level: 19,
        targetText: "Escalera de 15 números",
        boards: 2,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 7, 12, 17,
                3, 8, 13,
                4, 9,
                5,
            ],
            [
                21,
                17, 22,
                13, 18, 23,
                9, 14, 19, 24,
                5, 10, 15, 20, 25,
            ],
            [
                1, 6, 11, 16, 21,
                7, 12, 17, 22,
                13, 18, 23,
                19, 24,
                25,
            ],
            [
                1,
                2, 7,
                3, 8, 13,
                4, 9, 14, 19,
                5, 10, 15, 20, 25,
            ],
        ],
        bots: [
            {
                name: "Bot-1300-I",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1300-II",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-1500-II",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1500-I",
                interval: 1500,
                boards: 1
            },
        ]
    },
    // Nivel final
    {
        level: 20,
        targetText: "Marca todo el tablero",
        boards: 2,
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 7, 12, 17, 22,
                3, 8, 13, 18, 23,
                4, 9, 14, 19, 24,
                5, 10, 15, 20, 25,
            ]
        ],
        bots: [
            {
                name: "Bot-1700-II",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-2300-I",
                interval: 2300,
                boards: 1
            },
            {
                name: "Bot-1500",
                interval: 1500,
                boards: 1
            },
            {
                name: "Bot-1900",
                interval: 1900,
                boards: 2
            },
            {
                name: "Bot-1700-I",
                interval: 1700,
                boards: 1
            },
            {
                name: "Bot-1300-II",
                interval: 1300,
                boards: 2
            },
            {
                name: "Bot-2100",
                interval: 2100,
                boards: 1
            },
            {
                name: "Bot-1300-I",
                interval: 1300,
                boards: 1
            },
            {
                name: "Bot-2300-II",
                interval: 2300,
                boards: 1
            },
        ]
    },
]