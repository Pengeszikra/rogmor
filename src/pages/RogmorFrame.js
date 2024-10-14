import { MobilFrame } from '../gui/MobilFrame';
import { GameMode, MainState, gameReducer, initialState, labels } from '../rpg/singlePlayerFactory';
import { SingleAdventure } from '../components/SingleAdventure';
import { CreateHero } from '../components/CreateHero';
import Head from 'next/head';
import { Blog } from '../components/Blog';
import { useSagaReducer } from 'use-saga-reducer';
import { getDispatchedActions } from 'react-troll';
import { mainSaga } from '../lib/mainSaga';
import CombatZone from 'src/components/CombatZone';
import { GeneratorSaga, typedPutActionMapFactory, useSagaFactory, useStateFactory } from 'react-state-factory';
import { useEffect } from 'react';

const RogmorFrame = () => {
  const [state, army] = useStateFactory(gameReducer, initialState, labels);
  const sagaResult = useSagaFactory(gameReducer, initialState, labels, saga);
  const {game, hero} = state;

  useEffect(() => {
    console.log(sagaResult)
    return () => console.log('-clean-');
  }, [sagaResult]);

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
        {game === GameMode.ROLL_CHARACTER && <Blog name={hero?.name} avatar={hero?.avatar} />}
      </MobilFrame>
      {game === GameMode.ADVENTURE_ON_MAP && <CombatZone state={state} army={army} />}
    </section>
  );
}; 

export default RogmorFrame;