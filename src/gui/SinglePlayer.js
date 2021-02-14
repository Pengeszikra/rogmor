import { useEffect, useState } from 'react';
import { rnd, uid } from '../rpg/rpg';
import GothicWindow from './GothicWindow';
import HeroCard from './HeroCard';
import styler from './scss/styler';
import { BaseOfAdventure, ChatWindow, FaceSprite, InfoPanel, LoginWindow, NoreboMap, RogmorLogo, Button } from './setOfGuiElements';
import { heroFactory } from './TeamTest';


export default () => {

  const [listOfNPC, setNPC] = useState([heroFactory(rnd(100), rnd(100) + 1)]);

  return (
    <GothicWindow style={{filter:'brightness(.7)'}}>
      <section className="mobil-font-setup">
        <LoginWindow style={{margin:'0 auto'}}>
          <h1 style={{padding:30, color:'#000'}}>Simple react based RPG</h1>
        </LoginWindow>
        <ul>
          <li>create hero</li>
          <li>quest</li>
          <li>fight</li>
          <li>skill</li>
          <li>collect item</li>
          <li>collect experience</li>
          <li>level up hero</li>
          <li>auto fight</li>
          <li>live area</li>
        </ul>
      </section>
      <section className="large-button-group">
        <Button inset="primary">Adventure</Button>
        <Button inset="dark">Setup</Button>
        <Button inset="bright">Work</Button>
        <Button>Fight</Button>
      </section>
      <section style={{overflowX:'auto'}}>
        <NoreboMap  />
      </section>
    </GothicWindow>
  );
}