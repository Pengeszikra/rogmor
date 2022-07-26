import { MobilFrame } from '../gui/MobilFrame';
import { GameMode, useSinglePlayerReducer } from '../rpg/singlePlayerTroll';
import SingleAdventure from '../components/SingleAdventure';
import CreateHero from '../components/CreateHero';
import Head from 'next/head'
import { Blog } from '../components/Blog';
import TailwindArea from '../components/TailwindArea';

const RogmorFrame = () => {
  const [state, army] = useSinglePlayerReducer();
  const {game, hero} = state;

  return (
    <section className='portal-root m-2'>
      <MobilFrame>
        <Head>
          <title>The Next Hero</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="manifest" href="manifest.json"></link>
        </Head>

        {game === GameMode.ROLL_CHARACTER && <CreateHero state={state} army={army} />}
        {game === GameMode.ADVENTURE_ON_MAP && <SingleAdventure state={state} army={army} />}
        {game === GameMode.ROLL_CHARACTER && <Blog name={hero?.name} avatar={hero?.heroId} />}
      </MobilFrame>
      {game === GameMode.ADVENTURE_ON_MAP && <TailwindArea state={state} army={army} />}
    </section>
  );
}; 

export default RogmorFrame;

