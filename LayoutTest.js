import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [ModalWindow, Page, FaceSprite, FaceGallery] = divFactory('modal-window', 'page', 'face-sprite', 'face-gallery');

export default props => (
  <Page>
    <FaceGallery>
      {Array.from({length: 100}, (_, face) => <FaceSprite data-face={face} />)}
    </FaceGallery>
    <ModalWindow>
      Simple modal window with couple of content
      
    </ModalWindow>
  </Page>
);