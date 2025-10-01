// Shop.tsx
import React from "react";
import { RiCloseLargeFill } from 'react-icons/ri'
import { propsService } from "./Props";
import type { PropsInterface } from "./PropsInterface";
import './shop.css'

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
  handleBuyDoubleClick: () => void;
  propsList: PropsInterface[]; // array of upgrades
}

const Shop: React.FC<ShopProps> = ({ isOpen, onClose, handleBuyDoubleClick, propsList }) => {
  const game = JSON.parse(localStorage.getItem("gameData") || "{}");

  return (
    <div className={`shop-overlay ${isOpen ? "visible" : ""}`}>
      <div className="shop-panel">
        <button className="close-btn" onClick={onClose}>
          <RiCloseLargeFill size={30} />
        </button>
        <h2 className="shop-title">Upgrades</h2>

        <div className="drawer">
          {propsList.map((item) => (
            <div key={item.id} className="drawer-slot">
              <div className="item-icon"><item.imgs /></div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>
                  Cost: {item.price[game.doubleClickLevel]} coins
                </p>

              </div>
              <button className="buy-btn" onClick={handleBuyDoubleClick}>
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;