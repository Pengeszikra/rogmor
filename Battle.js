import React, {useState, useEffect} from 'react';
import styler from './styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';
import generateName from './generateName';
import profession from './profession';
import { pipe, fromIter, forEach, interval } from 'callbag-basics';
import sample from 'callbag-sample';
import {improved} from './rpg';

const  [Page, FaceSprite, BattleTeam, CloseButton, SimpleButton] = 
styler ('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top', 'gui simple-button');

const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

const north = [33, 78, 11, 22, 32, 25].map(id => heroFactory(id));
const south = [34, 79, 12, 23, 72, 26].map(id => heroFactory(id));

const Heroes = ({onChoose, onChuuse}) => (
  <GothicWindow>
    <BattleTeam>
      {north.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChoose(hero)}/>)}
    </BattleTeam>
    <br/>
    <BattleTeam>
       {south.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChuuse(hero)}/>)}
    </BattleTeam>    
  </GothicWindow>
);

export default props => {
  const [who, chooseWho] = useState(null);
  const [whu, chooseWhu] = useState(null);
  const [fightLog, logFight] = useState('');

  const logf = log => logFight(logs => [logs, log].join('\n'));

  const onChoose = hero => event => chooseWho(hero);
  const onChuuse = hero => event => chooseWhu(hero);

  function * fight(...mobs) {
    const [a, b] = mobs;
    yield `\n`;
    yield `${a.name} - ${a.profession} : ${a.level}`;
    yield 'vs.';
    yield `${b.name} - ${b.profession} : ${b.level}`;
    yield '-'.repeat(20);
    yield `${a.reaction} : ${b.reaction}`;
    const astart = improved(a.reaction) 
    const bstart = improved(b.reaction)
    const [atk, def] = astart > bstart ? [a, b] : [b, a];
    yield `Attacker is: ${atk.name} ${astart} vs ${bstart}`;
    const dmg = improved(atk.physique / 10);
    yield `strike ${dmg}`
    def.staminaState -= Math.min(dmg, def.staminaState);
    yield `${def.name} ${def.stamina}/${def.staminaState}`;
  }
  
  const letsFight = event => {
    pipe (
      interval(200),
      sample(fromIter(fight(who, whu))),            
      forEach( mob => logf(mob) )
    );
  }

  return (    
    <Page>
        <h1>Battle simulation</h1>      
        <Heroes onChoose={onChoose} onChuuse={onChuuse} />
        {who && whu && <SimpleButton onClick={letsFight}>Fight</SimpleButton>}
        <pre>{fightLog}</pre>        
        {who && (
          <HeroCard hero={who}>
            <CloseButton onClick={_=>chooseWho(null)} />
          </HeroCard>
        )}        
        {whu && (
          <HeroCard hero={whu}>
            <CloseButton onClick={_=>chooseWhu(null)} />
          </HeroCard>
        )}         
    </Page>
  );
}
