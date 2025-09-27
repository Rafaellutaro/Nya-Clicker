import { useState } from 'react'
import Cats from './catService'
import './App.css'
import closedCat from './assets/closed-mouth.png'
import openCat from './assets/open-mouth.png'

function App() {
  const [count, setCount] = useState(() => {
    const game = Cats.gameService.getGameState();
    return game.reach;
  });
  
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setCount(c => {
      const newCount = c + 1;
      const game = Cats.gameService.getGameState();
      game.reach = newCount;
      Cats.gameService.saveGameState(game);
      return newCount;
    });

    
    setClick(true)
    setTimeout(() => setClick(false), 150)
  }

  return (
    <>
    <div className='App'>
        <div className='Imgs'>
          <img  className='Img' src={click ? openCat : closedCat} alt="" onClick={handleClick}/>
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
