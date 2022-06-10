import { MobilFrame } from './MobilFrame';
import { useSinglePlayerReducer } from '../rpg/singlePlayerTroll';
import SingleAdventure from './SingleAdventure';
import CreateHero from './CreateHero';

export const SinglePlayer = () => {
  const troll = useSinglePlayerReducer();
  const [{game}] = troll;

  return (
    <MobilFrame>
      {!game?.isPlay && <CreateHero troll={troll} />}
      {game?.isPlay && <SingleAdventure troll={troll} />}
    </MobilFrame>
  );
};