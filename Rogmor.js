import React, {useState, useEffect} from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [Wireframe, Hero, Valami] = divFactory('wireframe', 'hero', 'valami');
const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');
const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel] = divFactory
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow');      

const [ProcessBarBg, ProcessBarIndicator] = divFactory('button-b', 'process-bar-indicator');

const heroStyle = face => ({
  backgroundImage : `url(${asset}faces/face${("0000" + face).slice(-4)}.png)`
});

const ProcessBar = ({process = 1, ...props}) => (
  <ProcessBarBg {...props}>
    <ProcessBarIndicator style={{width: process * 248}}/>
  </ProcessBarBg>
);

export default props => {
  const [process, setProcess] = useState(0);
  useEffect(() => {
    const interval = setInterval( 
      () => {        
        setProcess(p => {
          if (p >= 1) clearInterval(interval);
          return Math.min(p + 0.01, 1);
        });
        //setProcess(pro);
        //if (pro === 1) clearInterval(interval);
      }, 200
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <Page>
      <ModalWindow>
        <FaceWindow>
          <FaceSprite data-face={32}  />
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
        <FaceWindow>
          <FaceSprite data-face={45} />
          <span>Odett Alborin</span>
        </FaceWindow>

      </ModalWindow>
    </Page>
  );
}
