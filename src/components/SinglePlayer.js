import { MobilFrame } from '../gui/MobilFrame';
import { useSinglePlayerReducer } from '../rpg/singlePlayerTroll';
import SingleAdventure from './SingleAdventure';
import CreateHero from './CreateHero';
import Head from 'next/head'

export const SinglePlayer = () => {
  const troll = useSinglePlayerReducer();
  const [{game}] = troll;

  return (
    <MobilFrame>
      
      <Head>
        <title>The Next Hero</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="manifest.json"></link>
      </Head>

      {!game?.isPlay && <CreateHero troll={troll} />}
      {game?.isPlay && <SingleAdventure troll={troll} />}
    </MobilFrame>
  );
};