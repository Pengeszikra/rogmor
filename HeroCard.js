import React, {useState, useEffect} from 'react';
import styler from './styler';

const [FaceSprite, FaceWindow, ProcessBarBg, ProcessBarIndicator] = styler
      ('face-sprite', 'gui gui-storyw', 'button-b', 'process-bar-indicator');

const ProcessBar = ({process = 1, ...props}) => (
  <ProcessBarBg {...props}>
    <ProcessBarIndicator style={{width: process * 248}}/>
  </ProcessBarBg>
);

export default ({hero}) => {
  const {heroId} = hero;
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
      <span>Adimir Kazarow</span>
      <pre>{`          
        LEVEL: 12
        HP: 320
        ATK: 150
        DEF: 70          
        SKILL: Avanger`}
      <ProcessBar process={process} style={{width: 160, marginLeft: 15}} />         
      </pre>          
    </FaceWindow>    
  );
}