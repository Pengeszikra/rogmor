import { rnd } from '../rpg/rpg';
import HeroCard from '../gui/HeroCard';
import getConfig from 'next/config';

import { FaceSprite, LoginWindow, Button } from '../gui/setOfGuiElements';
import { heroFactory } from '../rpg/heroFactory';
import { GameMode } from '../rpg/singlePlayerTroll';

export default function CreateHero({state, army}) {
  const { hero } = state;
  const { setHero, setGameState } = army;

  const { publicRuntimeConfig:{version} } = getConfig();

  const handleRollHero = _ => setHero(heroFactory(rnd(100), 4));
  const handleLetsAdventure = _ => {
    setGameState(GameMode.ADVENTURE_ON_MAP);
    return;
  };

  return (<>
    <LoginWindow style={{margin:'0 auto'}}>
      <h1 style={{padding:30, color:'#000'}}>Rogmor the Next:RPG</h1>
    </LoginWindow>
    <article className="text-base">
      <p>Welcome young <strong>adventurer</strong>!</p>
      <p>You are stepp into another dimension, called: Rogmor and ther is a lot of opportunity to fullfill your dreams, at first stepp is choice your character.</p>
      <p>Don't afraid there is no worst choice, and you can learn something different.</p>
      <p>Rogmor under chaotic statement at moment so prophecy talkimng about a skillfull hero, who will be restor odrer and peace to this land.</p>
      <br/>
      <p>version: {version}</p>
    </article>

    <button className="bg-sky-800 hover:bg-sky-600 p-2 text-lg rounded-lg w-full my-4" onClick={handleRollHero}>Roll your character</button>
    {hero && <HeroCard hero={hero} style={{fontSize:17}}/>}
    {hero && (
      <section className="m-4">
        <figure className="face-sprite absolute left-8 z-20 scale-150" data-face={hero.heroId} />
        <button className="bg-sky-800 hover:bg-sky-600 p-2 text-lg rounded-lg w-full my-4" onClick={handleLetsAdventure}>Let adventure!</button>
      </section>
      )}
  </>);
}