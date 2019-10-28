import React, {useState, useEffect} from 'react';
import styler from './styler';

const [FaceSprite, FaceWindow, ProcessBarBg, ProcessBarIndicator] = styler
      ('face-sprite', 'gui gui-storyw', 'button-b', 'process-bar-indicator');

const ProcessBar = ({process = 1, ...props}) => (
  <ProcessBarBg {...props}>
    <ProcessBarIndicator style={{width: process * 248}}/>
  </ProcessBarBg>
);

export default ({hero, children}) => {
  const {heroId, name, profession, level, physique, reaction, soul, stamina, willpower, staminaState, willpowerState } = hero;
  const [process, setProcess] = useState(0);

  return (
    <FaceWindow>
      <FaceSprite data-face={heroId} />
      <span>{name}</span>
      <pre>{`          
        Level: ${level} - ${profession} 
     Physique: ${physique}
     Reaction: ${reaction}
         Soul: ${soul}     
      Stamina: ${staminaState} / ${stamina}
    Willpower: ${willpowerState} / ${willpower}
        `}
        <ProcessBar process={staminaState / stamina} style={{width: 160, marginLeft: 15}} />
      </pre>
      {children}
    </FaceWindow>    
  );
}