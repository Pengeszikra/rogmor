import React from 'react';
import divFactory from './divFactory';

export const [Wireframe, Hero, Valami] = divFactory('wireframe', 'hero', 'valami');
export const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');
export const [LoginWindow, FaceWindow, ChatWindow, DarkPanel, InfoPanel] = divFactory
      ('gui gui-loginw', 'gui gui-storyw', 'gui gui-chatWindow', 'gui gui-transPanelDark', 'gui gui-infow');      

