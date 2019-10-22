import {rnd, leveling} from './rpg';

export default (level) => {
  const professions = [
    { profession:'Fighter',     physique: 7, reaction: 4, soul: 2 },
    { profession:'Priest',      physique: 3, reaction: 3, soul: 7 },
    { profession:'Paladin',     physique: 6, reaction: 3, soul: 6 },
    { profession:'Knight',      physique: 7, reaction: 3, soul: 3 },
    { profession:'Assasin',     physique: 5, reaction: 7, soul: 1 },
    { profession:'Rogue',       physique: 4, reaction: 6, soul: 3 },
    { profession:'Mage',        physique: 3, reaction: 4, soul: 6 },
    { profession:'Captain',     physique: 5, reaction: 5, soul: 5 },
    { profession:'Noble',       physique: 4, reaction: 5, soul: 6 },
    { profession:'Head hunter', physique: 5, reaction: 7, soul: 3 },
    { profession:'Witch',       physique: 2, reaction: 5, soul: 6 },
    { profession:'Valkur',      physique: 5, reaction: 6, soul: 4 },
    { profession:'Guard',       physique: 6, reaction: 5, soul: 2 },
    { profession:'Gladiator',   physique: 7, reaction: 5, soul: 1 },
    { profession:'Barbarian',   physique: 8, reaction: 6, soul: 1 },
    { profession:'Wizard',      physique: 1, reaction: 2, soul: 8 },
  ];  
  const profession = professions[professions.length * Math.random() |0];
  level = level | rnd(49) + 1;
  profession.physique = leveling(level, profession.physique / 10, 2);
  profession.reaction = leveling(level, profession.reaction / 10, 2);
  profession.soul     = leveling(level, profession.soul     / 10, 2);
  return ({...profession, level});
}