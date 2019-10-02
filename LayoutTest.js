import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [ModalWindow, Page, FaceSprite] = divFactory('modal-window', 'page', 'face-sprite');

export default props => (
  <Page>
    <FaceSprite data-face={12} />
    <FaceSprite data-face={22} />
    <FaceSprite data-face={55} />
    <ModalWindow>
      Simple modal window with couple of content
      
    </ModalWindow>
  </Page>
);