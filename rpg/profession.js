import {rnd, leveling} from './rpg';

export const profTypes = {
    fighter: { profession:'Fighter',     physique: 7, reaction: 4, soul: 2, stamina: 55, willpower: 45 },
    priest: { profession:'Priest',      physique: 3, reaction: 3, soul: 7, stamina: 35, willpower: 65 },
    paladin: { profession:'Paladin',     physique: 6, reaction: 3, soul: 6, stamina: 50, willpower: 50 },
    knight: { profession:'Knight',      physique: 7, reaction: 3, soul: 3, stamina: 60, willpower: 50 },
    assasin: { profession:'Assasin',     physique: 5, reaction: 7, soul: 1, stamina: 45, willpower: 55 },
    rogue: { profession:'Rogue',       physique: 4, reaction: 6, soul: 3, stamina: 55, willpower: 40 },
    mage: { profession:'Mage',        physique: 3, reaction: 4, soul: 6, stamina: 25, willpower: 70 },
    captain: { profession:'Captain',     physique: 5, reaction: 5, soul: 5, stamina: 55, willpower: 55 },
    noble: { profession:'Noble',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    headHunter: { profession:'Head hunter', physique: 5, reaction: 7, soul: 3, stamina: 60, willpower: 45 },
    witch: { profession:'Witch',       physique: 2, reaction: 5, soul: 6, stamina: 25, willpower: 65 },
    valkur: { profession:'Valkur',      physique: 5, reaction: 6, soul: 4, stamina: 60, willpower: 60 },
    guard: { profession:'Guard',       physique: 6, reaction: 5, soul: 2, stamina: 65, willpower: 40 },
    gladiator: { profession:'Gladiator',   physique: 7, reaction: 5, soul: 1, stamina: 75, willpower: 25 },
    barbarian: { profession:'Barbarian',   physique: 8, reaction: 6, soul: 1, stamina: 80, willpower: 35 },
    wizard: { profession:'Wizard',      physique: 1, reaction: 2, soul: 8, stamina: 25, willpower: 80 },
}

const professions = Object.keys(profTypes).map( key => profTypes[key]);

export default (level = 1, profession = professions[rnd(professions.length)] ) => {
  profession.physique  = leveling(level, profession.physique  / 10, 2);
  profession.reaction  = leveling(level, profession.reaction  / 10, 2);
  profession.soul      = leveling(level, profession.soul      / 10, 2);
  profession.stamina   = leveling(level, profession.stamina   / 10, 2);
  profession.willpower = leveling(level, profession.willpower / 10, 2);
  profession.staminaState = profession.stamina;
  profession.willpowerState = profession.willpower;
  return ({...profession, level, type: profession});
}