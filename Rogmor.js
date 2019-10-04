import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [Wireframe, Hero, Valami] = divFactory('wireframe', 'hero', 'valami');
const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');
const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel] = divFactory
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow');      

const [ProcessBar] = divFactory('button-b');

const heroStyle = face => ({
  backgroundImage : `url(${asset}faces/face${("0000" + face).slice(-4)}.png)`
});

const Fazon = ({face}) => (
  <Hero style={heroStyle(face)}>
    <span>fazon</span>
  </Hero>
);

export default props => (
  <Page>
    <ModalWindow>
      <FaceWindow>
        <FaceSprite data-face={32}  />
        <span>Vladimir Kazarow</span>
        <pre>{`          
          LEVEL: 12
          HP: 320
          ATK: 150
          DEF: 70          
          SKILL: Avanger`}
        <ProcessBar style={{width: 160, marginLeft: 15}} />
        </pre>
        
      </FaceWindow>
      <FaceWindow>
        <FaceSprite data-face={45} />
        <span>Odett Alborin</span>
      </FaceWindow>

    </ModalWindow>
  </Page>
);