import type { SecretPath } from '../state/types';

export const SECRETS: SecretPath[] = [
  {
    id: 'secret_1',
    name: 'El Claroverde Oculto',
    levelId: 1,
    description: 'Un rincón secreto en el Jardín donde florece la serenidad.',
    hint: 'Sigue la huella brillante de Manchas detrás del rosal.',
    rewardPoints: 100,
    discovered: false
  },
  {
    id: 'secret_2',
    name: 'El Túnel Secreto de Zafiro',
    levelId: 4,
    description: 'Un pasadizo entre las raíces por el que solo la ingeniosa Zafiro pudo entrar.',
    hint: 'Observa la rendija de luz cerca del viejo sillón de las gatas.',
    rewardPoints: 150,
    discovered: false
  },
  {
    id: 'secret_3',
    name: 'El Mirador Estrellado',
    levelId: 8,
    description: 'Una vista secreta de la constelación donde los deseos se multiplican.',
    hint: 'Une la estrella del norte con la estrella más tenue del horizonte.',
    rewardPoints: 200,
    discovered: false
  }
];
