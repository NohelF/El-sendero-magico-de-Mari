import type { LevelDefinition } from '../state/types';

export const LEVELS: LevelDefinition[] = [
  {
    id: 1,
    title: '🌱 Nivel 1 — El Sendero de Uno Mismo',
    subtitle: 'Identidad, crecimiento y autodescubrimiento',
    theme: 'Un jardín mágico repleto de flores resplandecientes, brisa suave y huellas misteriosas.',
    scenario: 'Jardín Mágico del Inicio',
    narrativeIntro: [
      'Bienvenida al comienzo del viaje, Mari.',
      'Frente a ti se abre un hermoso jardín envuelto en una luz dorada y cálida.',
      'Sientes una paz singular en el aire, como si este lugar te hubiera estado esperando durante mucho tiempo.'
    ],
    narrativeOutro: [
      'Has encontrado las primeras huellas brillantes en el pasto húmedo.',
      'No importa qué camino elijas primero; en la vida todos los senderos guardan aprendizajes valiosos.'
    ],
    guardianaQuote: 'Todo sendero tiene flores y todo sendero tiene piedras. Lo importante no es llegar sin tropezar, sino descubrir qué encuentras mientras caminas.',
    guideCharacter: 'manchas',
    minigameType: 'garden_tracks'
  },
  {
    id: 2,
    title: '❤️ Nivel 2 — Las Raíces',
    subtitle: 'Origen, memoria y el amor de madre',
    theme: 'Un antiguo y grandioso árbol cuyas raíces subterráneas laten con destellos de calidez y protección.',
    scenario: 'El Árbol Ancestral de las Raíces',
    narrativeIntro: [
      'Te adentras en una arboleda serena donde el suelo vibra suavemente.',
      'Un enorme árbol cobija todo con su copa dorada.',
      'Sus raíces se entrelazan profundamente guardando los primeros recuerdos de tu historia.'
    ],
    narrativeOutro: [
      'Las raíces se han conectado iluminando el corazón del gran árbol.',
      'Los recuerdos guardados aquí te recuerdan que siempre tienes un lugar seguro al cual volver.'
    ],
    guardianaQuote: 'Antes de aprender a caminar por el mundo, alguien nos enseñó con paciencia dónde poner los pies.',
    guideCharacter: 'guardiana',
    minigameType: 'roots_connect'
  },
  {
    id: 3,
    title: '🌳 Nivel 3 — El Árbol de la Familia',
    subtitle: 'Hermanos, lazos y vivencias compartidas',
    theme: 'El follaje del gran árbol se extiende en múltiples ramas llenas de hojas luminosas.',
    scenario: 'Copa Dorada de la Familia',
    narrativeIntro: [
      'Al subir a través del gran árbol, descubres ramas que se cruzan y se entrelazan de formas maravillosas.',
      'Cada rama representa una relación, una risa compartida, una historia vivida en compañía.'
    ],
    narrativeOutro: [
      'Todas las ramas conectan en un mismo tronco firme y resistente.',
      'La familia es esa red invisible que te acompaña sin importar la distancia.'
    ],
    guardianaQuote: 'Crecer juntos significa compartir raíces y saber que el mismo viento nos hace cantar a todos.',
    guideCharacter: 'guardiana',
    minigameType: 'family_branches'
  },
  {
    id: 4,
    title: '🐾 Nivel 4 — El Hogar de las Gatas',
    subtitle: 'Hogar, ternura, compañía y resiliencia',
    theme: 'Una acogedora casa envuelta en alfombras mágicas, ovillos luminosos y dulces ronroneos.',
    scenario: 'El Santuario Felino',
    narrativeIntro: [
      'Llegas a una casita cálida donde el olor a hogar llena el aire.',
      'De pronto, pequeños espíritus felinos aparecen a tu alrededor.',
      'Manchas te observa con dulzura, Negro explora los rincones, Zafiro se desliza con astucia y Kitty... está dormida en medio del pasillo.'
    ],
    narrativeOutro: [
      'Has llenado el hogar de alegría y superado el divertido capricho de Kitty.',
      'El amor incondicional de tus gatas transforma cualquier día en un refugio mágico.'
    ],
    guardianaQuote: 'En la calidez de un abrazo y en el ronroneo constante se encuentra la magia más pura.',
    guideCharacter: 'kitty',
    minigameType: 'cat_sanctuary'
  },
  {
    id: 5,
    title: '🌉 Nivel 5 — Los Puentes',
    subtitle: 'Amistades que iluminan el camino',
    theme: 'Un hermoso cañón cruzado por puentes de madera flotante sobre un arroyo cristalino.',
    scenario: 'El Valle de los Puentes',
    narrativeIntro: [
      'El sendero llega al borde de un arroyo claro y cantarín.',
      'Para cruzar al otro lado, deberás reconstruir puentes hechos de memorias y palabras sinceras.',
      'Algunas personas cruzan un puente entero a tu lado; otras solo caminan unos pasos. Ambas enriquecen tu viaje.'
    ],
    narrativeOutro: [
      'Los puentes han sido restaurados con firmeza.',
      'Cada amistad que has cultivado ha dejado una piedra sólida en el camino de tu vida.'
    ],
    guardianaQuote: 'No todos los puentes duran para siempre, pero la luz de quienes los cruzaron contigo nunca se apaga.',
    guideCharacter: 'negro',
    minigameType: 'bridges'
  },
  {
    id: 6,
    title: '🛤️ Nivel 6 — Los Compañeros del Camino',
    subtitle: 'Mentores, compañeros y aprendizajes del trayecto',
    theme: 'Un camino empedrado donde viajeros sabios han dejado herramientas y recuerdos valiosos.',
    scenario: 'La Encrucijada de los Viajeros',
    narrativeIntro: [
      'Te encuentras en una encrucijada donde coinciden muchos caminos.',
      'Es momento de revisar tu mochila simbólica de viaje y decidir qué herramientas llevarás contigo para los tramos venideros.'
    ],
    narrativeOutro: [
      'Tu mochila está lista: llena de paciencia, buen humor, coraje y gratitud.',
      'No hay elecciones equivocadas cuando se viaja con honestidad.'
    ],
    guardianaQuote: 'No todos los que caminan contigo tienen que llegar hasta el final para haber dejado una enseñanza eterna.',
    guideCharacter: 'guardiana',
    minigameType: 'backpack'
  },
  {
    id: 7,
    title: '❤️ Nivel 7 — El Camino del Amor',
    subtitle: 'Amor, complicidad y vida compartida con Nohel',
    theme: 'Dos senderos sinuosos que corren paralelos entre flores silvestres hasta fusionarse en un único camino luminoso.',
    scenario: 'El Sendero Entrelazado de Mari y Nohel',
    narrativeIntro: [
      'Llegas a un paraje romántico donde dos senderos marchaban uno al lado del otro.',
      'Paso a paso, los dos caminos han ido dibujando puentes de complicidad, risas y momentos inolvidables.'
    ],
    narrativeOutro: [
      'Los dos senderos se han unido armoniosamente en uno solo.',
      'Construir un sendero junto a quien amas es la aventura más hermosa de todas.'
    ],
    guardianaQuote: 'A veces dos personas comienzan caminando por senderos distintos y, sin darse cuenta, terminan creando juntos el paisaje entero.',
    guideCharacter: 'manchas',
    minigameType: 'love_path'
  },
  {
    id: 8,
    title: '⛰️ Nivel 8 — La Montaña de los Sueños',
    subtitle: 'Sueños, aspiraciones y el futuro',
    theme: 'La cima de una colina majestuosa bajo un cielo nocturno repleto de estrellas deslumbrantes.',
    scenario: 'La Cumbre Estrellada',
    narrativeIntro: [
      'Asciendes por una montaña serena donde las estrellas parecen al alcance de tu mano.',
      'Cada astro representa un sueño, un proyecto, un anhelo que palpita en tu corazón.'
    ],
    narrativeOutro: [
      'Has conectado los luceros formando constelaciones de luz.',
      'El futuro no es algo que se teme; es una cima hermosa esperándote.'
    ],
    guardianaQuote: 'Los sueños no siempre muestran el mapa completo. A veces solo necesitan iluminar tu siguiente paso.',
    guideCharacter: 'negro',
    minigameType: 'constellations'
  },
  {
    id: 9,
    title: '🌧️ Nivel 9 — El Valle de las Tormentas',
    subtitle: 'Dificultades, resiliencia y la voz de la duda',
    theme: 'Un valle místico cubierto de niebla, lluvia suave, sombras y viento refrescante.',
    scenario: 'El Valle de la Niebla y la Lluvia',
    narrativeIntro: [
      'El aire se vuelve fresco y la lluvia comienza a caer suavemente.',
      'Entre las sombras aparece el Cuervo de la Duda con sus preguntas inquietantes:',
      '"¿Segura de que puedes continuar? ¿Y si el viento es demasiado fuerte?"'
    ],
    narrativeOutro: [
      'Escuchaste al Cuervo sin temor y encontraste refugio en tu propio temple.',
      '¡Mira! El Cuervo se ha transformado en el sabio Guardián de la Sabiduría 🦉.'
    ],
    guardianaQuote: 'La duda no viene a detenerte. Viene a enseñarte a escuchar con calma la fuerza que habita en tu interior.',
    guideCharacter: 'cuervo',
    minigameType: 'storm_valley'
  },
  {
    id: 10,
    title: '🌌 Nivel 10 — El Mirador',
    subtitle: 'Recapitulación, mirador panorámico y la gran revelación',
    theme: 'El punto más alto del sendero. Todo el mapa brilla abajo interconectado por hilos de luz dorada.',
    scenario: 'El Mirador del Horizonte',
    narrativeIntro: [
      'Has llegado a la cima definitiva.',
      'Desde aquí contemplas todo el mapa: los jardines, las raíces, el árbol familiar, el hogar felino, los puentes, la montaña y el valle.',
      'Todo lo que recorriste brilla en perfecta armonía.'
    ],
    narrativeOutro: [
      'La Guardiana camina hacia ti, se quita la capucha y te sonríe con infinita calidez...',
      '"No soy alguien que hayas conocido en el camino... Soy alguien en quien te estás convirtiendo. Soy tú, de algunos años más adelante."'
    ],
    guardianaQuote: 'No importa cuánto cambie el camino. Mientras sigas caminando con ese corazón tan hermoso, siempre habrá sorpresas esperándote.',
    guideCharacter: 'guardiana',
    minigameType: 'mirador'
  }
];
