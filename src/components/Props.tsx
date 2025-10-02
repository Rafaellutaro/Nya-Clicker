// import react from 'react';
import type { PropsInterface } from "./PropsInterface";
import { TbMultiplier2X } from "react-icons/tb";
import { LiaRobotSolid } from "react-icons/lia";

//Props

const doubleClick: PropsInterface = {
    id: 1,
    name: "DoubleClick",
    price: [150, 300, 1000, 3000, 5000],
    imgs: TbMultiplier2X,
    effects: [2, 4, 6, 8, 10]
}

const autoClick: PropsInterface = {
    id: 2,
    name: 'AutoClick',
    price: [500, 800, 2000, 5000, 10000],
    imgs: LiaRobotSolid,
    effects: [1, 2, 5, 10, 14]
}

const props: PropsInterface[] = [doubleClick, autoClick];

const propsService = {

    getPropsList: () => {
        return props;
    },

    addDoubleClick: () => {
        const savedGame = JSON.parse(localStorage.getItem("gameData") || "{}");

        const currentLevel = savedGame.DoubleClickLevel || 0;

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
            savedGame.DoubleClickLevel = currentLevel + 1;

            // save back
            localStorage.setItem("gameData", JSON.stringify(savedGame));

            return true;
        } else {
            alert('not enough coins')
            return false;
        }

    },

    autoClick: () => {
        const savedGame = JSON.parse(localStorage.getItem("gameData") || "{}");

        const currentLevel = savedGame.AutoClickLevel || 0;

        if (currentLevel == autoClick.price.length) {
            alert('max level reached')
            return false;
        }

        const cost = autoClick.price[currentLevel]

        if (savedGame.reach >= cost) {
            // pay
            savedGame.reach -= cost;

            // save new level
            savedGame.AutoClickLevel = currentLevel + 1;

            // save back
            localStorage.setItem("gameData", JSON.stringify(savedGame));

            return true;
        } else {
            alert('not enough coins')
            return false;
        }
    },

    autoClickEffect: (level: number) => {
        return autoClick.effects[level] || null
    }

//     doubleClickPrice: (level: number) => {
//     return doubleClick.price[level] || null;
//   }

}

export { propsService };