import { useEffect } from 'react';
import HeroCardLine from './HeroCardLine';
import { MobilFrame } from './MobilFrame';
import { Button70 } from './setOfGuiElements';
import { jlog } from './TeamTest';
import '../gui/scss/fire-saga.scss';

// https://codepen.io/Omrega/pen/oNYMwBO?editors=1100

const StoryLine = ({text}) => <div className="story-line">{text}</div>;

export const QUALITY = {
  zero : "quality-zero",
  basic : "quality-basic",
  rare : "quality-rare",
  epic : "quality-epic",
  legendary : "quality-legendary",
  mythic : "quality-mythic",
}

export const ItemCard = ({quality = QUALITY.zero, itemNumber, title, descript}) => (
  <div className="card">
    <div className={`card--icon item-sprite ${quality}`} data-item={itemNumber} />
    <div className="card--content">
      <h1>{title}</h1>
      <p>{descript}</p>
    </div>
  </div>
);
export const MobCard = ({quality = QUALITY.zero, mobNumber, title, descript}) => (
  <div className="card">
    <div className={`card--icon face-sprite ${quality}`} data-face={mobNumber} />
    <div className="card--content">
      <h1>{title}</h1>
      <p>{descript}</p>
    </div>
  </div>
);

export const ExampleItemList = () => (
  <div className="grid">
    <ItemCard itemNumber={12} quality={QUALITY.basic} title="ring" descript="lucky +1" />
    <ItemCard itemNumber={1} quality={QUALITY.rare} title="dagger" descript="bleed" />
    <ItemCard itemNumber={2} quality={QUALITY.basic} title="axe" descript="" />
    <ItemCard itemNumber={3} quality={QUALITY.epic} title="bow" descript="" />
    <ItemCard itemNumber={4} quality={QUALITY.basic} title="iron shield" descript="" />
    <ItemCard itemNumber={5} quality={QUALITY.legendary} title="rounded shield" descript="" />
    <ItemCard itemNumber={6} quality={QUALITY.rare} title="military sword" descript="" />
    <ItemCard itemNumber={32} quality={QUALITY.basic} title="cup" descript="" />
    <ItemCard itemNumber={8} quality={QUALITY.basic} title="club" descript="" />
    <ItemCard itemNumber={9} quality={QUALITY.basic} title="stick" descript="" />
    <ItemCard itemNumber={10} quality={QUALITY.rare} title="druid staff" descript="" />
    <ItemCard itemNumber={22} quality={QUALITY.mythic} title="katana" descript="sharp +5" />
    <ItemCard itemNumber={11} quality={QUALITY.basic} title="hand axe" descript="" />
    <ItemCard itemNumber={14} quality={QUALITY.epic} title="sabre" descript="pierce +2" />
    <ItemCard itemNumber={13} quality={QUALITY.basic} title="wide knife" descript="ritual +1" />
  </div>
);

export default () => {
  return (
    <MobilFrame>
      <h1>Fire Saga</h1>
      <p>After long fight with reducer new flame rising on horizont. Will be the skalds sing song about Fire Saga.</p> 
      <p style={{textAlign:'center'}}>
        It is I, his chronicler,<br/>
        who alone can tell thee of his saga.<br/>
        Let me tell you of the days of high adventure!<br/>
      </p>
      <div className="grid">
        {Array(100).fill().map((_, i) => (
         <MobCard mobNumber={i} title={`mob: ${i}`} descript="" />
        ))}
      </div>
      <div className="grid">
        {Array(45).fill().map((_, i) => (
          <ItemCard key={i} itemNumber={i} quality={QUALITY.basic} title={`item: ${i}`} descript="" />
        ))}
      </div>
    </MobilFrame>
  );
}