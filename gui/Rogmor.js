import React, {useState, useEffect} from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';

const [Page] = styler('page');

const Heroes = () => (
  <GothicWindow>
    {[33, 78, 45, 14, 19].map(heroId => <HeroCard hero={{heroId}} />)}
  </GothicWindow>
);

export default props => {
  return (    
    <Page>
      <GothicWindow>
          This is the exciting Retro RPG projext, based on my really old minimal fantasy graphic set<br/>
          But this solutain also <br/>
          <br/>
          Try to answer some question<br/>
          <ul>
            <li>How to use detailed gothic border?</li>
            <li>Which javascript library is the most helpfull for coordinating RPG game event handling</li>
          </ul>
      </GothicWindow>
      <Heroes />
    </Page>
  );
}
