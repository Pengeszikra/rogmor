import { useEffect, useState } from 'react';
import { rnd, uid } from '../rpg/rpg';
import GothicWindow from './GothicWindow';
import HeroCard from './HeroCard';
import styler from './scss/styler';
import { heroFactory } from './TeamTest';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite, BaseOfAdventure] = styler
      ('modal-window', 'page', 'face-sprite adventure--hero', 'face-gallery', 'item-sprite adventure--item', 'mobil-page');

const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel, RogmorLogo] = styler
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark z300', 'gui gui-infow', 'gui gui-rogmor_198x63');

export default () => {

  const [listOfNPC, setNPC] = useState([
  ]);

  useEffect( _ => {
    Array(6).fill().map(
      _ => heroFactory(rnd(100), rnd(100) + 1)
    ) |> setNPC;
  }, []);


  return (
    <GothicWindow>
      <FaceSprite data-face={5} />
      <pre style={{color:'#FED', fontSize:18}}>{`
      
Rogmor test RPG

- with real time idle fight
- ML controlled npc
- living world in one map
- really minimal graphic
- team build system
- gui editor maybe for some much faster development
- nine 9 slice borders
- responsive size

${'-'.repeat(64)}
      `
      }</pre>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {listOfNPC.map(npc => <HeroCard key={npc.uid} hero={npc} />)}
      </div>
    </GothicWindow>
  );
}