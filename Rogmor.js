import React, {useState, useEffect} from 'react';
import divFactory from './divFactory';
import asset from './asset';
import HeroCard from './HeroCard';

const [Wireframe, Hero, Valami] = divFactory('wireframe', 'hero', 'valami');
const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');
const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel] = divFactory
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow');      

export default props => {
  return (
    <Page>
      <ModalWindow>
        {[33, 78].map(heroId => <HeroCard hero={{heroId}} />)}
      </ModalWindow>
    </Page>
  );
}
