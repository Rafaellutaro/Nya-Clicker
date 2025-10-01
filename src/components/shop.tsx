import React, { useEffect, useState } from "react";
import './shop.css'
import { RiCloseLargeFill } from 'react-icons/ri'
import {propsService} from "./Props"
import Cats from '../catService'

interface Shop {
    isOpen: boolean;
    onClose: () => void;
    handleBuyDoubleClick: () => void;
}

const Shop: React.FC<Shop> = ({ isOpen, onClose, handleBuyDoubleClick }) => {
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