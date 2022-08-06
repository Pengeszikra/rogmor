import React from 'react';
import { Mob } from '../rpg/profession';

export const ProcessBar = ({process = 1, ...props}) => (
  <figure className='button-b' {...props}>
    <div className='process-bar-indicator' style={{width: process * 254}}/>
  </figure>
);

export const MultiProcessBar = ({process = [1,1,1], ...props}) => {
  const [stm, wil, mry] = process;
  return (
    <figure className='button-b' {...props}>
      <div className='process-bar-indicator' data-process="stm" style={{width: (stm || 0) * 254}}/>
      <div className='process-bar-indicator' data-process="wil" style={{width: (wil || 0) * 254}}/>
      <div className='process-bar-indicator' data-process="mry" style={{width: (mry || 0) * 254}}/>
    </figure>
  );
}

export default ({hero, ...props}) => {
  const {
    avatar, name, level, 
    ability:{body, soul, reaction, popular, stamina, will, joyful, title}, 
    condition:{staminaState, willState, joyfulState}
  } = hero as Mob;

  return (
    <section className='gui gui-storyw' {...props}>
      <figure className='face-sprite' data-face={avatar} />
      <span className='text-xl'>{name} the {title}</span>
      <pre className='leading-tight text-s'>{`
        Level: ${level}
         Body: ${body}
         Soul: ${soul}
     Reaction: ${reaction}
      Popular: ${popular}
      Stamina: ${staminaState} / ${stamina}
         Will: ${willState} / ${will}
       Joyful: ${joyfulState} / ${joyful}
      `}
      </pre>
    </section>
  );
}