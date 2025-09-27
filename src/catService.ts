import type { CatInterface } from "./catInterface";
import type { GameState } from "./catInterface";
import closedMouth_popUp from "./assets/closed-mouth.png";
import openMouth_popUP from "./assets/open-mouth.png";
import standingCatClosed from "./assets/standingCat.png";
import standingCatOpen from "./assets/standindCat-open.png";
import popCatsound from './assets/sounds/popCat.mp3'

const LOCAL_STORAGE_KEY_CATS = "catData";
const LOCAL_STORAGE_KEY_GAME = "gameData";

//cats

 const popCat: CatInterface = {
    id: 1,
    name: "Pop Cat",
    imgs: {
        closed: closedMouth_popUp,
        open: openMouth_popUP
    }
    , sound: popCatsound
}

 const fatCat: CatInterface = {
    id: 2,
    name: "fat Cat",
    imgs: {
        closed: standingCatClosed,
        open: standingCatOpen
    }
    , sound: ''
}

const cats: CatInterface[] = [popCat, fatCat];

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
    cats: cats
    
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