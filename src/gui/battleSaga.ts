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

export const physicalStrike = (a, b, round) => {
  const astart = improved(a.reaction) 
  const bstart = improved(b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.body / 2);
  target.staminaState -= Math.min(dmg, target.staminaState);
  return [a, b, {dmg, striker, target, kind: InteractionKind.STRIKE }];
}

export const soulSkill = (a, b, round) => {
  const astart = improved(a.soul + a.reaction) 
  const bstart = improved(b.soul + b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.soul / 2);
  target.willState -= Math.min(dmg, target.willState);
  return [a, b, {dmg, striker, target, kind: InteractionKind.SKILL}];
}

export const socialTalk = (a, b, round) => {
  const astart = improved(a.popular + a.reaction) 
  const bstart = improved(b.popular + b.reaction)
  const [atk, def] = astart > bstart ? [a, b] : [b, a];
  let [striker, target] = round % 2 ? [atk, def] : [def, atk];
  let dmg = improved(striker.popular / 2);
  target.joyfulState -= Math.min(dmg, target.joyfulState);
  return [a, b, {dmg, striker, target, kind: InteractionKind.TALK}];
}

export const strikeDamage = ({body}, imp = improved) => imp(body / 2);
export const mentalDamage = ({soul}, imp = improved) => imp(soul / 2);
export const persuasion   = ({popular}, imp = improved) => imp(popular / 2);
export const strikeOrder = (imp = improved) => (...entities) => entities
  .map(entiti => [entiti, imp(entiti.reaction + (entiti.staminaState / 10))])
  .sort(([a, aQuick],[b, bQuick]) => aQuick > bQuick ? 1 : -1 );
export const strikeFirst = (imp = improved) => (a, b) => 
  imp(a.reaction + (a.staminaState / 10)) > imp(b.reaction + (b.staminaState / 10))
  ? a
  : b;