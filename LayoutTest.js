import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [ModalWindow, Page] = divFactory('modal-window', 'page');


export default props => (
  <Page>
    <ModalWindow>
      9 slice grid test with modal window    
    </ModalWindow>
  </Page>
);