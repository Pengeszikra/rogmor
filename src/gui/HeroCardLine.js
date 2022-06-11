import React from 'react';

import { FaceSprite } from './setOfGuiElements';

export default ({hero, children, color = 'black', ...props}) => {
  const {heroId, name, profession, level, physique, reaction, soul, stamina, willpower, staminaState, willpowerState, liaison, merry, merryState } = hero;

  return (
    <section className="hero-line" {...props}>
      <FaceSprite data-face={heroId} />
      
      <svg className="hero-line-bars" viewBox="0 0 140 40">
        <text fill={color} x={45} y={16}>level {level} {profession}</text>
        <rect fill="rgba(0,0,0,0.2)" width={100} height={4} x={45} y={22}/>
        <rect fill="rgb(138, 85, 25)" width={100 * staminaState / stamina} height={4} x={45} y={22}/>

        <rect fill="rgba(0,0,0,0.2)" width={100} height={4} x={45} y={28}/>
        <rect fill="rgb(202, 200, 69)" width={100 * willpowerState / willpower} height={4} x={45} y={28}/>

        <rect fill="rgba(0,0,0,0.2)" width={100} height={4} x={45} y={34}/>
        <rect fill="rgb(22, 100, 15)" width={100 * merryState / merry} height={4} x={45} y={34}/>
      </svg>
    </section>
  );
}