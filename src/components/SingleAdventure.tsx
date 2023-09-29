import {  FC, useEffect, useRef } from "react";

import { dryLand, coordToStyle } from "../rpg/rogmorMap";
import {  rnd, shuffle, uid, pickOne } from "../rpg/rpg";

import HeroCard from "../gui/HeroCard";
import { FaceSprite } from "../gui/setOfGuiElements";
import { CombatOutcome, GameMode, MainState, StateArmy } from "../rpg/singlePlayerTroll";
import { mobFactory, professionList, traitsFactory, Team, Mob } from "../rpg/profession";
import { generateName } from "../rpg/generateName";

const capableOfAction = ({condition:{staminaState, focusState, moraleState}}:Mob) => staminaState && focusState && moraleState;

const HERO_STARTING_COORD = 6005;

export const SingleAdventure:FC<StateArmy> = ({state, army}) => {
  const {hero, entities, focus, actionAnim, combatResult} = state as MainState;
  const {MOD_HERO, SET_GAME_STATE, SETUP_ENTITIES, FOCUS_ON, PLAY_ACTION_ANIM, SET_HERO, LEVEL_UP_HERO, ENCOUNTER_BEGIN} = army;

  const mapRef = useRef(null);

  useEffect(() => { 
    if (!mapRef.current) return;
    const autoScroll = () => {
      mapRef.current.scrollLeft = 100;
    };
    mapRef.current.addEventListener("scroll", autoScroll);
    return () => mapRef?.current && mapRef.current.removeEventListener("scroll", autoScroll);
  }, [mapRef, hero?.coord])

  const playAnim = anim => {
    PLAY_ACTION_ANIM(anim);
    setTimeout(_ => PLAY_ACTION_ANIM(null) , 330);
  };

  useEffect( () => {
    const area = dryLand
      .filter(coord => coord !== HERO_STARTING_COORD)
      .sort(shuffle)
    ;
    const entitiesArray:Mob[] = area
      .slice(-45)
      .map(coord => mobFactory(
        generateName(),
        rnd(100),
        coord,
        uid(),
        Team.BAD,
        traitsFactory(rnd(10), pickOne(professionList))
      ))

    const entitiesLookup:Record<string, Mob> = Object.fromEntries(entitiesArray.map(mob => [mob.uid, mob]));

    SETUP_ENTITIES(entitiesLookup);

    MOD_HERO(h => ({...h, coord: HERO_STARTING_COORD}));
  }, []);

  useEffect(() => {
    if (combatResult === CombatOutcome.HERO_DIE) {
      SET_HERO(null);
      SET_GAME_STATE(GameMode.ROLL_CHARACTER);
    }

    if (combatResult?.outcome === CombatOutcome.NPC_DIE) {
      LEVEL_UP_HERO(null);
    }
  }, [combatResult]);

  const infoAbout = npc => () => FOCUS_ON(npc.uid);
  const handleToStart = () => SET_GAME_STATE(GameMode.ROLL_CHARACTER)
  const moveHero = direction => ({coord, ...rest}) => {
    const target = coord + direction;
    FOCUS_ON(null);
    if (dryLand.includes(target)) {
      const who = Object.values(entities).filter(capableOfAction).find(({coord}) => coord === target );
      if (who) {
        FOCUS_ON(who?.uid);
        ENCOUNTER_BEGIN(null);
        return ({coord, ...rest});
      }
      return ({coord: target, ...rest});
    }
    return ({coord, ...rest});
  }

  return (<>
    <section style={{overflowX:'auto', position:'relative'}}>
      <div 
        className="norebo-map-r-90" 
        style={!entities[focus] ? {position:'relative'}  : {position:'absolute', visibility:'hidden'}}
        ref={mapRef}
      >
        {Object.values(entities).filter(capableOfAction).map(
          ({uid, avatar, professionType, coord}) => (
            <FaceSprite 
              key={uid} 
              data-face={avatar} 
              data-prof={professionType} 
              style={coordToStyle(coord)} 
            />
          )
        )}
        {hero?.coord && (
          <FaceSprite 
            data-face={hero?.avatar} 
            style={coordToStyle(hero.coord)} 
            onClick={() => FOCUS_ON(null)}
          />
        )}
      </div>
    </section>
    {!entities[focus] && (
      <section className="m-4 grid grid-cols-3 gap-2">
        <div></div>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => MOD_HERO(moveHero(-1000))}>north</button>
        <div></div>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => MOD_HERO(moveHero(   -1))}>west</button>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => MOD_HERO(moveHero( 1000))}>south</button>
        <button className="rounded-lg p-2 text-lg bg-sky-600" onClick={ _ => MOD_HERO(moveHero(    1))}>east</button>
      </section>
    )}

    {false && entities && entities[focus] && (
      <section>
        <HeroCard hero={entities[focus]} style={{fontSize:17}}/>
      </section>
    )}

    { !focus && (
      <>
        <HeroCard hero={hero} style={{fontSize:17}}/>
        <button className="bg-sky-800 hover:bg-sky-600 p-2 text-lg rounded-lg w-full my-4" onClick={handleToStart}>Back to start</button>
      </>
    )}


  </>);
}