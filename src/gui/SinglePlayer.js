import { Children, useEffect, useState } from 'react';
import {useTroll} from 'react-troll';
import { amount, rnd, uid } from '../rpg/rpg';
import { gameReducer, getActionsLookup, initialState } from '../rpg/singlePlayerTroll';
import CreateHero from './CreateHero';
import GothicWindow from './GothicWindow';
import HeroCard from './HeroCard';
import styler from './scss/styler';
import { BaseOfAdventure, ChatWindow, FaceSprite, InfoPanel, LoginWindow, NoreboMap, RogmorLogo, Button } from './setOfGuiElements';
import SingleAdventure from './SingleAdventure';
import { heroFactory } from './TeamTest';

export const MobilFrame = ({children}) => (
  <GothicWindow style={{filter:'brightness(.7)'}}>
    <section className="mobil-font-setup">
      {children}
    </section>
  </GothicWindow>
);

export default () => {
  const troll = useTroll(gameReducer, initialState, getActionsLookup);
  const [{game}] = troll;

  return (
    <MobilFrame>
      {!game?.isPlay && <CreateHero troll={troll} />}
      {game?.isPlay && <SingleAdventure troll={troll} />}
    </MobilFrame>
  );
}