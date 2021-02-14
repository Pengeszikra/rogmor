import { useEffect, useState } from 'react';
import { rnd, uid } from '../rpg/rpg';
import GothicWindow from './GothicWindow';
import HeroCard from './HeroCard';
import styler from './scss/styler';
import { BaseOfAdventure, ChatWindow, FaceSprite, InfoPanel, LoginWindow, NoreboMap, RogmorLogo } from './setOfGuiElements';
import { heroFactory } from './TeamTest';


export default () => {

  const [listOfNPC, setNPC] = useState([
  ]);

  useEffect( _ => {
    Array(6).fill().map(
      _ => heroFactory(rnd(100), rnd(100) + 1)
    ) |> setNPC;
  }, []);


  return (
    <GothicWindow style={{filter:'brightness(.7)'}}>
      <section style={{color:'#FED', fontSize:13}}>
        <LoginWindow style={{margin:'0 auto'}}>
          <h1 style={{padding:30, color:'#000'}}>Simple react based RPG</h1>
        </LoginWindow>
        <ul>
          <li>with real time idle fight</li>
          <li>strong use of pipeline operator</li>
          <li>ML controlled npc</li>
          <li>living world in one map</li>
          <li>really minimal graphic</li>
          <li>team build system</li>
          <li>gui editor maybe for some much faster development</li>
          <li>9 slice borders</li>
          <li>responsive size</li>
        </ul>
      </section>

      <section style={{overflowX:'auto'}}>
        <NoreboMap  />
      </section>

      <div style={{display:'flex', flexWrap:'wrap'}}>
        {listOfNPC.map(npc => <HeroCard key={npc.uid} hero={npc} />)}
      </div>

      <ChatWindow></ChatWindow>
    </GothicWindow>
  );
}