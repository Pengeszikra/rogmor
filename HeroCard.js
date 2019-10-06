import React, {useState, useEffect} from 'react';
import divFactory from './divFactory';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');
const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel] = divFactory
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow');      
const [ProcessBarBg, ProcessBarIndicator] = divFactory('button-b', 'process-bar-indicator');

const ProcessBar = ({process = 1, ...props}) => (
  <ProcessBarBg {...props}>
    <ProcessBarIndicator style={{width: process * 248}}/>
  </ProcessBarBg>
);

export default ({heroId = 32}) => {
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