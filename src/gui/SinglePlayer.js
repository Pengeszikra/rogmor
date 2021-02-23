import { Children, useEffect, useState } from 'react';
import profession, { profTypes } from '../rpg/profession';
import { amount, rnd, uid } from '../rpg/rpg';
import { useSinglePlayerReducer } from '../rpg/singlePlayerTroll';
import { useEntitiReducer } from '../rpg/useEntitiReduce';
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
  const troll = useSinglePlayerReducer();
  const [{game}] = troll;
  const [test, {levelUp}] = useEntitiReducer(1);
  useEffect( _ => {
    console.log(test)
    if (test?.level < 10) levelUp()
  }, [test])

  return (
    <MobilFrame>
      {!game?.isPlay && <CreateHero troll={troll} />}
      {game?.isPlay && <SingleAdventure troll={troll} />}
    </MobilFrame>
  );
}