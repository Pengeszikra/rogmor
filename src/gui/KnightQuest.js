import { useEffect } from 'react';
import { useNoreboReducer } from '../rpg/useNoreboReducer';
import HeroCard from './HeroCard';
import HeroCardLine from './HeroCardLine';
import { MobilFrame } from './MobilFrame';
import { Button70 } from './setOfGuiElements';
import { jlog } from './TeamTest';

const StoryLine = ({text}) => <div className="story-line">{text}</div>;

export default () => {

  const [
    {units, hero, quest, story}, 
    {nextRound, addUnit, addRandom, removeUnit, selectHero, adventure}
  ] = useNoreboReducer();

  useEffect( _ => {
    Array(24).fill().map(_ => addRandom())
  }, []);

  return (
    <MobilFrame>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {!quest && units.map(unit => (
          <HeroCardLine hero={unit} key={unit?.uid} color="#FED" style={{width: 140}} onClick={ _ => unit |> selectHero}/>
        ))}
        
      </div>
      <p>Egy automatikus kalandozas a heroval</p>
      {hero && (
        <section style={{display:'flex', flexWrap:'wrap'}}>
          <HeroCardLine hero={hero} color="#FED"/>
          <Button70 
            inset="primary" 
            style={{marginLeft:'1em'}}
            onClick={ _ => quest ? nextRound() : hero |> adventure}
          >mission</Button70>
        </section>
      )}
      <p>Vajon hogyan lehetne a skilleket könnyen programozni ?</p>
      {/* {quest && quest.enemys.map(unit => (
        <div key={unit.uid}>
          <HeroCardLine hero={unit} color="#FED" style={{width: 140}} />
        </div>
      ))} */}
      <p>Illetve az a kérdés, hogy mennyire kell erőltetni a reduceres megoldások, mert egy generátor segítségével sokkal inkább egy helyen lennének a kódok, viszont nehezebben </p>
      <p>Illetve a compsable megoldásokat kellene valahogy jól kifejlesztenem</p>
      {quest && quest.mob && quest.hero && (
        <section style={{display:'flex', flexWrap:'wrap', alignContent:'space-between'}}>
          <HeroCardLine hero={quest.hero} color="#FED"/>
          <HeroCardLine hero={quest.mob} color="#FED"/>
        </section>
      )}
      <p>Reducer esetében pedig ott lehetne az okosság, hogy valahogy programból összetett reduceret építeni.</p>
      {hero && story.slice().reverse().map((line, key) => (
        <StoryLine key={key} text={line} />
      ))}
      <p>A reducer generátor összekapcsolása pedig a saga, végülis lehet annál nem kellene jobbat kitalálni</p>
      <p>De valahogy a callbag az amiben lehetőséget látok, de ott is vannak problémás részek</p>

      <br/>

      <p>Viszont most az tűnik a helyes útnak, hogy az actions ne konkrétan módosítsam a stat-et, hanem csak tegyem be egy streambe a a sebzést, amit aztán tetszőlegesen meg lehet jeleníteni, illetve egy képesség módosíthat is.</p>
      <p>Kellene még egy statusz vagy tag mező is amire lehetne szűrni, pld. elő / halott, elbódítva, lefagyasztva, alvó, stb ....</p>
      
  </MobilFrame>
  );
}