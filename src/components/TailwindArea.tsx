import React from 'react';

export const EntityCard = ({face, tw=""}) => (
  <figure className={`flex gap-0 w-32 h-48 rounded-3xl bg-sky-600 justify-center flex-wrap items-center hover:brightness-110 ${tw}`}>
    <section className='grid items-center justify-center w-24 h-24'>
      <figure className='face-sprite big-face' data-face={face} />
    </section>
    <section className='flex gap-2 items-center justify-center w-max m-4'>
      <div className='bg-rose-800 w-4 h-16'></div>
      <div className='bg-yellow-200 w-4 h-16'></div>
      <div className='bg-indigo-800 w-4 h-16'></div>
    </section>
  </figure>
);

export default function TailwindArea ({state, army}) {

  const {hero, focus, entities} = state;
  const {modHero, setGameState, setupEntities, focusOn, fight, skill, talk, playActionAnim, setHero, levelUpHero} = army;


  return (
    <section className="absolute top-0 left-0 overflow-hidden --pointer-events-none grid justify-center w-screen items-center">
      {entities && entities[focus] && (
        <section className='flex gap-4 m-8'>
          <EntityCard tw="bg-stone-600" face={38} />
          <EntityCard tw="bg-stone-700" face={entities?.[focus]?.heroId} />
          <EntityCard tw="bg-stone-600" face={44} />
        </section>
      )}
      {entities && entities[focus] && (
      <section className="inbox-interaction">
        <section className="w-96 grid grid-cols-2 gap-2">
          <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={ _ => {fight()}}>Fight</button>
          <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={ _ => {skill()}}>Skill</button>
          <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={ _ => {talk()}}>Talk</button>
          <button className="rounded-lg p-2 text-lg bg-orange-400" onClick={ _ => {focusOn(null)}}>Escape</button>
        </section>
      </section>
      )}
      {entities && entities[focus] &&  (
        <section className='flex gap-4 m-8'>
          <EntityCard face={9} />
          <EntityCard face={hero?.heroId} />
          <EntityCard face={23} />
        </section>
      )}
    </section>

  );
}