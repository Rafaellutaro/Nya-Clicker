// Shop.tsx
import React from "react";
import { RiCloseLargeFill } from 'react-icons/ri'
import { propsService } from "./Props";
import type { PropsInterface } from "./PropsInterface";
import './shop.css'

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
  handleBuyFunction: {
    [key: number]: () => void;
  };
  propsList: PropsInterface[]; // array of upgrades
}

const Shop: React.FC<ShopProps> = ({ isOpen, onClose, handleBuyFunction, propsList }) => {
  const game = JSON.parse(localStorage.getItem("gameData") || "{}");

  return (
    <div className={`shop-overlay ${isOpen ? "visible" : ""}`}>
      <div className="shop-panel">
        <button className="close-btn" onClick={onClose}>
          <RiCloseLargeFill size={30} />
        </button>
        <h2 className="shop-title">Melhorias</h2>

        <div className="drawer">
          {propsList.map((item) => (
            <div key={item.id} className="drawer-slot">
              <div className="item-icon"><item.imgs size={40} /></div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>
                  {game[item.name + "Level"] >= item.price.length
                    ? "Maximizado"
                    : ` Preço: ${item.price[game[item.name + "Level"]]} pontos`}
                </p>

              </div>
              <button
                className="buy-btn"
                onClick={() => handleBuyFunction[item.id] && handleBuyFunction[item.id]()}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;