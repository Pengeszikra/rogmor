import {  useEffect } from "react";

import { dryLand, coordToStyle } from "../rpg/rogmorMap";
import {  rnd, shuffle } from "../rpg/rpg";

import HeroCard from "../gui/HeroCard";
import HeroCardLine from "../gui/HeroCardLine";
import { Button, FaceSprite,  NoreboMap, Button70, ItemSprite, ModalWindow, DarkPanel } from "../gui/setOfGuiElements";
import { heroFactory } from '../rpg/heroFactory';
import { CombatOutcome, GameMode } from "../rpg/singlePlayerTroll";

const capableOfAction = ({staminaState, willState, joyfulState}) => staminaState && willState && joyfulState;

export default function SingleAdventure({state, army}) {
  const {hero, entities, focus, actionAnim, combatResult} = state;
  const {modHero, setGameState, setupEntities, focusOn, fight, skill, talk, playActionAnim, setHero, levelUpHero} = army;

  const playAnim = anim => {
    playActionAnim(anim);
    setTimeout(_ => playActionAnim(null) , 330);
  };

  useEffect( () => {
    const area = [...dryLand].sort(shuffle);
    const entitiesArray = area
      .slice(-45)
      .map(coord => ({coord, ...(heroFactory(rnd(100), rnd(10) + 1))}))
    setupEntities(entitiesArray.reduce((col, {uid, ...rest}) => ({...col, [uid]: ({uid, ...rest})}) , {}));
    modHero(h => ({...h, coord: area[0]}));
  }, []);

  useEffect(() => {
    if (combatResult === CombatOutcome.HERO_DIE) {
      setHero(null);
      setGameState(GameMode.ROLL_CHARACTER);
    }

    if (combatResult?.outcome === CombatOutcome.NPC_DIE) {
      levelUpHero();
    }
  }, [combatResult]);

  const infoAbout = npc => _ => focusOn(npc.uid);
  const handleToStart = _ => setGameState(GameMode.ROLL_CHARACTER)
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
        <NoreboMap style={!entities[focus] ? {position:'relative'} : {position:'absolute', visibility:'hidden'}}>
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
    {false && entities && entities[focus] && (
      <section className="inbox-interaction">
        <HeroCardLine hero={entities[focus]} />
        <section className="m-4 w-full grid grid-cols-2 gap-2">
          <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => {playAnim(1); fight()}}>Fight</button>
          <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => {playAnim(10); skill()}}>Skill</button>
          <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => {playAnim(43); talk()}}>Talk</button>
          <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => {focusOn(null)}}>Escape</button>
        </section>
        <HeroCardLine hero={hero} />
        {actionAnim && <ItemSprite data-item={actionAnim} data-anim={actionAnim} />}
      </section>
    )}
    {!entities[focus] && (
      <section className="m-4 grid grid-cols-3 gap-2">
        <div></div>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => modHero(moveHero(-1000))}>up</button>
        <div></div>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => modHero(moveHero(   -1))}>left</button>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => modHero(moveHero( 1000))}>down</button>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => modHero(moveHero(    1))}>right</button>
      </section>
    )}

    {entities && entities[focus] && (
      <section>
        <HeroCard hero={entities[focus]} style={{fontSize:17}}/>
      </section>
    )}

    <HeroCard hero={hero} style={{fontSize:17}}/>

    <button className="bg-sky-800 hover:bg-sky-600 p-2 text-lg rounded-lg w-full my-4" onClick={handleToStart}>Back to start</button>

  </>);
}