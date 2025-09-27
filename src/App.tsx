import { useState } from 'react'
import Cats from './catService'
import './App.css'
import { motion } from "motion/react"
import { useSound } from 'react-sounds';
import music from './assets/sounds/wiggle-until-you-giggle-217437.mp3'
import {RxHamburgerMenu} from 'react-icons/rx'

function App() {
  const thresholds = [0, 300, 800, 2000];

  const [playingMusic, setPlayingMusic] = useState(false);
  const { play: mainMusic } = useSound(music, { loop: true, volume: 0.03 });

  const [count, setCount] = useState(() => {
    const game = Cats.gameService.getGameState();
    return game.reach;
  });

  const [allTimeCount, setAllTimeCount] = useState(() => {
    const game = Cats.gameService.getGameState();
    return game.count || 0;
  });

  const [click, setClick] = useState(false)

  const [currentCatIndex, setCurrentCatIndex] = useState(() => {
    const game = Cats.gameService.getGameState();
    const count = game.reach;

    return thresholds.filter(t => count >= t).length - 1;
  });

  const allCats = Cats.catService.getCats();
  const { play: catSound } = useSound(allCats[currentCatIndex].sound, { volume: 0.5 });

  const handleClick = () => {
    setCount(c => {
      const newCount = c + 1;
      const game = Cats.gameService.getGameState();
      game.reach = newCount;

      game.count = (game.count || 0) + 1;
      setAllTimeCount(game.count);
      Cats.gameService.saveGameState(game);

      const newIndex = thresholds.filter(t => newCount >= t).length - 1;
      setCurrentCatIndex(newIndex);

      return newCount;
    });

    catSound();
    setClick(true)
    setTimeout(() => setClick(false), 150)

    if (!playingMusic) {
      mainMusic();
      setPlayingMusic(true);
    }
  }



  let closedCat = allCats[currentCatIndex].imgs.closed;
  let openCat = allCats[currentCatIndex].imgs.open;

  console.log(allCats);

  return (
    <>
      <div className='App'>
        <div className="topBar">
          <a href="#menu" className='menu'>
            <RxHamburgerMenu className='menuIcon' />
          </a>
        </div>
        <div className='Imgs'>
          <motion.img
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.90 }}
            className='Img' src={click ? openCat : closedCat} alt="" onClick={handleClick} />
        </div>
        <div className="counter">
          <div className="countBack">
            <h1 className='count'>{count}</h1>
          </div>
        </div>

        <div className="status">
          <a href="#" style={{ textDecoration: 'none' }}>
            <h1 >Status</h1>
          </a>

          <div className="statusInfo">
            <p>Cat: {allCats[currentCatIndex].name}</p>
            <p>Clicks: {allTimeCount}</p>
          </div>
        </div>

        <a href="https://www.vecteezy.com/free-png/cat" className='license'>Cat PNGs by Vecteezy</a>
      </div>
    </>
  )
}

export default App
