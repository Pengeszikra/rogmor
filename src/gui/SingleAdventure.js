import { useEffect } from "react";
import { dryLand, coordToStyle } from "../rpg/rogmorMap";
import { amount, rnd, shuffle } from "../rpg/rpg";
import { heroFactory } from "./AgesOfTrolls";
import CompactHeroCard from "./CompactHeroCard"
import HeroCard from "./HeroCard";
import { Button, FaceSprite, LoginWindow, NoreboMap } from "./setOfGuiElements";

export default ({troll}) => {

  const [
    {hero, entities, focus}, 
    {modHero, setGameState, setupEntities, focusOn, fight, skill, talk}
  ] = troll;

  useEffect( _ => {
    const area = [...dryLand].sort(shuffle);
    const entitiesArray = area
      .slice(-45)
      .map(coord => ({coord, ...(heroFactory(100 |> rnd, 10 |> rnd))}))
    setupEntities(entitiesArray.reduce((col, {uid, ...rest}) => ({...col, [uid]: ({uid, ...rest})}) , {}));
    modHero(h => ({...h, coord: area[0]}));
  }, []);

  const infoAbout = npc => _ => npc.uid |> focusOn;
  const handleToStart = _ => setGameState(game => ({...game, isPlay: false}))
  const moveHero = direction => ({coord, ...rest}) => {
    const target = coord + direction;
    null |> focusOn;
    if (dryLand.includes(target)) {
      const who = Object.values(entities).find(({coord}) => coord === target );
      if (who) {
        who.uid |> focusOn;
        return ({coord, ...rest});  
      }
      return ({coord: target, ...rest});
    }
    return ({coord, ...rest});
  }

  return (<>
    <section style={{overflowX:'auto', marginBottom: 15}}>
      <NoreboMap>
        {Object.entries(entities).map(
          ([uid, npc]) => (
            <FaceSprite 
              key={uid} 
              data-face={npc?.heroId} 
              data-prof={npc?.profession} 
              style={npc?.coord |> coordToStyle} 
              // onClick={npc |> infoAbout}
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
    {true && (
      <section className="large-button-group" style={{margin:'15px auto'}}>
        <Button inset="primary" onClick={ _ => modHero(   -1 |> moveHero)}>left</Button>
        <Button inset="primary" onClick={ _ => modHero(    1 |> moveHero)}>right</Button>
        <Button inset="primary" onClick={ _ => modHero(-1000 |> moveHero)}>up</Button>
        <Button inset="primary" onClick={ _ => modHero( 1000 |> moveHero)}>down</Button>
      </section>
    )}

    {entities && entities[focus] && (
      <section>
        <HeroCard hero={entities[focus]} style={{fontSize:17}}/>
        <section className="large-button-group" style={{margin:'15px auto'}}>
          <Button inset="primary" onClick={ _ => fight()}>Fight</Button>
          <Button inset="primary" onClick={ _ => skill()}>Skill</Button>
          <Button inset="primary" onClick={ _ =>  talk()}>Talk</Button>
        </section>
      </section>
    )}

    <HeroCard hero={hero} style={{fontSize:17}}/>

    <section className="large-button-group" style={{margin:'15px auto'}}>
      <Button inset="primary" onClick={handleToStart}>Back to start</Button>
    </section>
  </>);
}