import React, { useEffect, useState } from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import Leveling from './Leveling';
import Battle from './Battle';
import generateName from '../rpg/generateName';
import profession from '../rpg/profession';
import { rnd, shuffle, improved, pickOne } from '../rpg/rpg';
import { abToCoord, coordTo, dryLand, toCoord } from '../rpg/rogmorMap';
import HeroCard from './HeroCard';
import { fromIter, forEach, filter } from 'callbag-basics';
import interval from 'callbag-interval';
import sample from 'callbag-sample';
import { fightSaga } from './battleSaga';
import CompactHeroCard from './CompactHeroCard';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler
      ('modal-window', 'page', 'face-sprite adventure--hero', 'face-gallery', 'item-sprite adventure--item', 'mobil-page');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark z300', 'gui gui-infow', 'gui gui-rogmor_198x63');

const [Journal, FightLeftCorner, FightRightCorner, Modal] = styler('adventure--journal', 'fight-corner--left', 'fight-corner--right', 'modal-mobile center-content')

const [FightModal, BottomArea, Button] = styler('modal-mobile fight-wraper', 'bottom-area', 'mobil-btn center-content');

const startingPosition = {x:7, y:8};

export const heroFactory = (heroId, lvl = 1) => ({heroId, name: generateName(), ...profession(lvl)});
export const itemFactory = (itemId) => ({itemId})

export const xyToTopLeft = ({x, y}) => ({top:y * 40 + 00, left:x * 40 + 00});

export const jlog = p => JSON.stringify(p, null, 2) |> console.log

const Direction = [-1, +1, -1000, -1001, -999, 999, +1000, 1001];

