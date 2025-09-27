import type { CatInterface } from "./catInterface";
import type { GameState } from "./catInterface";

const LOCAL_STORAGE_KEY_CATS = "catData";
const LOCAL_STORAGE_KEY_GAME = "gameData";

//cats

 const popCat: CatInterface = {
    id: 1,
    name: "Pop Cat",
    imgs: {
        closed: "./assets/closed-mouth.png",
        open: "./assets/open-mouth.png"
    }
}

const cats: CatInterface[] = [popCat];

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