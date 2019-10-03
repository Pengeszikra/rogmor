import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [ModalWindow, Page, FaceSprite, FaceGallery, ItemSprite] = divFactory
      ('modal-window', 'page', 'face-sprite', 'face-gallery', 'item-sprite');

export default props => (
  <Page>
    <img src={asset + 'img/splashTop.png'} />
    <h1>the Roll Play Game sketch</h1>
    <p>Good question is why I would like to create this type of game?</p>
    <ModalWindow>
      <h1>Hero faces ::</h1>
      <FaceGallery>
        {Array.from({length: 100}, (_, face) => <FaceSprite data-face={face} />)}
      </FaceGallery>      
      <h1>Item sets ::</h1>
      <FaceGallery>
        {Array.from({length: 45}, (_, item) => <ItemSprite data-item={item} />)}
      </FaceGallery>
    </ModalWindow>
  </Page>
);