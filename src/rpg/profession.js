import {rnd, leveling} from './rpg';

export const profTypes = {
    fighter:     { profession:'Fighter',     physique: 7, reaction: 4, soul: 2, stamina: 55, willpower: 45 },
    priest:      { profession:'Priest',      physique: 3, reaction: 3, soul: 7, stamina: 35, willpower: 65 },
    paladin:     { profession:'Paladin',     physique: 6, reaction: 3, soul: 6, stamina: 50, willpower: 50 },
    knight:      { profession:'Knight',      physique: 7, reaction: 3, soul: 3, stamina: 60, willpower: 50 },
    assasin:     { profession:'Assasin',     physique: 5, reaction: 7, soul: 1, stamina: 45, willpower: 55 },
    rogue:       { profession:'Rogue',       physique: 4, reaction: 6, soul: 3, stamina: 55, willpower: 40 },
    mage:        { profession:'Mage',        physique: 3, reaction: 4, soul: 6, stamina: 25, willpower: 70 },
    captain:     { profession:'Captain',     physique: 5, reaction: 5, soul: 5, stamina: 55, willpower: 55 },
    noble:       { profession:'Noble',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    headHunter:  { profession:'Head hunter', physique: 5, reaction: 7, soul: 3, stamina: 60, willpower: 45 },
    witch:       { profession:'Witch',       physique: 2, reaction: 5, soul: 6, stamina: 25, willpower: 65 },
    valkur:      { profession:'Valkur',      physique: 5, reaction: 6, soul: 4, stamina: 60, willpower: 60 },
    guard:       { profession:'Guard',       physique: 6, reaction: 5, soul: 2, stamina: 65, willpower: 40 },
    gladiator:   { profession:'Gladiator',   physique: 7, reaction: 5, soul: 1, stamina: 75, willpower: 25 },
    barbarian:   { profession:'Barbarian',   physique: 8, reaction: 6, soul: 1, stamina: 80, willpower: 35 },
    wizard:      { profession:'Wizard',      physique: 1, reaction: 2, soul: 8, stamina: 25, willpower: 80 },
    // brand new classes values not setted
    sage:        { profession:'Sage',        physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    samurai:     { profession:'Samurai',     physique: 6, reaction: 7, soul: 4, stamina: 70, willpower: 55 },
    ninja:       { profession:'Ninja',       physique: 4, reaction: 8, soul: 3, stamina: 55, willpower: 45 },
    warlord:     { profession:'Warlord',     physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    bishop:      { profession:'Bishop',      physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    tracker:     { profession:'Tracker',     physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    dementor:    { profession:'Dementor',    physique: 4, reaction: 4, soul: 1, stamina: 75, willpower: 70 },
    necromanta:  { profession:'Necromanta',  physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    summoner:    { profession:'Summoner',    physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    shaman:      { profession:'Shaman',      physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    thief:       { profession:'Thief',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    rouge:       { profession:'Rouge',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    cavalier:    { profession:'Cavalier',    physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    pirate:      { profession:'Pirate',      physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    inquisitor:  { profession:'Inquisitor',  physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    icelander:   { profession:'Icelander',   physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    heretic:     { profession:'Heretic',     physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    nomad:       { profession:'Nomad',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    bard:        { profession:'Bard',        physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    warlock:     { profession:'Warlock',     physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    monk:        { profession:'Monk',        physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    druid:       { profession:'Druid',       physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    illusionist: { profession:'Illusionist', physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    wardancer:   { profession:'Wardancer',   physique: 5, reaction: 7, soul: 6, stamina: 60, willpower: 40 },
    runeSmith:   { profession:'Rune smith',  physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    merchant:    { profession:'Merchant',    physique: 3, reaction: 3, soul: 6, stamina: 55, willpower: 65 },
    explorer:    { profession:'Explorer',    physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    templar:     { profession:'Templar',     physique: 6, reaction: 3, soul: 6, stamina: 60, willpower: 55 },
    spy:         { profession:'Spy',         physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    nun:         { profession:'Nun',         physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    mercenary:   { profession:'Mercenary',   physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    duelist:     { profession:'Duelist',     physique: 3, reaction: 8, soul: 5, stamina: 50, willpower: 60 },
    beastmaster: { profession:'Beastmaster', physique: 4, reaction: 4, soul: 7, stamina: 45, willpower: 70 },
    sorcerer:    { profession:'Sorcerer',    physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    archer:      { profession:'Archer',      physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    psionic:     { profession:'Psionic',     physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },
    alchemist:   { profession:'Alchemist',   physique: 4, reaction: 5, soul: 6, stamina: 45, willpower: 60 },

    // mentor, diviner, marauder, detective, seer, whisper,
}

// https://en.wikipedia.org/wiki/Character_class_(Dungeons_%26_Dragons)
// https://wfrp1e.fandom.com/wiki/List_Of_Advanced_Careers

const professions = Object.keys(profTypes).map( key => profTypes[key]);

export default (level = 1, profession = professions[rnd(professions.length)] ) => {
  const leveled = {
    physique   : leveling(level, profession.physique  / 10, 2),
    reaction   : leveling(level, profession.reaction  / 10, 2),
    soul       : leveling(level, profession.soul      / 10, 2),
    stamina    : leveling(level, profession.stamina   / 10, 2),
    willpower  : leveling(level, profession.willpower / 10, 2),
    profession : profession.profession,
  };
  leveled.staminaState = leveled.stamina;
  leveled.willpowerState = leveled.willpower;
  return ({...leveled, level, type: profession});
}