import type { CatInterface } from "./catInterface";
import type { GameState } from "./catInterface";
import closedMouth_popUp from "./assets/imgs/closed-mouth.png";
import openMouth_popUP from "./assets/imgs/open-mouth.png";
import standingCatClosed from "./assets/imgs/standingCat.png";
import standingCatOpen from "./assets/imgs/standindCat-open.png";
import popCatsound from './assets/sounds/popCat.mp3'
import moodyCat_closed from './assets/imgs/angryCat.png'
import moodyCat_open from './assets/imgs/sadCat.png'
import sadCry from './assets/sounds/sadCry.mp3'
import dancingCatSound from './assets/sounds/funny-cat-meow-246012 (mp3cut.net).mp3'
import bananaCat_closed from './assets/imgs/bananaCat.png'
import bananaCat_open from './assets/imgs/CryingBananaCat.png'
import bonk from './assets/sounds/bonk_7zPAD7C.mp3'


const LOCAL_STORAGE_KEY_CATS = "catData";
const LOCAL_STORAGE_KEY_GAME = "gameData";

//cats
 const popCat: CatInterface = {
    id: 1,
    name: "Gato pop",
    imgs: {
        closed: closedMouth_popUp,
        open: openMouth_popUP
    }
    , sound: popCatsound
}

 const dancingCat: CatInterface = {
    id: 2,
    name: "Gato dançarino",
    imgs: {
        closed: standingCatClosed,
        open: standingCatOpen
    }
    , sound: dancingCatSound
}

 const moodyCat: CatInterface = {
    id: 3,
    name: "Gato Bravo",
    imgs: {
        closed: moodyCat_closed,
        open: moodyCat_open
    }
    , sound: sadCry
}

const bananaCat: CatInterface = {
    id: 4,
    name: 'Gato Banana',
    imgs: {
        closed: bananaCat_closed,
        open: bananaCat_open 
    },
    sound: bonk
}

const cats: CatInterface[] = [popCat, dancingCat, moodyCat, bananaCat];

const catService = {

    // Funções para salvar e carregar dados do LocalStorage

    // pegar os gatos do local storage
    getCats: (): CatInterface[] => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY_CATS);
        return data ? JSON.parse(data) : cats;
    },

    // salvar os gatos no local storage

    saveCats: (cats: CatInterface[]): void => {
        localStorage.setItem(LOCAL_STORAGE_KEY_CATS, JSON.stringify(cats));
    },
}

// game State

const gameStateDefault: GameState = {
    reach: 0,
    cats: cats,
    count: 0,
    multiplier: 1,
    DoubleClickLevel: 0,
    AutoClickLevel: 0,
    autoClickInterval: 0
    
}

const gameService = {
    // Funções para salvar e carregar dados do LocalStorage

    getGameState: (): GameState => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY_GAME);
        return data ? JSON.parse(data) : gameStateDefault;
    },

    saveGameState: (gameState: GameState): void => {  
        localStorage.setItem(LOCAL_STORAGE_KEY_GAME, JSON.stringify(gameState));
    }
}

export default { catService, gameService};