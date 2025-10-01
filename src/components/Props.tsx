import react from 'react';
import type { PropsInterface } from "./PropsInterface";
import { TbMultiplier2X } from "react-icons/tb";

//Props

const doubleClick: PropsInterface = {
    id: 1,
    name: "Double Click",
    price: [250, 1000, 5000, 15000, 50000],
    imgs: TbMultiplier2X,
    effects: [2, 4, 6, 8, 10]
}

const props: PropsInterface[] = [doubleClick];

const propsService = {

    getPropsList: () => {
        return props;
    },

    addDoubleClick: () => {
        const savedGame = JSON.parse(localStorage.getItem("gameData") || "{}");

        const currentLevel = savedGame.doubleClickLevel || 0;

        if (currentLevel == doubleClick.price.length) {
            alert('max level reached')
            return false;
        }

        const cost = doubleClick.price[currentLevel]
        const effect = doubleClick.effects[currentLevel];

        if (savedGame.reach >= cost) {
            // pay
            savedGame.reach -= cost;

            // increase multiplier
            savedGame.multiplier = effect;

            // save new level
            savedGame.doubleClickLevel = currentLevel + 1;

            // save back
            localStorage.setItem("gameData", JSON.stringify(savedGame));

            return true;
        } else {
            alert('not enough coins')
            return false;
        }

    },

    doubleClickPrice: (level: number) => {
    return doubleClick.price[level] || null;
  }

}

export { propsService };