import { rnd } from '../rpg/rpg';
import HeroCard from '../gui/HeroCard';
import getConfig from 'next/config';

import { FaceSprite, LoginWindow, Button } from '../gui/setOfGuiElements';
import { heroFactory } from '../rpg/heroFactory';

export default function CreateHero({state, army}) {
  const { hero } = state;
  const { setHero, setGameState } = army;

  const { publicRuntimeConfig:{version} } = getConfig();

  const handleRollHero = _ => setHero(heroFactory(rnd(100), 7));
  const handleLetsAdventure = _ => {
    setGameState(game =>({...game, isPlay:true}))
    return;
  };

  return (<>
    <LoginWindow style={{margin:'0 auto'}}>
      <h1 style={{padding:30, color:'#000'}}>Rogmor the Next:RPG</h1>
    </LoginWindow>
    <p>Welcome young adventurer!</p>
    <p>You are stepp into another dimension, called: Rogmor and ther is a lot of opportunity to fullfill your dreams, at first stepp is choice your character.</p>
    <p>Don't afraid there is no worst choice, and you can learn something different.</p>
    <p>Rogmor under chaotic statement at moment so prophecy talkimng about a skillfull hero, who will be restor odrer and peace to this land.</p>
    <p><i>Crazy fact that this is the server side version off Rogmor</i></p>
    <p>version: {version}</p>
    {/* <section style={{overflowX:'auto'}}><NoreboMap/></section> */}
    <section className="large-button-group" style={{width:200, margin:'0 auto'}}>
      <Button inset="primary" onClick={handleRollHero}>Roll your character</Button>
    </section>
    {hero && <HeroCard hero={hero} style={{fontSize:17}}/>}
    {hero && (
      <section className="large-button-group" style={{width:200, margin:'15px auto'}}>
        <Button inset="primary" onClick={handleLetsAdventure}>select this hero
          <div className="face-sprite adventure--hero big-face" data-face={hero.heroId} />
        </Button>
        </section>
      )}
  </>);
}