export default () => {
  const [hero, setHero] = useState(null);
  const [position, moveHero] = useState(startingPosition);
  const [journal, setJournal] = useState([]);
  const [enemys, setupEnemys] = useState([]);
  const [items, setupItems] = useState([]);
  const [fight, setFight] = useState(null);
  const [stepp, incStepp] =  useState(0);
  const [game, setGameState] = useState({isOver: false, play:0});
  const [underEscaping, runAway] = useState(false);

  const logInc = log => {incStepp(st => st + 1); log |> console.log};
  const justInc = log => incStepp(st => st + 1);
  const dontCollected = ({isEquiped}) => isEquiped;

  useEffect( _ => {
    heroFactory(Math.random() * 100 | 0, 5) |> setHero;    

    const startingCoord = startingPosition |> toCoord;
    

    [...dryLand]
      .sort(shuffle)
      .filter(coord => coord !== startingPosition)
      .slice(-9)
      .map( coord => ({coord, ...(coord |> coordTo), ...(itemFactory(44 |> rnd))}))
      |> setupItems;

    [...dryLand]
      .sort(shuffle)
      .filter(coord => coord !== startingPosition)
      .slice(-77)
      .map( coord => ({coord, ...(coord |> coordTo), ...(heroFactory(100 |> rnd, 10 |> rnd))}))
      |> setupEnemys;
  }, [game.play])

  useEffect( _ => {
    if (!enemys.length) return;
    letsNpcAlaive(enemys)
  }, [game.play, enemys])

  const moveHeroIfCan = move => {
    const target = position |> move |> toCoord;
    if (target |> dryLand.includes) {
      const enemyIndex = enemys.findIndex(({coord}) => coord === target)
      if(enemyIndex >= 0 && enemys[enemyIndex]?.staminaState > 0) {
        actionRound(enemyIndex)
      } else {
        setFight(null);
        moveHero(move);
        const itemIndex = items.findIndex(({coord}) => coord === target)
        if (itemIndex >= 0) {
          // console.log('--- found ---', items[itemIndex])
          equipItem(itemIndex)
        }
      }
    }
  }

  const levelUp = (who, amount = 1) => {
    const {type, level, heroId} = who;
    const newLevel = profession(level + amount, type);
    return {...who, ...newLevel, heroId};

  }

  const someOneLoose = who => {
    if (who === null) return setFight(null);
    const looser = enemys.findIndex(({name, heroId}) => name === who?.name && heroId === who?.heroId )
    if (looser >= 0) {
      `${enemys[looser].name} beaten ! ` |> console.log
      
      if (enemys[looser].level >= hero.level) {
        hero |> levelUp |> setHero;
      }
    } else {
      console.log('--- the end ---');
    }
    setFight(null)
  }

  const stayInBattle = who => {
    if (who === hero && underEscaping) {
      runAway(false);
      return false
    };
    return true;
  }

  const letsFight = (a, b) => {
    interval(30) |>
    sample(fromIter(fightSaga(a, b, someOneLoose, stayInBattle))) |>
    forEach(justInc)
  };

  const actionRound = index => {
    const enemy = enemys[index];
    if (fight) {
      setFight(enemy);
    } else {
      setFight(enemy);
      letsFight(hero, enemy)
    }
  }

  const equipItem = index => {
    const found = items[index]
    if (!found.isEquiped) {
      hero |> levelUp |> setHero;
      const lessItem = items.map(item => found === item ?  ({...item, isEquiped: true}): item);
      // console.log(lessItem)
      setupItems(lessItem)
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
      case 'e': {
        console.log('--->> escape <<--- !!'); 
        true |> runAway;
        return
      };
      case 'j': global.journal = journal; return journal |> jlog;
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

  function * npcSaga (enemys) {
    yield `---- npc are active  ----`;
    const fourDirection = [-1, +1, -1000, +1000];
    // let n = 10000;
    let liveEnemy = enemys.filter(checkLive);
    while (liveEnemy.length) {
      let npc = enemys[enemys.length |> rnd];
      const target = pickOne(fourDirection) + npc.coord;
      if (dryLand.includes(target)) {
        const {x, y} = target |> coordTo;
        npc.coord = target;
        npc.x = x;
        npc.y = y; 
        // n--;
        yield ` npc: ${npc.name} ${target}`;  
      }
    }
  }


  const letsNpcAlaive = (enemys) => {
    interval(30) |>
    sample(fromIter(npcSaga(enemys))) |>
    forEach(justInc)
  };

  const checkLive = ({staminaState}) => staminaState > 0;

  useEffect( _ => {
    document.addEventListener("keydown", handleKeyboard);
    return _ => document.removeEventListener("keydown", handleKeyboard);
  }, [stepp])

  return (


      <div className="rogmor-mobil-base" >
        <div className="norebo-map-r-90">

        {journal.map(
          ({top, left}, key) => (
            <Journal key={key} style={{top, left}} />
          )
        )}

        {enemys
          .filter(checkLive)
          .map(
          ({heroId, x, y, name, profession}) => (
            <FaceSprite key={name} data-face={heroId} data-prof={profession} style={({x, y}) |> xyToTopLeft} />
          )
        )}

        {items
          .filter(({isEquiped}) => !isEquiped)
          .map(
          ({itemId, x, y}, key) => (
            <ItemSprite key={key} data-item={itemId} style={({x, y}) |> xyToTopLeft} />
          )
        )}

        {hero && <FaceSprite data-face={hero?.heroId} style={position |> xyToTopLeft} />}        
        </div>
        {game?.isOver && (
          <Modal>
            <DarkPanel onClick={playAgain} style={{position:'relative'}}>
              <p>the end</p>
            </DarkPanel>
          </Modal>
        )}

        {fight && (
          <FightModal style={{height:'70%'}}>
            <HeroCard hero={hero} />
            <HeroCard hero={fight} />
          </FightModal>
        )}

        <BottomArea>
          <InfoPanel>
            <div className="zi-2000">
              <Button onClick ={_ => moveHeroIfCan(({x, y}) => ({x ,y: y - 1}))} style={{top:  80, left: 120}}>up</Button>
              <Button onClick ={_ => moveHeroIfCan(({x, y}) => ({x ,y: y + 1}))} style={{top: 170, left: 120}}>down</Button>
              <Button onClick ={_ => moveHeroIfCan(({x, y}) => ({x:x - 1 ,y}))} style={{top: 125, left: 70}}>left</Button>
              <Button onClick ={_ => moveHeroIfCan(({x, y}) => ({x:x + 1 ,y}))} style={{top: 125, left: 160}}>right</Button>
            </div>
            {hero && <CompactHeroCard hero={hero} style={{pointerEvent:'none'}}/>}
          </InfoPanel>
        </BottomArea>
      </div>

  );
}