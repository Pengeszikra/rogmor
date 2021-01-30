import React, { useEffect, useState } from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import Leveling from './Leveling';
import Battle from './Battle';
import generateName from '../rpg/generateName';
import profession from '../rpg/profession';
import { rnd, shuffle, improved } from '../rpg/rpg';
import { abToCoord, coordTo, dryLand, toCoord } from '../rpg/rogmorMap';
import HeroCard from './HeroCard';
import { fromIter, forEach } from 'callbag-basics';
import interval from 'callbag-interval';
import sample from 'callbag-sample';
import { fightSaga } from './battleSaga';


const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler
      ('modal-window', 'page', 'face-sprite adventure--hero', 'face-gallery', 'item-sprite', 'base-of-adventure');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark z300', 'gui gui-infow', 'gui gui-rogmor_198x63');

const [Journal, FightLeftCorner, FightRightCorner, Modal] = styler('adventure--journal', 'fight-corner--left', 'fight-corner--right', 'modal-dark center-content')

const startingPosition = {x:7, y:8};

export const heroFactory = (heroId, lvl = 1) => ({heroId, name: generateName(), ...profession(lvl)});

export const xyToTopLeft = ({x, y}) => ({top:y * 40 + 78, left:x * 40 + 65});

export const jlog = p => JSON.stringify(p, null, 2) |> console.log

export default () => {
  const [hero, setHero] = useState(null);
  const [position, moveHero] = useState(startingPosition);
  const [journal, setJournal] = useState([]);
  const [enemys, setupEnemys] = useState([]);
  const [fight, setFight] = useState(null);
  const [stepp, incStepp] =  useState(0);
  const [game, setGameState] = useState({isOver: false, play:0});


  useEffect( _ => {
    heroFactory(Math.random() * 100 | 0, 10) |> setHero;    

    const startingCoord = startingPosition |> toCoord;

    [...dryLand]
      .sort(shuffle)
      .filter(coord => coord !== startingPosition)
      .slice(-33)
      .map( coord => ({coord, ...(coord |> coordTo), ...(heroFactory(100 |> rnd, 10 |> rnd))}))
      |> setupEnemys;
  }, [game.play])

  const moveHeroIfCan = move => {
    const target = position |> move |> toCoord;
    if (target |> dryLand.includes) {
      const enemyIndex = enemys.findIndex(({coord}) => coord === target)
      if(enemyIndex >= 0 && enemys[enemyIndex]?.staminaState > 0) {
        actionRound(enemyIndex)
      } else {
        setFight(null);
        moveHero(move);
      }
    }
  }

  const levelUp = (who, amount = 1) => {
    const {type, level, heroId} = who;
    const newLevel = profession(level + amount, type);
    return {...who, ...newLevel, heroId};

  }

  const someOneLoose = who => {
    const looser = enemys.findIndex(({name, heroId}) => name === who?.name && heroId === who?.heroId )
    if (looser >= 0) {
      // setupEnemys(left => {left.splice(looser, 1) ; return left})
      `${enemys[looser].name} beaten ! ` |> console.log
      
      if (enemys[looser].level + 5 >= hero.level) {
        hero |> levelUp |> setHero;
      }
    } else {
      console.log('--- the end ---');
    }
  }

  const letsFight = (a, b) => {
    interval(30) |>
    sample(fromIter(fightSaga(a, b, someOneLoose))) |>
    forEach(log => {
      // log |> console.log;
      incStepp(st => st + 1)
    })
  };

  const actionRound = index => {
    const enemy = enemys[index];
    if (fight) {
      // const enemyPlus = levelUp(enemy);
      // setupEnemys(mobs => {mobs[index] = enemyPlus; return mobs});
      // hero |> levelUp |> setHero;
      setFight(enemy);
    } else {
      setFight(enemy);
      letsFight(hero, enemy)
    }
  }

  const handleKeyboard = ({key}) => {
    if (game.isOver) return;
    switch (key) {
      case 'ArrowUp': return moveHeroIfCan(({x, y}) => ({x ,y: y - 1}));
      case 'ArrowDown': return moveHeroIfCan(({x, y}) => ({x ,y: y + 1}));
      case 'ArrowLeft': return moveHeroIfCan(({x, y}) => ({x:x - 1 ,y}));
      case 'ArrowRight': return moveHeroIfCan(({x, y}) => ({x:x + 1 ,y}));
      case 'i': return hero |> jlog;
      case 'e': return enemys |> jlog;
      case 'j': global.journal = journal;return journal |> jlog;
    }
  }

  // useEffect( _ => setJournal(old => [...old, {...position,...(position |> xyToTopLeft)}]), [position])

  useEffect( _ => {
    if (!game?.isOver && hero?.staminaState <= 0) setGameState(g => ({...g, isOver: true}))
  }, [hero?.staminaState]);

  const playAgain =  _ => {
    setGameState(({play}) => ({play: play + 1, isOver: false}));
    setFight(null)
    incStepp(p=>p+1)
  } 

  return (
    <Modal>
      <BaseOfAdventure onKeyDown={handleKeyboard} tabIndex={0}>  
        <img src={asset + 'img/norebo.jpg'} style={{position:'absolute', top:80, left:65, zIndex:0}}/>
        <img src={asset + 'img/border.png'} style={{position:'absolute', top:0, left:0, zIndex:30, pointerEvents:'none'}}/>
        {journal.map(
          ({top, left}, key) => (
            <Journal key={key} style={{top, left}} />
          )
        )}

        {enemys
          .filter(({staminaState}) => staminaState > 0 )
          .map(
          ({heroId, x, y, name}) => (
            <FaceSprite key={name} data-face={heroId} style={({x, y}) |> xyToTopLeft} />
          )
        )}

        {hero && <FaceSprite data-face={hero?.heroId} style={position |> xyToTopLeft} />}

        {fight && <FightLeftCorner><HeroCard hero={hero} /></FightLeftCorner>}
        {fight && <FightRightCorner><HeroCard hero={fight} /></FightRightCorner>}

        <RogmorLogo style={{position:'absolute', top:23, left:185, zIndex:50}}/>
        
        {game?.isOver && (
          <Modal>
            <DarkPanel onClick={playAgain}><p>the end</p></DarkPanel>
          </Modal>
        )}
      </BaseOfAdventure>
  </Modal>
  );
}