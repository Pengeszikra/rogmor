import React, {useState, useEffect} from 'react';
import styler from './styler';
import asset from './asset';
import HeroCard from './HeroCard';


const [ModalWindow, Page, ModalWindowInner] = styler
      ('modal-window', 'page', 'modal-window-ModalWindowInner');

export default props => {
  return (
    <Page>
      <ModalWindow><ModalWindowInner>        
        <pre style={{color:'white', fontSize:18}}>{`
Lightweight Retro RPG project for React coding.

import React from 'react';
export default ({name}) => (
  <NameBox>{name}</NameBox>
);
      `}</pre>
      </ModalWindowInner></ModalWindow>
      <ModalWindow>
        {[33, 78, 45, 14, 19].map(heroId => <HeroCard hero={{heroId}} />)}
      </ModalWindow>
    </Page>
  );
}
