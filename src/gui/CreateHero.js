import { Children, useEffect, useState } from 'react';
import {useTroll} from 'react-troll';
import { amount, rnd, uid } from '../rpg/rpg';
import { gameReducer, getActionsLookup, initialState } from '../rpg/singlePlayerTroll';
import GothicWindow from './GothicWindow';
import HeroCard from './HeroCard';
import styler from './scss/styler';
import { BaseOfAdventure, ChatWindow, FaceSprite, InfoPanel, LoginWindow, NoreboMap, RogmorLogo, Button } from './setOfGuiElements';
import { heroFactory } from './TeamTest';

export default ({troll}) => {
  const [{
    hero,
  },{
    setHero, setGameState,
  }] = troll;

  const handleRollHero = _ => heroFactory(100 |> rnd, 7) |> setHero;
  const handleLetsAdventure = _ => setGameState(game =>({...game, isPlay:true}));

  return (<>
    <LoginWindow style={{margin:'0 auto'}}>
      <h1 style={{padding:30, color:'#000'}}>Rogmor Roll Play Game</h1>
    </LoginWindow>
    <p>Welcome young adventurer!</p>
    <p>You are stepp into another dimension, called: Rogmor and ther is a lot of opportunity to fullfill your dreams, at first stepp is choice your character.</p>
    <p>Don't afraid there is no worst choice, and you can learn something different.</p>
    <p>Rogmor under chaotic statement at moment so prophecy talking about a skillfull hero, who will be restor odrer and peace to this land.</p>
    {/* <section style={{overflowX:'auto'}}><NoreboMap/></section> */}
    <section className="large-button-group" style={{width:200, margin:'0 auto'}}>
      <Button inset="primary" onClick={handleRollHero}>Roll your character</Button>
    </section>
    {hero && <HeroCard hero={hero} style={{fontSize:17}}/>}
    {hero && (
      <section className="large-button-group" style={{width:200, margin:'15px auto'}}>
        <Button inset="primary" onClick={handleLetsAdventure}>select this hero
          <FaceSprite data-face={hero.heroId} style={{left:-20, top:-7}} />
        </Button>
        </section>
      )}
  </>);
}