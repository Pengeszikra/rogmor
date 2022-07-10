import {  useEffect } from "react";

import { dryLand, coordToStyle } from "../rpg/rogmorMap";
import {  rnd, shuffle } from "../rpg/rpg";

import HeroCard from "../gui/HeroCard";
import HeroCardLine from "../gui/HeroCardLine";
import { Button, FaceSprite,  NoreboMap, Button70, ItemSprite } from "../gui/setOfGuiElements";
import { heroFactory } from '../rpg/heroFactory';

const capableOfAction = ({staminaState, willpowerState, merryState}) => staminaState && willpowerState && merryState;

export default function SingleAdventure({state, army}) {
  const {hero, entities, focus, actionAnim, combatResult} = state;
  const {modHero, setGameState, setupEntities, focusOn, fight, skill, talk, playActionAnim} = army;

  const playAnim = anim => {
    playActionAnim(anim);
    setTimeout(_ => playActionAnim(null) , 330);
  };

  useEffect( _ => {
    const area = [...dryLand].sort(shuffle);
    const entitiesArray = area
      .slice(-45)
      .map(coord => ({coord, ...(heroFactory(rnd(100), rnd(10) + 1))}))
    setupEntities(entitiesArray.reduce((col, {uid, ...rest}) => ({...col, [uid]: ({uid, ...rest})}) , {}));
    modHero(h => ({...h, coord: area[0]}));
  }, []);

  const infoAbout = npc => _ => focusOn(npc.uid);
  const handleToStart = _ => setGameState(game => ({...game, isPlay: false}))
  const moveHero = direction => ({coord, ...rest}) => {
    const target = coord + direction;
    focusOn(null);
    if (dryLand.includes(target)) {
      const who = Object.values(entities).filter(capableOfAction).find(({coord}) => coord === target );
      if (who) {
        focusOn(who.uid);
        return ({coord, ...rest});  
      }
      return ({coord: target, ...rest});
    }
    return ({coord, ...rest});
  }

  return (<>
    <section style={{overflowX:'auto', position:'relative'}}>
      <NoreboMap>
        {Object.values(entities).filter(capableOfAction).map(
          ({uid, heroId, profession, coord}) => (
            <FaceSprite 
              key={uid} 
              data-face={heroId} 
              data-prof={profession} 
              style={coordToStyle(coord)} 
            />
          )
        )}
        {hero?.coord && (
          <FaceSprite 
            data-face={hero?.heroId} 
            style={coordToStyle(hero.coord)} 
            onClick={() => focusOn(null)}
          />
        )}

      </NoreboMap>
    </section>
    {entities && entities[focus] && (
      <section className="combat-line-undermap">
        <div className="combat-line-holder">
          <HeroCardLine hero={hero} />
          {actionAnim && <ItemSprite data-item={actionAnim} data-anim={actionAnim} />}
          <HeroCardLine hero={entities[focus]} />
        </div>
      </section>
    )}
    {combatResult && (
      <p>{combatResult}</p>
    )}
    {true && (
      <section className="large-button-group" style={{margin:0, width: 230, position: 'relative'}}>
        <Button70 inset="primary" onClick={ _ => modHero(moveHero(-1000))} style={{margin: '10px 50px'}}>up</Button70>
        <Button70 inset="primary" onClick={ _ => modHero(moveHero(   -1))}>left</Button70>
        <Button70 inset="primary" onClick={ _ => modHero(moveHero( 1000))}>down</Button70>
        <Button70 inset="primary" onClick={ _ => modHero(moveHero(    1))}>right</Button70>
      </section>
    )}

    {entities && entities[focus] && (
      <section>
        <section className="large-button-group" style={{margin:0, width: 300}}>
          <Button70 inset="light" onClick={ _ => {playAnim(1); fight()}}>Fight</Button70>
          <Button70 inset="light" onClick={ _ => {playAnim(10); skill()}}>Skill</Button70>
          <Button70 inset="light" onClick={ _ => {playAnim(43); talk()}}>Talk</Button70>
          <Button70 inset="light" onClick={ _ =>  {}}>Escape</Button70>
        </section>
        <HeroCard hero={entities[focus]} style={{fontSize:17}}/>
      </section>
    )}

    <HeroCard hero={hero} style={{fontSize:17}}/>

    <section className="large-button-group" style={{margin:'15px auto'}}>
      <Button inset="primary" onClick={handleToStart}>Back to start</Button>
    </section>

  </>);
}