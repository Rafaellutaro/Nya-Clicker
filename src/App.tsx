import { useEffect, useRef, useState } from 'react'
import Cats from './catService'
import './App.css'
import { motion } from "motion/react"
import { useSound } from 'react-sounds';
import music from './assets/sounds/wiggle-until-you-giggle-217437.mp3'
import { RxHamburgerMenu } from 'react-icons/rx'
import Shop from './components/shop'
import { propsService } from "./components/Props"
// import type { PropsInterface } from "./components/PropsInterface";

function App() {
  const [isShopOpen, setIsShopOpen] = useState(false);

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

  // shop click

  // use affect to reload auto click
  // using autoClickRef as the name says its a reference to the intervals, in this way we keep track of the interval
  const autoClickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
  if (!playingMusic) return;

  const game = JSON.parse(localStorage.getItem('gameData') || '{}');
  const autoClickLevel = game.AutoClickLevel || 0;

  console.log(autoClickLevel)

  if (autoClickRef.current) {
      clearInterval(autoClickRef.current);
    }

  if (autoClickLevel > 0) {
    autoClickRef.current = setInterval(() => {
      // Add autoClick effect
      const savedGame = JSON.parse(localStorage.getItem('gameData') || '{}');
      savedGame.reach += propsService.autoClickEffect(autoClickLevel - 1);
      localStorage.setItem('gameData', JSON.stringify(savedGame));
      setCount(savedGame.reach); // update state

      const newIndex = thresholds.filter(t => savedGame.reach >= t).length - 1;
      setCurrentCatIndex(newIndex);


    }, 1000); // every 1 second, change as needed

    return () => clearInterval(autoClickRef.current!); // cleanup on unmount
  }
}, [playingMusic]); 

  // function to call a function

  const handleBuy =  {

    1: () => {
    const success = propsService.addDoubleClick(); // updates localStorage
    if (!success) {
      return;
    }

    // update App states immediately
    const updatedGame = Cats.gameService.getGameState();
    setCount(updatedGame.reach);
    setAllTimeCount(updatedGame.count);
    const newIndex = thresholds.filter(t => updatedGame.reach >= t).length - 1;
    setCurrentCatIndex(newIndex);

    Cats.gameService.saveGameState(updatedGame);
  },

  2: () => {
    const success = propsService.autoClick();
    if (!success) {
      return;
    }

    const updatedGame = Cats.gameService.getGameState();

    // clearing previous timers, since this function will run a lot of times you can't have multiples intervals (note to myself - please  remember what happened back in the day
    // using node with intervals, dont repeat your mistakes hahahahhahahhaa)
    if (autoClickRef.current) {
      clearInterval(autoClickRef.current);
    }

    const currentLevel = updatedGame.AutoClickLevel || 0;
    const clicksPerSecond = propsService.autoClickEffect(currentLevel - 1);

      autoClickRef.current = setInterval(() => {
      const game = Cats.gameService.getGameState();
      game.reach += clicksPerSecond ?? 0;

      setCount(game.reach);

      const newIndex = thresholds.filter(t => game.reach >= t).length - 1;
      setCurrentCatIndex(newIndex);

      Cats.gameService.saveGameState(game);
    }, 1000);
  }
  }

  // click function for double click


  // image click
  const handleClick = () => {

    const game = Cats.gameService.getGameState();
    const newCount = (game.reach + game.multiplier);
    game.reach = newCount;

    game.count = (game.count || 0) + 1;
    setAllTimeCount(game.count);
    Cats.gameService.saveGameState(game);

    const newIndex = thresholds.filter(t => newCount >= t).length - 1;
    setCurrentCatIndex(newIndex);

    setCount(newCount);

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
            <RxHamburgerMenu className='menuIcon' onClick={() => setIsShopOpen(true)} />
          </a>
        </div>


        <Shop isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} handleBuyFunction={handleBuy} propsList={propsService.getPropsList()}/>

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
            <p>Nome: {allCats[currentCatIndex].name}</p>
            <p>Clicks Manuais: {allTimeCount}</p>
          </div>
        </div>

        <a href="https://www.vecteezy.com/free-png/cat" className='license'>Cat PNGs by Vecteezy</a>
        <a href="https://www.flaticon.com/free-icons/cat" title="cat icons" className='license'>Cat icons created by Freepik - Flaticon</a>
      </div>
    </>
  )
}

export default App
