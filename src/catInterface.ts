interface CatImages {
    closed: string;
    open: string;
}

interface CatInterface {
  id: number;
  name: string;
  imgs: CatImages
  sound: string;
}

interface GameState{
    reach: number;
    cats: CatInterface[];
    count: number;
    multiplier: number;
    doubleClickLevel: number;
}

export type { CatInterface, GameState};