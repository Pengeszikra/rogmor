import React, {useState, useEffect} from 'react';
import styler from './styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';

const [Page, FaceSprite, BattleTeam] = styler('page', 'face-sprite', 'battle-team');

const Heroes = () => (
  <GothicWindow>
    <BattleTeam>
      {[33, 78, 11, 22, 32, 25].map(heroId => <FaceSprite data-face={heroId} />)}
    </BattleTeam>
    <br/>
    <BattleTeam>
      {[34, 79, 12, 23, 33, 26].map(heroId => <FaceSprite data-face={heroId} />)}
    </BattleTeam>    
  </GothicWindow>
);

export default props => {
  return (    
    <Page>
      <h1>Battle simulation</h1>
      <Heroes />
    </Page>
  );
}
