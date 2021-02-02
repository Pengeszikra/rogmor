import { improved } from "../rpg/rpg";

export function * fightSaga(a, b, fallenOne = p => p, stayInCombat = who => true) {
  // const [a, b] = mobs;
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
  while (def.staminaState > 0 && atk.staminaState > 0 && stayInCombat(a) && stayInCombat(b)) {
    let [striker, target] = round % 2 ? [atk, def] : [def, atk];
    let dmg = improved(striker.physique / 2);
    yield `round: ${round} - ${striker.name} - strike ${dmg}`;
    round ++;
    target.staminaState -= Math.min(dmg, target.staminaState);
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