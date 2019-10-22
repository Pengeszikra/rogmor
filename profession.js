import {rnd, leveling} from './rpg';

export default (level) => {
  const professions = [
    { profession:'Fighter',     physique: 7, reaction: 4, soul: 2, stamina: 55, willpower: 45 },
    { profession:'Priest',      physique: 3, reaction: 3, soul: 7, stamina: 35, willpower: 65 },
    { profession:'Paladin',     physique: 6, reaction: 3, soul: 6, stamina: 50, willpower: 50 },
    { profession:'Knight',      physique: 7, reaction: 3, soul: 3, stamina: 60, willpower: 50 },
    { profession:'Assasin',     physique: 5, reaction: 7, soul: 1, stamina: 45, willpower: 55 },
    { profession:'Rogue',       physique: 4, reaction: 6, soul: 3, stamina: 55, willpower: 40 },
    { profession:'Mage',        physique: 3, reaction: 4, soul: 6, stamina: 25, willpower: 70 },
    { profession:'Captain',     physique: 5, reaction: 5, soul: 5, stamina: 55, willpower: 55 },
    { profession:'Noble',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    { profession:'Head hunter', physique: 5, reaction: 7, soul: 3, stamina: 60, willpower: 45 },
    { profession:'Witch',       physique: 2, reaction: 5, soul: 6, stamina: 25, willpower: 65 },
    { profession:'Valkur',      physique: 5, reaction: 6, soul: 4, stamina: 60, willpower: 60 },
    { profession:'Guard',       physique: 6, reaction: 5, soul: 2, stamina: 65, willpower: 40 },
    { profession:'Gladiator',   physique: 7, reaction: 5, soul: 1, stamina: 75, willpower: 25 },
    { profession:'Barbarian',   physique: 8, reaction: 6, soul: 1, stamina: 80, willpower: 35 },
    { profession:'Wizard',      physique: 1, reaction: 2, soul: 8, stamina: 25, willpower: 80 },
  ];  
  const profession = professions[professions.length * Math.random() |0];
  level = level | rnd(5) + 10; //rnd(49) + 1;
  profession.physique  = leveling(level, profession.physique  / 10, 2);
  profession.reaction  = leveling(level, profession.reaction  / 10, 2);
  profession.soul      = leveling(level, profession.soul      / 10, 2);
  profession.stamina   = leveling(level, profession.stamina   / 10, 2);
  profession.willpower = leveling(level, profession.willpower / 10, 2);
  return ({...profession, level});
}