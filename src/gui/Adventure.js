import React, { useEffect, useState } from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import Leveling from './Leveling';
import Battle from './Battle';
import generateName from '../rpg/generateName';
import profession from '../rpg/profession';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler
      ('modal-window', 'page', 'face-sprite adventure--hero', 'face-gallery', 'item-sprite', 'base-of-adventure');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow', 'gui gui-rogmor_198x63');

const [Journal] = styler('adventure--journal')    

export const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});      

export default () => {
  const [hero, setHero] = useState(null)
  const [position, moveHero] = useState({x:7, y:8})
  const [journal, setJournal] = useState([])

  useEffect( _ => {
    const baby = heroFactory(Math.random() * 100 | 0) 
    baby |> setHero;
  }, [])

  const handleKeyboard = ({key}) => {
    switch (key) {
      case 'ArrowUp': return moveHero(({x, y}) => ({x ,y: y - 1}));
      case 'ArrowDown': return moveHero(({x, y}) => ({x ,y: y + 1}));
      case 'ArrowLeft': return moveHero(({x, y}) => ({x:x - 1 ,y}));
      case 'ArrowRight': return moveHero(({x, y}) => ({x:x + 1 ,y}));
      case 'i': {
        JSON.stringify(hero, null, 2) |> console.log
      } 

    }
  }

  useEffect( _ => {
    console.log(position, journal)
    const {x, y} = position;
    setJournal(old => [...old, {top:y * 40 + 78, left:x * 40 + 65}])
  }, [position])


  return (
    <BaseOfAdventure onKeyDown={handleKeyboard} tabIndex={0}>  
        <img src={asset + 'img/norebo.jpg'} style={{position:'absolute', top:80, left:65, zIndex:0}}/>
        <img src={asset + 'img/border.png'} style={{position:'absolute', top:0, left:0, zIndex:30, pointerEvents:'none'}}/>
        {hero && (
          <FaceSprite
            data-face={hero?.heroId}
            style={{top:position.y * 40 + 78, left:position.x * 40 + 65}} 

          />
        )}

        {journal.map(
          ({top, left}, key) => (
            <Journal key={key} style={{top, left}} />
          )
        )}
        
        {/* <FaceSprite data-face={35} style={{position:'absolute', top:118 + 40, left:105 + 40, zIndex:11}} /> */}
        <RogmorLogo style={{position:'absolute', top:23, left:185, zIndex:50}}/>

  </BaseOfAdventure>
  );
}