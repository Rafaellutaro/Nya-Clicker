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
}

export type { CatInterface, GameState};