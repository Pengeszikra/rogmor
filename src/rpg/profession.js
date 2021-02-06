import {rnd, leveling} from './rpg';

export const profTypes = {
    fighter:      { profession:'Fighter',      physique: 7, reaction: 4, soul: 2, liaison: 4, stamina: 55, willpower: 45, merry: 40 },
    priest:       { profession:'Priest',       physique: 3, reaction: 3, soul: 7, liaison: 8, stamina: 35, willpower: 65, merry: 40 },
    paladin:      { profession:'Paladin',      physique: 6, reaction: 3, soul: 6, liaison: 6, stamina: 50, willpower: 50, merry: 40 },
    knight:       { profession:'Knight',       physique: 7, reaction: 3, soul: 3, liaison: 5, stamina: 60, willpower: 50, merry: 40 },
    assasin:      { profession:'Assasin',      physique: 5, reaction: 7, soul: 1, liaison: 3, stamina: 45, willpower: 55, merry: 40 },
    rogue:        { profession:'Rogue',        physique: 4, reaction: 6, soul: 3, liaison: 5, stamina: 55, willpower: 40, merry: 40 },
    mage:         { profession:'Mage',         physique: 3, reaction: 4, soul: 6, liaison: 2, stamina: 25, willpower: 70, merry: 40 },
    captain:      { profession:'Captain',      physique: 5, reaction: 5, soul: 5, liaison: 6, stamina: 55, willpower: 55, merry: 40 },
    noble:        { profession:'Noble',        physique: 4, reaction: 5, soul: 6, liaison: 7, stamina: 45, willpower: 60, merry: 40 },
    headHunter:   { profession:'Head hunter',  physique: 5, reaction: 7, soul: 3, liaison: 4, stamina: 60, willpower: 45, merry: 40 },
    witch:        { profession:'Witch',        physique: 2, reaction: 5, soul: 6, liaison: 2, stamina: 25, willpower: 65, merry: 40 },
    valkur:       { profession:'Valkur',       physique: 5, reaction: 6, soul: 4, liaison: 2, stamina: 60, willpower: 60, merry: 40 },
    guard:        { profession:'Guard',        physique: 6, reaction: 5, soul: 2, liaison: 4, stamina: 65, willpower: 40, merry: 40 },
    gladiator:    { profession:'Gladiator',    physique: 7, reaction: 5, soul: 2, liaison: 2, stamina: 75, willpower: 25, merry: 40 },
    barbarian:    { profession:'Barbarian',    physique: 8, reaction: 6, soul: 2, liaison: 2, stamina: 80, willpower: 35, merry: 40 },
    wizard:       { profession:'Wizard',       physique: 1, reaction: 2, soul: 8, liaison: 2, stamina: 25, willpower: 80, merry: 40 },
    sage:         { profession:'Sage',         physique: 4, reaction: 5, soul: 6, liaison: 5, stamina: 45, willpower: 60, merry: 40 },
    samurai:      { profession:'Samurai',      physique: 6, reaction: 7, soul: 4, liaison: 5, stamina: 70, willpower: 55, merry: 40 },
    ninja:        { profession:'Ninja',        physique: 4, reaction: 8, soul: 3, liaison: 3, stamina: 55, willpower: 45, merry: 40 },
    warlord:      { profession:'Warlord',      physique: 4, reaction: 5, soul: 6, liaison: 8, stamina: 45, willpower: 60, merry: 40 },
    bishop:       { profession:'Bishop',       physique: 4, reaction: 5, soul: 6, liaison: 8, stamina: 45, willpower: 60, merry: 40 },
    tracker:      { profession:'Tracker',      physique: 4, reaction: 5, soul: 6, liaison: 5, stamina: 45, willpower: 60, merry: 40 },
    dementor:     { profession:'Dementor',     physique: 6, reaction: 4, soul: 1, liaison: 1, stamina: 75, willpower: 70, merry: 40 },
    necromanta:   { profession:'Necromanta',   physique: 2, reaction: 5, soul: 6, liaison: 1, stamina: 45, willpower: 60, merry: 40 },
    summoner:     { profession:'Summoner',     physique: 3, reaction: 5, soul: 6, liaison: 2, stamina: 45, willpower: 60, merry: 40 },
    shaman:       { profession:'Shaman',       physique: 4, reaction: 5, soul: 6, liaison: 6, stamina: 45, willpower: 60, merry: 40 },
    thief:        { profession:'Thief',        physique: 4, reaction: 5, soul: 6, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    rouge:        { profession:'Rouge',        physique: 4, reaction: 5, soul: 6, liaison: 5, stamina: 45, willpower: 60, merry: 40 },
    cavalier:     { profession:'Cavalier',     physique: 6, reaction: 5, soul: 6, liaison: 4, stamina: 45, willpower: 60, merry: 40 },
    pirate:       { profession:'Pirate',       physique: 4, reaction: 5, soul: 6, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    inquisitor:   { profession:'Inquisitor',   physique: 4, reaction: 5, soul: 6, liaison: 4, stamina: 45, willpower: 60, merry: 40 },
    icelander:    { profession:'Icelander',    physique: 7, reaction: 6, soul: 6, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    heretic:      { profession:'Heretic',      physique: 4, reaction: 5, soul: 6, liaison: 2, stamina: 45, willpower: 60, merry: 40 },
    nomad:        { profession:'Nomad',        physique: 4, reaction: 5, soul: 6, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    bard:         { profession:'Bard',         physique: 4, reaction: 5, soul: 6, liaison: 6, stamina: 45, willpower: 60, merry: 40 },
    warlock:      { profession:'Warlock',      physique: 4, reaction: 5, soul: 6, liaison: 2, stamina: 45, willpower: 60, merry: 40 },
    monk:         { profession:'Monk',         physique: 6, reaction: 6, soul: 6, liaison: 5, stamina: 45, willpower: 60, merry: 40 },
    druid:        { profession:'Druid',        physique: 4, reaction: 5, soul: 6, liaison: 4, stamina: 45, willpower: 60, merry: 40 },
    illusionist:  { profession:'Illusionist',  physique: 3, reaction: 6, soul: 5, liaison: 5, stamina: 35, willpower: 50, merry: 40 },
    wardancer:    { profession:'Wardancer',    physique: 5, reaction: 7, soul: 6, liaison: 2, stamina: 60, willpower: 40, merry: 40 },
    runeSmith:    { profession:'Rune smith',   physique: 4, reaction: 5, soul: 6, liaison: 2, stamina: 45, willpower: 60, merry: 40 },
    merchant:     { profession:'Merchant',     physique: 3, reaction: 3, soul: 6, liaison: 6, stamina: 55, willpower: 65, merry: 40 },
    explorer:     { profession:'Explorer',     physique: 4, reaction: 5, soul: 6, liaison: 7, stamina: 45, willpower: 60, merry: 40 },
    templar:      { profession:'Templar',      physique: 6, reaction: 3, soul: 6, liaison: 5, stamina: 60, willpower: 55, merry: 40 },
    spy:          { profession:'Spy',          physique: 4, reaction: 5, soul: 6, liaison: 5, stamina: 45, willpower: 60, merry: 40 },
    nun:          { profession:'Nun',          physique: 4, reaction: 5, soul: 6, liaison: 2, stamina: 45, willpower: 60, merry: 40 },
    mercenary:    { profession:'Mercenary',    physique: 4, reaction: 5, soul: 6, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    duelist:      { profession:'Duelist',      physique: 3, reaction: 8, soul: 5, liaison: 5, stamina: 50, willpower: 60, merry: 40 },
    beastmaster:  { profession:'Beastmaster',  physique: 6, reaction: 5, soul: 7, liaison: 1, stamina: 45, willpower: 70, merry: 40 },
    sorcerer:     { profession:'Sorcerer',     physique: 3, reaction: 5, soul: 6, liaison: 2, stamina: 45, willpower: 60, merry: 40 },
    archer:       { profession:'Archer',       physique: 4, reaction: 7, soul: 6, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    psionic:      { profession:'Psionic',      physique: 4, reaction: 4, soul: 7, liaison: 3, stamina: 45, willpower: 60, merry: 40 },
    alchemist:    { profession:'Alchemist',    physique: 3, reaction: 5, soul: 7, liaison: 2, stamina: 35, willpower: 70, merry: 40 },
    enginer:      { profession:'Enginer',      physique: 3, reaction: 5, soul: 4, liaison: 4, stamina: 35, willpower: 65, merry: 40 },
    antiPaladin:  { profession:'Anti Paladin', physique: 7, reaction: 3, soul: 1, liaison: 5, stamina: 60, willpower: 60, merry: 10 },
    chaosKnigh:   { profession:'Chaos Knigh',  physique: 7, reaction: 4, soul: 6, liaison: 1, stamina: 50, willpower: 60, merry: 10 },
    chief:        { profession:'Chief',        physique: 5, reaction: 5, soul: 4, liaison: 7, stamina: 55, willpower: 60, merry: 40 },
    maruder:      { profession:'Maruder',      physique: 7, reaction: 4, soul: 2, liaison: 4, stamina: 60, willpower: 40, merry: 40 },
    rich:         { profession:'Rich',         physique: 3, reaction: 4, soul: 3, liaison: 8, stamina: 30, willpower: 70, merry: 30 },
    shapechanger: { profession:'Shapechanger', physique: 6, reaction: 4, soul: 4, liaison: 2, stamina: 55, willpower: 45, merry: 30 },

    // mentor, diviner, detective, seer
}

// https://en.wikipedia.org/wiki/Character_class_(Dungeons_%26_Dragons)
// https://wfrp1e.fandom.com/wiki/List_Of_Advanced_Careers

/// const professions = Object.keys(profTypes).map( key => profTypes[key]);
const professions = Object.entries(profTypes).map( ([_, prof]) => prof);

export default (level = 1, profession = professions[rnd(professions.length)] ) => {
  const leveled = {
    physique   : leveling(level, profession.physique  / 10, 2),
    reaction   : leveling(level, profession.reaction  / 10, 2),
    soul       : leveling(level, profession.soul      / 10, 2),
    liaison    : leveling(level, profession.liaison   / 10, 2),
    stamina    : leveling(level, profession.stamina   / 10, 2),
    willpower  : leveling(level, profession.willpower / 10, 2),
    merry      : leveling(level, profession.merry     / 10, 2),
    profession : profession.profession,
  };
  leveled.staminaState = leveled.stamina;
  leveled.willpowerState = leveled.willpower;
  leveled.merryState = leveled.merry;
  return ({...leveled, level, type: profession});
}