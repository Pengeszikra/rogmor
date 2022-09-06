import { Mob } from "../rpg/profession";
import { improved } from "../rpg/rpg";

export enum InteractionKind {
  STRIKE, SKILL, TALK
}
export interface DamageResult {
  dmg: number;
  striker: any;
  target: any;
  kind: InteractionKind;
}

// too much decision in a single function
export const physicalStrike = (a:Mob, b:Mob, round:number) => {
  const astart = improved(a.ability.reaction) 
  const bstart = improved(b.ability.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.ability.body / 2);
  target.condition.staminaState -= Math.min(dmg, target.condition.staminaState);
  return [a, b, {dmg, striker, target, kind: InteractionKind.STRIKE }];
}

export const soulSkill = (a:Mob, b:Mob, round:number) => {
  const astart = improved(a.ability.soul + a.ability.reaction) 
  const bstart = improved(b.ability.soul + b.ability.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.ability.soul / 2);
  target.condition.focusState -= Math.min(dmg, target.condition.focusState);
  return [a, b, {dmg, striker, target, kind: InteractionKind.SKILL}];
}

export const socialTalk = (a:Mob, b:Mob, round:number) => {
  const astart = improved(a.ability.presence + a.ability.reaction) 
  const bstart = improved(b.ability.presence + b.ability.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.ability.presence / 2);
  target.condition.moraleState -= Math.min(dmg, target.condition.moraleState);
  return [a, b, {dmg, striker, target, kind: InteractionKind.TALK}];
}

export const strikeDamage = ({ability}, imp = improved) => imp(ability.body / 2);
export const mentalDamage = ({ability}, imp = improved) => imp(ability.soul / 2);
export const persuasion   = ({presence}, imp = improved) => imp(presence / 2);
export const strikeOrder = (imp = improved) => (...entities) => entities
  .map(entiti => [entiti, imp(entiti.ability.reaction + (entiti.condition.staminaState / 10))])
  .sort(([a, aQuick],[b, bQuick]) => aQuick > bQuick ? 1 : -1 );
export const strikeFirst = (imp = improved) => (a:Mob, b:Mob) => 
  imp(a.ability.reaction + (a.condition.staminaState / 10)) > imp(b.ability.reaction + (b.condition.staminaState / 10))
  ? a
  : b;