import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [ModalWindow, Page] = divFactory('modal-window', 'page');


export default props => (
  <Page>
    <ModalWindow>
      Simple modal window with couple of content
    </ModalWindow>
  </Page>
);