import type { RewardOption } from '../state/types';

export const REWARDS: RewardOption[] = [
  // Base tier (Unlocked by default / 0 points)
  {
    id: 1,
    title: 'Cena Especial Elegida por Mari',
    description: 'Tú eliges el restaurante o platillo favorito y Nohel se encarga de todo. [RECOMPENSA_01]',
    category: 'comida',
    icon: '🍕',
    unlocked: true,
    minPointsRequired: 0
  },
  {
    id: 2,
    title: 'Maratón de Películas Favoritas',
    description: 'Noche de cine en casa con botanas personalizadas y cero interrupciones. [RECOMPENSA_02]',
    category: 'pelicula',
    icon: '🎬',
    unlocked: true,
    minPointsRequired: 0
  },
  {
    id: 3,
    title: 'Carta Escrita a Mano',
    description: 'Una carta especial llena de recuerdos y palabras del corazón. [RECOMPENSA_03]',
    category: 'experiencia',
    icon: '💌',
    unlocked: true,
    minPointsRequired: 0
  },

  // Tier 1,000 Points
  {
    id: 4,
    title: 'Tarde de Postre & Café Mágico',
    description: 'Salida a tu cafetería favorita con postre asegurado. [RECOMPENSA_04]',
    category: 'comida',
    icon: '☕',
    unlocked: false,
    minPointsRequired: 1000
  },

  // Tier 2,500 Points
  {
    id: 5,
    title: 'Paseo al Aire Libre o Picnic',
    description: 'Un día de campo rodeados de naturaleza y aire fresco. [RECOMPENSA_05]',
    category: 'salida',
    icon: '🧺',
    unlocked: false,
    minPointsRequired: 2500
  },

  // Tier 5,000 Points
  {
    id: 6,
    title: 'Noche de Juegos & Croquetas para las Gatas',
    description: 'Festín especial de premios para las gatitas y noche de juegos. [RECOMPENSA_06]',
    category: 'actividad',
    icon: '🐈',
    unlocked: false,
    minPointsRequired: 5000
  },

  // Tier 7,500 Points
  {
    id: 7,
    title: 'Vale por un Regalo Sorpresa',
    description: 'Un detalle físico elegido especialmente para ti. [RECOMPENSA_07]',
    category: 'sorpresa',
    icon: '🎁',
    unlocked: false,
    minPointsRequired: 7500
  },
  {
    id: 8,
    title: 'Escapada o Experiencia de Fin de Semana',
    description: 'Un mini viaje o actividad diferente para despejar la mente. [RECOMPENSA_08]',
    category: 'salida',
    icon: '🌄',
    unlocked: false,
    minPointsRequired: 7500
  },

  // Tier 10,000+ Points
  {
    id: 9,
    title: 'Día Completo de Reconciliación & Relax',
    description: 'Día de spa en casa, masajes y cero preocupaciones. [RECOMPENSA_09]',
    category: 'experiencia',
    icon: '🧖‍♀️',
    unlocked: false,
    minPointsRequired: 10000
  },
  {
    id: 10,
    title: 'El Gran Deseo Mágico de Mari',
    description: 'Tú pides un deseo especial y haremos todo lo posible por cumplirlo. [RECOMPENSA_10]',
    category: 'sorpresa',
    icon: '✨',
    unlocked: false,
    minPointsRequired: 10000
  },

  // Remaining slots up to 33 placeholders for future customization
  ...Array.from({ length: 23 }, (_, index) => ({
    id: index + 11,
    title: `Sorpresa Guardada #${index + 11}`,
    description: `Placeholder personalizable para experiencia o regalo #${index + 11}. [RECOMPENSA_${index + 11}]`,
    category: 'sorpresa' as const,
    icon: '🌟',
    unlocked: false,
    minPointsRequired: 12000 + index * 500
  }))
];

export function calculateUnlockedSliceCount(points: number): number {
  if (points >= 10000) return 10;
  if (points >= 7500) return 8;
  if (points >= 5000) return 6;
  if (points >= 2500) return 5;
  if (points >= 1000) return 4;
  return 3;
}
