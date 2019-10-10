import React, {useState, useEffect} from 'react';
import styler from './styler';
import asset from './asset';
import HeroCard from './HeroCard';


const [ModalWindow, Page] = styler
      ('modal-window', 'page');

export default props => {
  return (
    <Page>
      <ModalWindow>
        {[33, 78].map(heroId => <HeroCard hero={{heroId}} />)}
      </ModalWindow>
    </Page>
  );
}
