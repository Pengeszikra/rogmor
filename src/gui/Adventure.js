import React, { useEffect, useState } from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import Leveling from './Leveling';
import Battle from './Battle';
import generateName from '../rpg/generateName';
import profession from '../rpg/profession';
import { rnd, shuffle } from '../rpg/rpg';
import { abToCoord, coordTo, dryLand, toCoord } from '../rpg/rogmorMap';
import HeroCard from './HeroCard';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler
      ('modal-window', 'page', 'face-sprite adventure--hero', 'face-gallery', 'item-sprite', 'base-of-adventure');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow', 'gui gui-rogmor_198x63');

const [Journal, FightLeftCorner, FightRightCorner] = styler('adventure--journal', 'fight-corner--left', 'fight-corner--right')

const startingPosition = {x:7, y:8};

export const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

export const xyToTopLeft = ({x, y}) => ({top:y * 40 + 78, left:x * 40 + 65});

export const jlog = p => JSON.stringify(p, null, 2) |> console.log

export default () => {
  const [hero, setHero] = useState(null);
  const [position, moveHero] = useState(startingPosition);
  const [journal, setJournal] = useState([]);
  const [enemys, setupEnemys] = useState([]);
  const [fight, setFight] = useState(null);

  useEffect( _ => {
    const born = heroFactory(Math.random() * 100 | 0);
    born |> setHero;
    const startingCoord = startingPosition |> toCoord;

    [...dryLand]
      .sort(shuffle)
      .filter(coord => coord !== startingPosition)
      .slice(-33)
      .map( coord => ({coord, ...(coord |> coordTo), ...(100 |> rnd |> heroFactory)}))
      |> setupEnemys;
  }, [])

  const moveHeroIfCan = move => {
    const target = position |> move |> toCoord;
    if (target |> dryLand.includes) {
      const enemyIndex = enemys.findIndex(({coord}) => coord === target)
      if(enemyIndex >= 0) {
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

  const actionRound = index => {
    const enemy = enemys[index];
    if (fight) {
      const enemyPlus = levelUp(enemy);
      setupEnemys(mobs => {mobs[index] = enemyPlus; return mobs});
      // hero |> levelUp |> setHero;
      setFight(enemy);
    } else {
      setFight(enemy);
    }
  }

  const handleKeyboard = ({key}) => {
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


  return (
    <Page>
      <BaseOfAdventure onKeyDown={handleKeyboard} tabIndex={0}>  
        <img src={asset + 'img/norebo.jpg'} style={{position:'absolute', top:80, left:65, zIndex:0}}/>
        <img src={asset + 'img/border.png'} style={{position:'absolute', top:0, left:0, zIndex:30, pointerEvents:'none'}}/>
        {journal.map(
          ({top, left}, key) => (
            <Journal key={key} style={{top, left}} />
          )
        )}

        {enemys.map(
          ({heroId, x, y}, key) => (
            <FaceSprite key={key} data-face={heroId} style={({x, y}) |> xyToTopLeft} />
          )
        )}

        {hero && <FaceSprite data-face={hero?.heroId} style={position |> xyToTopLeft} />}

        {fight && <FightLeftCorner><HeroCard hero={hero} /></FightLeftCorner>}
        {fight && <FightRightCorner><HeroCard hero={fight} /></FightRightCorner>}

        <RogmorLogo style={{position:'absolute', top:23, left:185, zIndex:50}}/>
      </BaseOfAdventure>
  </Page>
  );
}