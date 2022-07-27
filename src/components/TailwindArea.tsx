import React from 'react';

export const EntityCard = ({mob, tw=""}) => (
  <figure className={`flex gap-0 w-32 h-48 rounded-3xl bg-sky-600 justify-center flex-wrap items-center hover:brightness-110 ${tw}`}>
    <section className='grid items-center justify-center w-24 h-24 relative'>
      <figure className='face-sprite big-face' data-face={mob?.heroId} />
      <div className="absolute rounded-full bg-red-800 p-3 text-lg text-white w-9 h-8 flex items-center justify-center right-24">
        <span>{mob?.level}</span>
      </div>
    </section>
    <section className='flex gap-2 items-center justify-center w-max m-4'>
      <div className='bg-rose-800 w-4 h-16'></div>
      <div className='bg-yellow-200 w-4 h-16'></div>
      <div className='bg-indigo-800 w-4 h-16'></div>
    </section>
  </figure>
);

export const PlaceOfMob = () => (<div className='w-32' />);

export default function TailwindArea ({state, army}) {

  const {hero, focus, entities} = state;
  const {modHero, setGameState, setupEntities, focusOn, fight, skill, talk, playActionAnim, setHero, levelUpHero, } = army;


  return (
    <section className="absolute top-0 left-0 overflow-hidden --pointer-events-none grid justify-center w-screen items-center">      
      {entities && entities[focus] && (
        <main className="grid justify-center gap-4">
          <section className='flex gap-4'>
            <PlaceOfMob />
            <EntityCard tw="bg-stone-700" mob={entities?.[focus]} />
            <PlaceOfMob />
          </section>

          <section className="m-4">
            <section className="w-96 grid grid-cols-2 gap-2 p-4">
              <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={fight}>Fight</button>
              <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={skill}>Skill</button>
              <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={talk}>Talk</button>
              <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={() => focusOn(null)}>Escape</button>
            </section>
          </section>

          <section className='flex gap-4'>
            <PlaceOfMob />
            <EntityCard mob={hero} />
            <PlaceOfMob />
          </section>

        </main>
      )}
    </section>

  );
}