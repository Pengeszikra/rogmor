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
  const {heroId, name='no-name', profession, level, physique, reaction, soul, stamina, willpower} = hero;
  const [process, setProcess] = useState(0);
  const onProcess = () => {
    const interval = setInterval( 
      () => {        
        setProcess(p => {
          if (p >= 1) clearInterval(interval);
          return Math.min(p + 0.01, 1);
        });
      }, 2
    );    
  };

  return (
    <FaceWindow>
      <FaceSprite data-face={heroId} onClick={onProcess} />
      <span>{name}</span>
      <pre>{`          
        Level: ${level} - ${profession} 
     Physique: ${physique}
     Reaction: ${reaction}
         Soul: ${soul}     
      Stamina: ${stamina}
    Willpower: ${willpower}
        `}
        <ProcessBar process={process} style={{width: 160, marginLeft: 15}} />
      </pre>
      {children}
    </FaceWindow>    
  );
}