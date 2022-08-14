import React from 'react';
import { InteractionKind } from '../gui/battleSaga';
import { Mob } from '../rpg/profession';


export const VerticalValue = ({value=1, tw="bg-white"}) => (
  <div className='relative'>
    <div className="w-4 h-24 absolute bg-[#0004]" />
    <div 
      className={`w-4 h-24 origin-bottom transition ${tw}`}
      style={{transform:`scaleY(${value})`}} 
    />
  </div>
);

export const EntityCard = ({mob, wound, tw=""}) => {

  const {
    avatar, level,
    ability:{stamina, will, joyful, title}, 
    condition:{staminaState, willState, joyfulState}
  } = mob as Mob;

  const woundColor = {
    [InteractionKind.STRIKE]: 'bg-orange-400',
    [InteractionKind.SKILL]: 'bg-yellow-400',
    [InteractionKind.TALK]: 'bg-blue-400',
  }?.[wound?.kind] || '';

  return (
    <figure className={`flex gap-0 w-32 h-64 rounded-3xl bg-sky-600 justify-center flex-wrap items-center hover:brightness-110 ${tw} shadow-lg`}>
      <section className='grid items-center justify-center w-24 h-24 relative'>
        <figure className='face-sprite big-face' data-face={avatar} />
        <div className="absolute rounded-full bg-red-800 p-3 text-lg text-white w-9 h-8 flex items-center justify-center right-24 shadow-lg">
          <span>{level}</span>
        </div>
      </section>
      <div className='text-white p-2 text-lg'>{title}</div>
      <section className='flex gap-2 w-max m-4 items-end justify-end'>
        <VerticalValue tw='bg-rose-900' value={staminaState/stamina}/>
        <VerticalValue tw='bg-yellow-200' value={willState/will} />
        <VerticalValue tw='bg-emerald-900' value={joyfulState/joyful} />
        
      </section>
      {wound?.target?.avatar === avatar && (
        <figure className={`fading-to-top text-red-600 ${woundColor} transition  rounded-full p-8 absolute text-5xl`}>{wound.dmg}</figure>
      )}
    </figure>
  );
};

export const PlaceOfMob = () => (<div className='w-32' />);

export default function TailwindArea ({state, army}) {

  const {hero, focus, entities, damageResult} = state;
  const {focusOn, fight, skill, talk} = army;
  
  return (
    <section className="absolute top-0 left-0 overflow-hidden --pointer-events-none grid justify-center w-screen items-center my-12">
      {entities && entities[focus] && (
        <main className="grid justify-center gap-4 scale-[0.8] rounded-3xl">
          <section className='flex gap-4'>
            <PlaceOfMob />
            <EntityCard tw="bg-stone-600" mob={entities?.[focus]} wound={damageResult}/>
            <PlaceOfMob />
          </section>

          <section className='flex gap-4'>
            <PlaceOfMob />
            <EntityCard tw="bg-[#676]" mob={hero} wound={damageResult} />
            <PlaceOfMob />
          </section>

          <section className="m-4">
            <section className="w-96 grid grid-cols-3 gap-2 p-4">
              <button className="rounded-lg p-2 text-lg text-white bg-sky-600 grayscale-[.7]" onClick={fight}>Fight</button>
              <button className="rounded-lg p-2 text-lg text-white bg-sky-600 grayscale-[.7]" onClick={skill}>Skill</button>
              <button className="rounded-lg p-2 text-lg text-white bg-sky-600 grayscale-[.7]" onClick={talk}>Talk</button>
              <div />
            <div />
              <button className="rounded-lg p-2 text-lg text-white bg-sky-700 grayscale-[.7]" onClick={() => focusOn(null)}>Escape</button>
            </section>
          </section>
        </main>
      )}
    </section>

  );
}