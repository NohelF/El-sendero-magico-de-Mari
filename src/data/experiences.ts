import type { ExperienceFragment } from '../state/types';

export const EXPERIENCES: ExperienceFragment[] = [
  {
    id: 'exp_patience',
    title: 'Aprender a Continuar',
    description: 'Los tropiezos no borran el camino recorrido; enseñan a dar el siguiente paso con más firmeza.',
    icon: '🌱',
    unlockedAtObstacle: 'Piedra'
  },
  {
    id: 'exp_alt_path',
    title: 'Encontrar Otro Camino',
    description: 'Cuando un sendero se bloquea, la imaginación y la curiosidad abren atajos inesperados.',
    icon: '🧭',
    unlockedAtObstacle: 'Telaraña'
  },
  {
    id: 'exp_ask_help',
    title: 'Saber Pedir Ayuda',
    description: 'Aceptar una mano amiga no te hace más débil; te recuerda que no estás sola.',
    icon: '🤝',
    unlockedAtObstacle: 'Río'
  },
  {
    id: 'exp_trust',
    title: 'Confiar en la Intuición',
    description: 'Aun rodeada de niebla, la voz interior sabe hacia dónde dirigirse.',
    icon: '🔮',
    unlockedAtObstacle: 'Niebla'
  },
  {
    id: 'exp_retry',
    title: 'Volver a Intentar',
    description: 'El valor no es no tener miedo, sino dar un paso más incluso cuando las manos tiemblan.',
    icon: '🔥',
    unlockedAtObstacle: 'Tormenta'
  },
  {
    id: 'exp_wisdom',
    title: 'Escuchar la Duda sin Temor',
    description: 'La duda no es un enemigo; es un recordatorio para pausar, reflexionar y ganar sabiduría.',
    icon: '🦉',
    unlockedAtObstacle: 'Cuervo de la Duda'
  }
];
