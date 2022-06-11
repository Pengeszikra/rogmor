import React, {useState} from 'react';
import styler from './scss/styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';
import generateName from '../rpg/generateName';
import profession from '../rpg/profession';


import { shuffle} from '../rpg/rpg';

const  [Page, FaceSprite, BattleTeam, CloseButton, SimpleButton] = 
styler ('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top', 'gui simple-button');
const [GothicCloseButton] = styler('gui gui-xButton right-top-gothic');

const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

const faces = Array.from({length:100}, (_, i) => i).sort(shuffle);

const north = faces.slice(-8).map(id => heroFactory(id));

const Heroes = ({onChoose, changeRoute, children}) => (
  <section>
    <GothicWindow style={{height: 500}}>
      <GothicCloseButton onClick={_=>changeRoute('.')} />
      <br/>
      <BattleTeam>
        {north.map(hero => <FaceSprite key={hero.heroId} data-face={hero.heroId} onClick={onChoose(hero)} style={{opacity: hero.staminaState / hero.stamina}}/>)}
      </BattleTeam>
    </GothicWindow>
    {children}
  </section>
);

export default ({changeRoute, ...props}) => {
  const [who, chooseWho] = useState(null);

  const onChoose = hero => event => chooseWho(hero);

  const levelUp = hero => () => {
    const {type, level, heroId} = hero;    
    const newLevel = profession(level + 1, type)
    const improvedHero = {...hero, ...newLevel, heroId};
    for(let i=0; i<north.length; i++) {
      if (north[i].heroId === heroId) {
        north[i] = improvedHero;
        chooseWho(improvedHero)
        break;
      }
    }
  };

  return (    
    <div {...props}>
      <h1>Leveling test</h1>      
      <Heroes onChoose={onChoose} changeRoute={changeRoute}>
        {who && (
          <>
            <HeroCard hero={who}>
              <CloseButton onClick={_=>chooseWho(null)} />
            </HeroCard>
            <SimpleButton onClick={levelUp(who)}>Level up</SimpleButton>
          </>
        )}        
      </Heroes>
    </div>
  );
}
