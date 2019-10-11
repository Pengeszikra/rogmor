import React, {useState, useEffect} from 'react';
import styler from './styler';
import asset from './asset';
import HeroCard from './HeroCard';


const [ModalWindow, Page] = styler
      ('modal-window', 'page');

export default props => {
  return (
    <Page>
      <ModalWindow><pre style={{color:'white', fontSize:18}}>{`
        Lightweight Retro RPG project for React coding.
        
        
      `}</pre></ModalWindow>
      <ModalWindow>
        {[33, 78, 45, 14, 19].map(heroId => <HeroCard hero={{heroId}} />)}
      </ModalWindow>
    </Page>
  );
}
