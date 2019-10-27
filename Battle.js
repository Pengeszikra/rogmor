import React, {useState, useEffect} from 'react';
import styler from './styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';
import generateName from './generateName';
import profession from './profession';
import { pipe, fromIter, forEach, interval } from 'callbag-basics';
import sample from 'callbag-sample';
import {improved, shuffle} from './rpg';

const  [Page, FaceSprite, BattleTeam, CloseButton, SimpleButton] = 
styler ('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top', 'gui simple-button');

const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

const faces = Array.from({length:100}, (_, i) => i).sort(shuffle);

const north = faces.slice(-5).map(id => heroFactory(id));
const south = faces.slice(0, 5).map(id => heroFactory(id));

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
    yield `${a.name} - ${a.profession} : ${a.level} : ${a.reaction}`;
    yield 'vs.';
    yield `${b.name} - ${b.profession} : ${b.level} : ${b.reaction}`;
    yield '-'.repeat(20);
    yield `${a.reaction} : ${b.reaction}`;
    const astart = improved(a.reaction) 
    const bstart = improved(b.reaction)
    const [atk, def] = astart > bstart ? [a, b] : [b, a];
    yield `Attacker is: ${atk.name} ${astart} vs ${bstart}`;    
    let round = 1;
    while (def.staminaState > 0) {
      let dmg = improved(atk.physique / 2);
      yield `round: ${round} strike ${dmg}`;
      round ++;      
      def.staminaState -= Math.min(dmg, def.staminaState);
      yield `${def.name} ${def.stamina}/${def.staminaState}`;
    }
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
        <pre>{fightLog}</pre>
    </Page>
  );
}
