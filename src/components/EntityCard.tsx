import React, {FC} from 'react';
import { Doit, FlowAction } from 'src/rpg/slash';
import { InteractionKind } from '../gui/battleSaga';
import { Mob } from '../rpg/profession';
import { VerticalValue } from './VerticalValue';

export interface IEntityCard {
  mob:Mob;
  tw: string;
  flow: FlowAction;
}
export const EntityCard:FC<IEntityCard> = ({mob, tw="", flow}) => {

  const {
    avatar, level, uid,
    ability:{stamina, will, joyful, title}, 
    condition:{staminaState, willState, joyfulState, isOut}
  } = mob as Mob;

  const [isTarget, dmg] = flow?.amount && flow.amount.find(([id]) => id === uid) || [];

  const woundColor = {
    [InteractionKind.STRIKE]: dmg < 0 ? 'bg-orange-400' : 'bg-green-400',
    [InteractionKind.SKILL]: dmg < 0 ? 'bg-yellow-400' : 'bg-green-300',
    [InteractionKind.TALK]: dmg < 0 ? 'bg-blue-400' : 'bg-green-500',
  }?.[flow?.type] || '';

  return (
    <figure className={`flex gap-0 w-32 h-64 rounded-3xl justify-center flex-wrap items-center shadow-lg ${tw} ${flow?.who === mob.uid ? "brightness-150" : ""}`} style={{opacity: isOut ? ".2" : "1"}}>
      <section className='grid items-center justify-center w-24 h-24 relative'>
        <figure className='face-sprite big-face' data-face={avatar} />
        <div className="absolute rounded-full bg-red-800 p-3 text-lg text-white w-9 h-8 flex items-center justify-center right-24 shadow-lg">
          <span>{level}</span>
        </div>
      </section>
      <div className='text-white p-2 text-lg'>{title}</div>
      <section className='flex gap-2 w-max m-4 items-end justify-end'>
        <VerticalValue tw='bg-rose-900' value={staminaState/stamina}/>
        <VerticalValue tw='bg-yellow-200' value={willState/will} />
        <VerticalValue tw='bg-emerald-900' value={joyfulState/joyful} />
        
      </section>
      {!!isTarget && (
        <figure className={`fading-to-top ${ dmg < 0 ? "text-red-600" : "text-green-600" } ${woundColor} transition  rounded-full p-2 absolute text-5xl`}>{dmg}</figure>
      )}
    </figure>
  );
};