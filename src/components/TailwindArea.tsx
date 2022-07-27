import React from 'react';

export const EntityCard = ({face, bgColor='sky'}) => (
  <figure className={`flex gap-0 w-32 h-48 rounded-3xl bg-${bgColor}-600 justify-center flex-wrap items-center hover:brightness-110`}>
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

  return (
    <section className="absolute top-0 left-0 overflow-hidden pointer-events-none grid items-center justify-center w-screen">
      <section className='flex gap-4 m-8'>
        <EntityCard face={hero?.heroId} />
        <EntityCard face={hero?.heroId} />
        <EntityCard face={hero?.heroId} />
      </section>
      <div className='h-4 pointer-events-none' />
      {focus && (
        <section className='flex gap-4 m-8'>
          <EntityCard face={entities?.[focus]?.heroId} bgColor="stone" />
          <EntityCard face={entities?.[focus]?.heroId} bgColor="stone" />
          <EntityCard face={entities?.[focus]?.heroId} bgColor="stone" />
        </section>
      )}
      <pre className="hidden overflow-scroll h-64 rounded-2xl bg-stone-900">{JSON.stringify(state, null, 2)}</pre>
    </section>

  );
}