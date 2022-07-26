import React from 'react';

export default function TailwindArea ({state, army}) {

  const {hero, focus, entities} = state;

  return (
    <section className="absolute top-0 left-0 overflow-hidden pointer-events-none grid items-center justify-center w-screen">
      <section className='flex gap-4 m-8'>
        <section className='grid items-center justify-center w-32 h-32 rounded-3xl bg-orange-700'>
          <figure className='face-sprite big-face' data-face={hero?.heroId} />
        </section>
        <section className='grid items-center justify-center w-32 h-32 rounded-3xl bg-orange-700'>
          <figure className='face-sprite big-face' data-face={hero?.heroId} />
        </section>
        <section className='grid items-center justify-center w-32 h-32 rounded-3xl bg-orange-700'>
          <figure className='face-sprite big-face' data-face={hero?.heroId} />
        </section>
      </section>
      <div className='h-4 pointer-events-none' />
      {focus && (
        <section className='flex gap-4 m-8'>
          <section className='grid items-center justify-center w-32 h-32 rounded-3xl bg-orange-700'>
            <figure className='face-sprite big-face' data-face={entities?.[focus]?.heroId} />
          </section>
          <section className='grid items-center justify-center w-32 h-32 rounded-3xl bg-orange-700'>
            <figure className='face-sprite big-face' data-face={entities?.[focus]?.heroId} />
          </section>
          <section className='grid items-center justify-center w-32 h-32 rounded-3xl bg-orange-700'>
            <figure className='face-sprite big-face' data-face={entities?.[focus]?.heroId} />
          </section>
        </section>
      )}
      <pre className="hidden overflow-scroll h-64 rounded-2xl bg-stone-900">{JSON.stringify(state, null, 2)}</pre>
    </section>

  );
}