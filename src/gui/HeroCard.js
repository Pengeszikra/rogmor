import React from 'react';
import styler from './scss/styler';

const [FaceSprite, FaceWindow, ProcessBarBg, ProcessBarIndicator] = styler
      ('face-sprite', 'gui gui-storyw', 'button-b', 'process-bar-indicator');

export const ProcessBar = ({process = 1, ...props}) => (
  <ProcessBarBg {...props}>
    <ProcessBarIndicator style={{width: process * 254}}/>
  </ProcessBarBg>
);

export const MultiProcessBar = ({process = [1,1,1], ...props}) => {
  const [stm, wil, mry] = process;
  return (
    <ProcessBarBg {...props}>
      <ProcessBarIndicator data-process="stm" style={{width: (stm || 0) * 254}}/>
      <ProcessBarIndicator data-process="wil" style={{width: (wil || 0) * 254}}/>
      <ProcessBarIndicator data-process="mry" style={{width: (mry || 0) * 254}}/>
    </ProcessBarBg>
  );
}

export default ({hero, children, ...props}) => {
  const {heroId, name, profession, level, body, reaction, soul, stamina, willpower, staminaState, willpowerState, popular, joyful, joyfulState } = hero;
  // const [process, setProcess] = useState(0);

  return (
    <FaceWindow {...props}>
      <FaceSprite data-face={heroId} />
      <span>{name} the {profession}</span>
      <pre>{`
        Level: ${level}
         Body: ${body}
     Reaction: ${reaction}
         Soul: ${soul}
      Popular: ${popular}
      Stamina: ${staminaState} / ${stamina}
    Willpower: ${willpowerState} / ${willpower}
       Joyful: ${joyfulState} / ${joyful}
        `}
        <MultiProcessBar process={[staminaState / stamina, willpowerState / willpower, joyfulState / joyful]} style={{width: 160, marginLeft: 15, marginTop: -10}} />
      </pre>
      {children}
    </FaceWindow>    
  );
}