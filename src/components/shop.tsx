import React, { useEffect, useState } from "react";
import './shop.css'
import { RiCloseLargeFill } from 'react-icons/ri'
import {propsService} from "./Props"
import Cats from '../catService'

interface Shop {
    isOpen: boolean;
    onClose: () => void;
}

const Shop: React.FC<Shop> = ({ isOpen, onClose }) => {
    //get savedData

    const [game, setGame] = useState<any>(() => {
    return JSON.parse(localStorage.getItem("gameData") || "{}");
  });

  // sync localStorage updates into state
 useEffect(() => {
  if (game && Object.keys(game).length > 0) {
    localStorage.setItem("gameData", JSON.stringify(game));
  }
}, [game]);
  

  // click function for double click

  const handleBuyDoubleClick = () => {
    const success = propsService.addDoubleClick();

    if (success) {
      // re-read updated gameData

      const updatedGame = JSON.parse(localStorage.getItem("gameData") || "{}");
      setGame(updatedGame);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className={`shop-overlay ${isOpen ? "visible" : ""}`}>
      <div className="shop-panel">
        <button className="close-btn" onClick={onClose}>
            <RiCloseLargeFill size={30} />
        </button>
        <h2>Shop</h2>
        <ul>
            <button onClick={handleBuyDoubleClick}>
  Buy Double Click
</button>
        </ul>
      </div>
    </div>
  );
};

export default Shop;