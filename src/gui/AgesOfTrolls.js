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
import { fromIter, forEach, filter, take } from 'callbag-basics';
import interval from 'callbag-interval';
import sample from 'callbag-sample';
import { fightSaga } from './battleSaga';
import CompactHeroCard from './CompactHeroCard';
import {useTroll} from 'react-troll';
import { gameReducer, getActionsLookup, initialState } from '../rpg/testTroll';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler
      ('modal-window', 'page', 'face-sprite adventure--hero', 'face-gallery', 'item-sprite adventure--item', 'base-of-adventure');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark z300', 'gui gui-infow', 'gui gui-rogmor_198x63');

const [Journal, FightLeftCorner, FightRightCorner, Modal] = styler('adventure--journal', 'fight-corner--left', 'fight-corner--right', 'modal-dark center-content')

const startingPosition = {x:7, y:8};

export const heroFactory = (heroId, lvl = 1) => ({heroId, name: generateName(), ...profession(lvl)});
export const itemFactory = (itemId) => ({itemId})

export const xyToTopLeft = ({x, y}) => x !== NaN ? ({top:y * 40 + 78, left:x * 40 + 65}) :  ({});

export const jlog = p => JSON.stringify(p, null, 2) |> console.log

const Direction = [-1, +1, -1000, -1001, -999, 999, +1000, 1001];

export default () => {
  const troll = useTroll(gameReducer, initialState, getActionsLookup);
  const [
    { hero, position, journal, enemys, items, fight, stepp, game, underEscaping }, 
    { setHero,moveHero,setJournal,setupEnemys,setupItems,setFight,incStepp,setGameState,runAway, modEnemy }
  ] = troll;

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
      .map( coord => ({coord, ...(coord |> coordTo), ...(heroFactory(100 |> rnd, rnd(10) + 1))}))
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

  const letsFight = (a, b) => {
    interval(30) |>
    sample(fromIter(fightSaga(a, b, someOneLoose))) |>
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

  useEffect( _ => {
    if (!game?.isOver && hero?.staminaState <= 0) setGameState(g => ({...g, isOver: true}))
  }, [hero?.staminaState]);

  const playAgain =  _ => {
    setGameState(({play}) => ({play: play + 1, isOver: false}));
    setFight(null)
    incStepp(p=>p+1)
  } 

  // 20322823

  function * npcSaga (enemys) {
    yield `---- npc are active  ----`;
    const fourDirection = [-1, +1, -1000, +1000];
    while (enemys.filter(checkLive)) {
      const npc = enemys |> pickOne;
      const target = pickOne(fourDirection) + npc.coord;
      if (npc.staminaState > 0 && dryLand.includes(target)) {
        const others = enemys.filter(({coord, uid}) => coord === target && uid !== npc.uid).filter(checkLive);
        // if (others.length) console.log(`${npc?.name} meet with`, others.map(({name}) => name).join(' - '));
        if (others.length) {
          const [another] = others;
          fromIter(fightSaga(npc, another, ({name, level, profession, staminaState}) => {
            // console.log(`${name} ${level}:${profession}`);
            if (npc.level >= level + 3) {
              levelUp(npc, 10) |> modEnemy;
            }
          })) |>
          take(11) |>
          forEach(_ => {})
        }
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
    <Modal>
      <BaseOfAdventure>  
        <img src={asset + 'img/norebo.jpg'} style={{position:'absolute', top:80, left:65, zIndex:0}}/>
        <img src={asset + 'img/border.png'} style={{position:'absolute', top:0, left:0, zIndex:30, pointerEvents:'none'}}/>
        {journal.map(
          ({top, left}, key) => (
            <Journal key={key} style={{top, left}} />
          )
        )}

        {items
          .filter(({isEquiped}) => !isEquiped)
          .map(
          ({itemId, x, y}, key) => (
            <ItemSprite key={key} data-item={itemId} style={({x, y}) |> xyToTopLeft} />
          )
        )}


        {enemys
          .filter(checkLive)
          .map(
          ({heroId, x, y, uid, name, profession, stamina, staminaState, level}) => (
            <div key={uid} className="npc-on-map" style={({x, y}) |> xyToTopLeft}>
              <FaceSprite data-face={heroId} data-prof={profession} />
              <span className="level-indicator">{level}</span>
              <svg className="face-stamina-svg">
                <rect fill="rgba(0,0,0,0.2)" width={100} height={4} x={0} y={0}/>
                <rect fill="rgb(138, 85, 25)" width={100 * staminaState / stamina} height={4} x={0} y={0}/>
              </svg>
            </div>
          )
        )}


        {hero && <FaceSprite data-face={hero?.heroId} style={position |> xyToTopLeft} />}

        {fight && <FightLeftCorner><HeroCard hero={hero} /></FightLeftCorner>}
        {fight && <FightRightCorner><HeroCard hero={fight} /></FightRightCorner>}

        <RogmorLogo style={{position:'absolute', top:23, left:185, zIndex:50}}/>
        
        {game?.isOver && (
          <Modal>
            <DarkPanel onClick={playAgain} style={{position:'relative'}}>
              <p>the end</p>
            </DarkPanel>
          </Modal>
        )}
        {hero && <CompactHeroCard hero={hero} style={{top: 695, left: 100}} />}
      </BaseOfAdventure>
  </Modal>
  );
}