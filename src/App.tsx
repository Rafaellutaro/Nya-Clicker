import { useState } from 'react'
import Cats from './catService'
import './App.css'
import { motion } from "motion/react"

function App() {
  const [count, setCount] = useState(() => {
    const game = Cats.gameService.getGameState();
    return game.reach;
  });
  
  const [click, setClick] = useState(false)

  const [currentCatIndex, setCurrentCatIndex] = useState(() => {
  const game = Cats.gameService.getGameState();
  const count = game.reach;

  // compute initial index
  const thresholds = [0, 150, 500, 1000];
  return thresholds.filter(t => count >= t).length - 1;
});

  const handleClick = () => {
    setCount(c => {
      const newCount = c + 1;
      const game = Cats.gameService.getGameState();
      game.reach = newCount;
      Cats.gameService.saveGameState(game);
      
      if (newCount >= 150) {
        setCurrentCatIndex(1);
      }

      return newCount;
    });

    
    setClick(true)
    setTimeout(() => setClick(false), 150)
  }

  const allCats = Cats.catService.getCats();

  let closedCat = allCats[currentCatIndex].imgs.closed;
  let openCat = allCats[currentCatIndex].imgs.open;

  console.log(allCats);

  return (
    <>
    <div className='App'>
        <div className='Imgs'>
          <motion.img  
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.90 }}
          className='Img' src={click ? openCat : closedCat} alt="" onClick={handleClick}/>
        </div>
        <div className="counter">
          <div className="countBack">
            <h1 className='count'>{count}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
