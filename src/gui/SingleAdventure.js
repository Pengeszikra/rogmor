import { useState, useEffect } from "react";
import profession from "../rpg/profession";
import { dryLand, coordToStyle } from "../rpg/rogmorMap";
import { amount, rnd, shuffle } from "../rpg/rpg";
import { heroFactory } from "./AgesOfTrolls";
import CompactHeroCard from "./CompactHeroCard"
import HeroCard from "./HeroCard";
import HeroCardLine from "./HeroCardLine";
import { Button, FaceSprite, LoginWindow, NoreboMap, Button70, ItemSprite } from "./setOfGuiElements";

const capableOfAction = ({staminaState, willpowerState, merryState}) => staminaState && willpowerState && merryState;

export default ({troll}) => {
  const [
    {hero, entities, focus, actionAnim}, 
    {modHero, setGameState, setupEntities, focusOn, fight, skill, talk, playActionAnim}
  ] = troll;

  const playAnim = anim => {
    anim |> playActionAnim;
    setTimeout(_ => null |> playActionAnim , 330);
  };

  useEffect( _ => {
    const area = [...dryLand].sort(shuffle);
    const entitiesArray = area
      .slice(-45)
      .map(coord => ({coord, ...(heroFactory(100 |> rnd, rnd(10) + 1))}))
    setupEntities(entitiesArray.reduce((col, {uid, ...rest}) => ({...col, [uid]: ({uid, ...rest})}) , {}));
    modHero(h => ({...h, coord: area[0]}));
  }, []);

  const infoAbout = npc => _ => npc.uid |> focusOn;
  const handleToStart = _ => setGameState(game => ({...game, isPlay: false}))
  const moveHero = direction => ({coord, ...rest}) => {
    const target = coord + direction;
    null |> focusOn;
    if (dryLand.includes(target)) {
      const who = Object.values(entities).filter(capableOfAction).find(({coord}) => coord === target );
      if (who) {
        who.uid |> focusOn;
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
              style={coord |> coordToStyle} 
            />
          )
        )}
        {hero?.coord && (
          <FaceSprite 
            data-face={hero?.heroId} 
            style={hero.coord |> coordToStyle} 
            onClick={_ => null |> focusOn}
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
    {true && (
      <section className="large-button-group" style={{margin:0, width: 230, position: 'relative'}}>
        <Button70 inset="primary" onClick={ _ => modHero(-1000 |> moveHero)} style={{margin: '10px 50px'}}>up</Button70>
        <Button70 inset="primary" onClick={ _ => modHero(   -1 |> moveHero)}>left</Button70>
        <Button70 inset="primary" onClick={ _ => modHero( 1000 |> moveHero)}>down</Button70>
        <Button70 inset="primary" onClick={ _ => modHero(    1 |> moveHero)}>right</Button70>
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