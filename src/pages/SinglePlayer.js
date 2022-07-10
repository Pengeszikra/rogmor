import { MobilFrame } from '../gui/MobilFrame';
import { useSinglePlayerReducer } from '../rpg/singlePlayerTroll';
import SingleAdventure from '../components/SingleAdventure';
import CreateHero from '../components/CreateHero';
import Head from 'next/head'
import { Blog } from '../components/Blog';

const SinglePlayer = () => {
  const [state, army] = useSinglePlayerReducer();
  const {game, hero} = state;

  return (
    <MobilFrame>
      <Head>
        <title>The Next Hero</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="manifest.json"></link>
      </Head>

      {!game?.isPlay && <CreateHero state={state} army={army} />}
      {game?.isPlay && <SingleAdventure state={state} army={army} />}
      <Blog name={hero?.name} avatar={hero?.heroId} />
    </MobilFrame>
  );
}; 

export default SinglePlayer;

