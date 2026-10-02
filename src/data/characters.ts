import { getAssetUrl } from '../utils/assets';

export interface CharacterData {
  id: string;
  name: string;
  image: string;
  role: string;
  description: string;
  colorTheme: 'warm' | 'mystical' | 'protagonist' | 'companion' | 'diva' | 'resilient' | 'doubt' | 'wisdom' | 'future';
  color: string;
  quote: string;
  baseScale: number;
}

export const CHARACTERS: Record<string, CharacterData> = {
  manchas: {
    id: 'manchas',
    name: 'Manchas',
    image: getAssetUrl('assets/characters/manchas.png'),
    role: '🐾 Espíritu del Corazón',
    description: 'Espíritu guía blanco con manchas negras. Presencia cálida y protectora que despierta felicidad y dulces recuerdos.',
    colorTheme: 'warm',
    color: '#F59E0B',
    quote: 'A veces la felicidad está escondida en los lugares más pequeños.',
    baseScale: 0.65
  },
  negro: {
    id: 'negro',
    name: 'Negro',
    image: getAssetUrl('assets/characters/negro.png'),
    role: '🌑 Espíritu del Camino',
    description: 'Espíritu guía negro con destellos estrellados. Acompaña en la intuición, los misterios y los caminos secretos.',
    colorTheme: 'mystical',
    color: '#818CF8',
    quote: '¿Quieres saber qué hay al otro lado?',
    baseScale: 0.65
  },
  mari: {
    id: 'mari',
    name: 'Mari',
    image: getAssetUrl('assets/characters/mari.png'),
    role: '❤️ Protagonista',
    description: 'La protagonista de la historia. Una alma valiente y curiosa recorriendo el sendero de su propia vida.',
    colorTheme: 'protagonist',
    color: '#10B981',
    quote: 'Cada paso me enseña que este mapa siempre fue mi propia historia.',
    baseScale: 1.0
  },
  nohel: {
    id: 'nohel',
    name: 'Nohel',
    image: getAssetUrl('assets/characters/nohel.png'),
    role: '❤️ Compañero del Camino',
    description: 'Compañero amoroso de viaje. Apoyo, complicidad y crecimiento compartido paso a paso.',
    colorTheme: 'companion',
    color: '#3B82F6',
    quote: 'Construir este sendero a tu lado hace que cada día valga la pena.',
    baseScale: 1.0
  },
  kitty: {
    id: 'kitty',
    name: 'Kitty',
    image: getAssetUrl('assets/characters/kitty.png'),
    role: '👑 La Reina Consentida',
    description: 'Gata naranja, gorda y majestuosa. Dueña del camino y coleccionista de croquetas reales.',
    colorTheme: 'diva',
    color: '#F97316',
    quote: 'Odio a la humanidad... Pausa. A menos que me den croquetas.',
    baseScale: 0.7
  },
  zafiro: {
    id: 'zafiro',
    name: 'Zafiro',
    image: getAssetUrl('assets/characters/zafi.png'),
    role: '🔮 Espíritu de la Resiliencia',
    description: 'Gatita pequeña y perspicaz. Su ingenio le permite acceder a pasajes donde otros no pueden entrar.',
    colorTheme: 'resilient',
    color: '#A855F7',
    quote: 'Existen más caminos de los que puedes imaginar.',
    baseScale: 0.55
  },
  zafi: {
    id: 'zafi',
    name: 'Zafi',
    image: getAssetUrl('assets/characters/zafi.png'),
    role: '🔮 Espíritu de la Resiliencia',
    description: 'Gatita pequeña y perspicaz. Su ingenio le permite acceder a pasajes donde otros no pueden entrar.',
    colorTheme: 'resilient',
    color: '#A855F7',
    quote: 'Existen más caminos de los que puedes imaginar.',
    baseScale: 0.55
  },
  cuervo: {
    id: 'cuervo',
    name: 'Cuervo de la Duda',
    image: getAssetUrl('assets/characters/cuervo_de_la_duda.png'),
    role: '🐦‍⬛ Voz de las Incertidumbres',
    description: 'Voz de las dudas y pensamientos temerosos. Necesita ser escuchado con serenidad.',
    colorTheme: 'doubt',
    color: '#64748B',
    quote: '¿Segura de que puedes continuar?',
    baseScale: 0.7
  },
  cuervo_duda: {
    id: 'cuervo_duda',
    name: 'Cuervo de la Duda',
    image: getAssetUrl('assets/characters/cuervo_de_la_duda.png'),
    role: '🐦‍⬛ Voz de las Incertidumbres',
    description: 'Voz de las dudas y pensamientos temerosos. Necesita ser escuchado con serenidad.',
    colorTheme: 'doubt',
    color: '#64748B',
    quote: '¿Segura de que puedes continuar?',
    baseScale: 0.7
  },
  buho: {
    id: 'buho',
    name: 'Guardián de la Sabiduría',
    image: getAssetUrl('assets/characters/buho.png'),
    role: '🦉 Transformación del Cuervo',
    description: 'La voz de la duda transformada en templanza, experiencia y visión clara.',
    colorTheme: 'wisdom',
    color: '#F59E0B',
    quote: 'Tropezar no te detuvo; te enseñó a fijar mejor la mirada.',
    baseScale: 0.7
  },
  guardiana: {
    id: 'guardiana',
    name: 'La Guardiana del Sendero',
    image: getAssetUrl('assets/characters/guardiana.png'),
    role: '🌿 Guía Misteriosa',
    description: 'La presencia misteriosa que conoce a Mari mejor que nadie.',
    colorTheme: 'future',
    color: '#10B981',
    quote: 'No soy alguien que hayas conocido... Soy tú, de algunos años más adelante.',
    baseScale: 1.0
  },
  guardiana_sendero: {
    id: 'guardiana_sendero',
    name: 'La Guardiana del Sendero',
    image: getAssetUrl('assets/characters/guardiana.png'),
    role: '🌿 Guía Misteriosa',
    description: 'La presencia misteriosa que conoce a Mari mejor que nadie.',
    colorTheme: 'future',
    color: '#10B981',
    quote: 'No soy alguien que hayas conocido... Soy tú, de algunos años más adelante.',
    baseScale: 1.0
  },
  mama: {
    id: 'mama',
    name: 'Mamá',
    image: getAssetUrl('assets/characters/mama.png'),
    role: '❤️ El Amor de Madre',
    description: 'Cuidadora, atenta, fuerte, trabajadora, protectora, firme y profundamente amorosa.',
    colorTheme: 'warm',
    color: '#F43F5E',
    quote: 'Antes de aprender a caminar por el mundo, alguien nos enseñó dónde poner los pies.',
    baseScale: 1.0
  },
  familia: {
    id: 'familia',
    name: 'Familia',
    image: getAssetUrl('assets/characters/familia.png'),
    role: '🌳 El Árbol Familiar',
    description: 'Lazos firmes, recuerdos compartidos y el mismo viento que nos hace cantar a todos.',
    colorTheme: 'companion',
    color: '#10B981',
    quote: 'Crecer juntos significa compartir raíces para siempre.',
    baseScale: 1.0
  },
  amigos: {
    id: 'amigos',
    name: 'Amigos',
    image: getAssetUrl('assets/characters/amigos.png'),
    role: '🌉 Puentes de Luz',
    description: 'Compañeros leales que iluminan los pasos en el camino.',
    colorTheme: 'companion',
    color: '#3B82F6',
    quote: 'La luz de quienes cruzaron un puente contigo nunca se apaga.',
    baseScale: 1.0
  },
  mentoras: {
    id: 'mentoras',
    name: 'Mentoras',
    image: getAssetUrl('assets/characters/mentoras.png'),
    role: '🛤️ Compañeras del Camino',
    description: 'Mujeres sabias y maestras de vida.',
    colorTheme: 'wisdom',
    color: '#A855F7',
    quote: 'Llevamos en la mochila las enseñanzas que dejaron una huella eterna.',
    baseScale: 1.0
  },
  mariynohel: {
    id: 'mariynohel',
    name: 'Mari & Nohel',
    image: getAssetUrl('assets/characters/mariynohel.png'),
    role: '❤️ Amor Compartido',
    description: 'Dos caminos que construyen juntos el paisaje entero.',
    colorTheme: 'protagonist',
    color: '#EC4899',
    quote: 'Construir este sendero a tu lado hace que cada día valga la pena.',
    baseScale: 1.0
  }
};
