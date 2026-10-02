import type { Dedication } from '../state/types';

export const DEDICATIONS: Dedication[] = [
  {
    id: 'dedication_mother',
    title: 'El Amor de Madre',
    category: 'familia',
    content: 'Una madre cuidadora, siempre atenta, fuerte y trabajadora. De temple protector, firme y a veces tosco, pero con un amor tan profundo y verdadero que sostiene cada paso de tu vida.',
    placeholderPhoto: '/assets/characters/mama.png',
    unlockedAtLevel: 2
  },
  {
    id: 'dedication_siblings',
    title: 'Las Ramas del Mismo Árbol',
    category: 'familia',
    content: 'Crecer juntos significa compartir raíces, risas imprevistas y complicidades que permanecen firmes contra cualquier viento.',
    placeholderPhoto: '/assets/characters/familia.png',
    unlockedAtLevel: 3
  },
  {
    id: 'dedication_cats',
    title: 'Refugio de Cuatro Patas',
    category: 'personal',
    content: 'Manchas, Negro, Kitty y Zafiro no solo llenan la casa de ronroneos; enseñan lo dulce que es el amor incondicional.',
    placeholderPhoto: '/assets/characters/kitty.png',
    unlockedAtLevel: 4
  },
  {
    id: 'dedication_friends',
    title: 'Puentes de Luz',
    category: 'amigos',
    content: 'Algunas personas cruzan un puente con nosotros; otras se quedan a construir refugios en el camino. Todas dejan huella.',
    placeholderPhoto: '/assets/characters/amigos.png',
    unlockedAtLevel: 5
  },
  {
    id: 'dedication_mentors',
    title: 'Compañeros de Pasaje',
    category: 'amigos',
    content: 'Aprender de quienes caminaron cerca de nosotros nos regala herramientas valiosas que llevamos en la mochila para siempre.',
    placeholderPhoto: '/assets/characters/mentoras.png',
    unlockedAtLevel: 6
  },
  {
    id: 'dedication_love',
    title: 'El Sendero Compartido',
    category: 'pareja',
    content: 'Dos caminos que comenzaron en lugares distintos y, sin darse cuenta, fueron construyendo juntos el paisaje más hermoso.',
    placeholderPhoto: '/assets/characters/mariynohel.png',
    unlockedAtLevel: 7
  },
  {
    id: 'dedication_dreams',
    title: 'Constelación de Sueños',
    category: 'personal',
    content: 'Los sueños no siempre muestran todo el horizonte; a veces basta con que iluminen con firmeza el siguiente paso. [RECUERDO_SUEÑOS_01]',
    placeholderPhoto: '[FOTO_SUEÑOS_01]',
    unlockedAtLevel: 8
  },
  {
    id: 'dedication_resilience',
    title: 'La Claridad tras la Tormenta',
    category: 'personal',
    content: 'Las tormentas despejan la niebla y revelan que eramos mucho más fuertes y valientes de lo que imaginábamos. [RECUERDO_VALLE_01]',
    placeholderPhoto: '[FOTO_RESILIENCIA_01]',
    unlockedAtLevel: 9
  }
];
