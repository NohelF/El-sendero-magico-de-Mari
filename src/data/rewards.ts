import type { RewardOption } from '../state/types';

export const REWARDS: RewardOption[] = [
  {
    id: 1,
    title: 'Ir de compras',
    description: 'Una tarde especial para recorrer tus tiendas favoritas y elegir lo que más te encante.',
    category: 'actividad',
    icon: '🛍️',
    unlocked: true,
    minPointsRequired: 0
  },
  {
    id: 2,
    title: 'Bono de $100.000 COP',
    description: 'Un bono de $100.000 COP para consentirte con lo que desees.',
    category: 'sorpresa',
    icon: '💵',
    unlocked: true,
    minPointsRequired: 0
  },
  {
    id: 3,
    title: 'Una salida al cine',
    description: 'Boletos, palomitas y la película que tú elijas en la gran pantalla.',
    category: 'pelicula',
    icon: '🎬',
    unlocked: true,
    minPointsRequired: 0
  },
  {
    id: 4,
    title: 'Cita secreta',
    description: 'Una cita sorpresa preparada con misterio, complicidad y mucho amor.',
    category: 'experiencia',
    icon: '✨',
    unlocked: true,
    minPointsRequired: 500
  },
  {
    id: 5,
    title: 'Ir por un café',
    description: 'Tarde de café, postre delicioso y una charla larga y tranquila.',
    category: 'comida',
    icon: '☕',
    unlocked: true,
    minPointsRequired: 1000
  },
  {
    id: 6,
    title: 'Día de picnic',
    description: 'Manta en el pasto, brisa suave, comida rica y desconexión en la naturaleza.',
    category: 'salida',
    icon: '🧺',
    unlocked: true,
    minPointsRequired: 1500
  },
  {
    id: 7,
    title: 'Noche de peli en casa',
    description: 'Manta, snacks favoritos y maratón de películas en casa con cero interrupciones.',
    category: 'pelicula',
    icon: '🍿',
    unlocked: true,
    minPointsRequired: 2000
  }
];

export function calculateUnlockedSliceCount(points: number): number {
  if (points >= 2000) return 7;
  if (points >= 1500) return 6;
  if (points >= 1000) return 5;
  if (points >= 500) return 4;
  return 3;
}
