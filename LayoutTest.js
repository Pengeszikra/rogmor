import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');

export default props => (
  <Page>
    <ModalWindow>
      <p>Hero faces ::</p>
      <FaceGallery>
        {Array.from({length: 100}, (_, face) => <FaceSprite data-face={face} />)}
      </FaceGallery>      
      <p>Item sets ::</p>
      <FaceGallery>
        {Array.from({length: 45}, (_, item) => <ItemSprite data-item={item} />)}
      </FaceGallery>
    </ModalWindow>
  </Page>
);