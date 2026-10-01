export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string; // Emoji / SVG representation
  color: string;  // Accent color
  description: string;
  quote: string;
}

export interface Dedication {
  id: string;
  title: string;
  category: 'familia' | 'amigos' | 'pareja' | 'personal';
  content: string;
  placeholderPhoto?: string;
  unlockedAtLevel: number;
}

export interface ExperienceFragment {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAtObstacle: string;
}

export interface SecretPath {
  id: string;
  name: string;
  levelId: number;
  description: string;
  hint: string;
  rewardPoints: number;
  discovered: boolean;
}

export interface LevelDefinition {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
  scenario: string;
  narrativeIntro: string[];
  narrativeOutro: string[];
  guardianaQuote?: string;
  guideCharacter: 'manchas' | 'negro' | 'kitty' | 'zafiro' | 'cuervo' | 'guardiana';
  minigameType: 
    | 'garden_tracks'
    | 'roots_connect'
    | 'family_branches'
    | 'cat_sanctuary'
    | 'bridges'
    | 'backpack'
    | 'love_path'
    | 'constellations'
    | 'storm_valley'
    | 'mirador';
}

export interface RewardOption {
  id: number;
  title: string;
  description: string;
  category: 'salida' | 'comida' | 'pelicula' | 'experiencia' | 'sorpresa' | 'actividad';
  icon: string;
  unlocked: boolean;
  minPointsRequired: number;
}

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  lifePoints: number;
  experiences: string[];        // ExperienceFragment IDs
  secrets: string[];            // SecretPath IDs
  dedications: string[];        // Dedication IDs
  unlockedWheelOptions: number;
  discoveredPaths: string[];
  charactersFound: string[];
  obstaclesEncountered: number;
  wheelResult: RewardOption | null;
  soundEnabled: boolean;
  reducedMotion: boolean;
}
