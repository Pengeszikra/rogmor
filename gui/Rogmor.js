import React, {useState, useEffect} from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import GothicWindow from './GothicWindow';
import Battle from './Battle';
import Leveling from './Leveling';

const [Page, SimpleButton] = styler('page', 'gui simple-button button-line');

const Intro = ({changeRoute}) =>  (    
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
        <SimpleButton onClick={() => changeRoute('battle')}>Battle test</SimpleButton>
        <SimpleButton onClick={() => changeRoute('leveling')}>Leveling</SimpleButton>
    </GothicWindow>
  </Page>
);

export default props => {
  const [route, changeRoute] = useState('.');
  return (
    <>
      {route == '.' && <Intro changeRoute={changeRoute} />}
      {route == 'leveling' && <Leveling changeRoute={changeRoute} />}
      {route == 'battle' && <Battle  changeRoute={changeRoute} />}
    </>
  );  
}