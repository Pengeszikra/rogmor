import React, {useState, useEffect} from 'react';
import styler from './styler';
import asset from './asset';
import HeroCard from './HeroCard';


const [ModalWindow, Page, ModalWindowInner, Slice9GridHolder, SliceWindow, SliceContent] = styler
      ('modal-window', 'page', 'modal-window-ModalWindowInner', 'slice-9-grid-holder', 'modal-window slice-extra', 'slice-content');

const Heroes = () => (
  <ModalWindow>
    {[33, 78, 45, 14, 19].map(heroId => <HeroCard hero={{heroId}} />)}
  </ModalWindow>
);

export default props => {
  return (    
    <Page>
      <Slice9GridHolder>
        <SliceContent>
          This is the exciting Retro RPG projext, based on my really old minimal fantasy graphic set<br/>
          But this solutain also <br/>
          <br/>
          <br/>
          Try to answer some question <br/>
        </SliceContent>
        <SliceWindow/>      

    </Slice9GridHolder>
    </Page>
  );
}
