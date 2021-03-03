import { improved } from "../rpg/rpg";

export function * fightSaga(a, b, fallenOne = p => p) {
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
  while (def.staminaState > 0 && atk.staminaState > 0 && !atk.escape && !def.escape) {
    let [striker, target] = round % 2 ? [atk, def] : [def, atk];
    let dmg = improved(striker.physique / 2);
    yield `round: ${round} - ${striker.name} - strike ${dmg}`;
    round ++;
    target.staminaState -= Math.min(dmg, target.staminaState); // why work this solution
    yield `${target.name} ${target.stamina}/${target.staminaState}`;
  }
  yield `${atk.staminaState <= 0 ? atk.name : '' } knocked out`;
  yield `${def.staminaState <= 0 ? def.name : '' } knocked out`;
  if (a.staminaState <= 0)
    {fallenOne(a);}
  else if (b.staminaState <= 0) 
    {fallenOne(b)}
  else 
    {fallenOne(null)};
}

export const physicalStrike = (a, b, round) => {
  const astart = improved(a.reaction) 
  const bstart = improved(b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.physique / 2);
  target.staminaState -= Math.min(dmg, target.staminaState);
  return [a, b];
}

export const soulSkill = (a, b, round) => {
  const astart = improved(a.soul + a.reaction) 
  const bstart = improved(b.soul + b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.soul / 2);
  target.willpowerState -= Math.min(dmg, target.willpowerState);
  return [a, b];
}

export const socialTalk = (a, b, round) => {
  const astart = improved(a.liaison + a.reaction) 
  const bstart = improved(b.liaison + b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.liaison / 2);
  target.merryState -= Math.min(dmg, target.merryState);
  return [a, b];
}

export const strikeDamage = ({physique}, imp = improved) => imp(physique / 2);
export const mentalDamage = ({soul}, imp = improved) => imp(soul / 2);
export const persuasion   = ({liaison}, imp = improved) => imp(liaison / 2);
export const strikeOrder = (imp = improved) => (...entities) => entities
  .map(entiti => [entiti, imp(entiti.reaction + (entiti.staminaState / 10))])
  .sort(([a, aQuick],[b, bQuick]) => aQuick > bQuick ? 1 : -1 );
export const strikeFirst = (imp = improved) => (a, b) => 
  imp(a.reaction + (a.staminaState / 10)) > imp(b.reaction + (b.staminaState / 10))
  ? a
  : b;