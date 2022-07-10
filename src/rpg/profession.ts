import {rnd, leveling, uid} from './rpg';

export interface Profession { 
  profession:string;
  body: number;
  reaction: number;
  soul: number;
  popular: number;
  stamina: number;
  willpower: number;
  joyful: number; 
}

export interface ProfessionInstance extends Profession {
  uid: string;
  staminaState: number;
  willpowerState: number;
  joyfulState: number;
}

export type ExsistingProfessions = Record<string, Profession>;

export const profTypes:ExsistingProfessions = {
    fighter:      { profession:'Fighter',      body: 7, reaction: 4, soul: 2, popular: 4, stamina: 55, willpower: 45, joyful: 40 },
    priest:       { profession:'Priest',       body: 3, reaction: 3, soul: 7, popular: 8, stamina: 35, willpower: 65, joyful: 40 },
    paladin:      { profession:'Paladin',      body: 6, reaction: 3, soul: 6, popular: 6, stamina: 50, willpower: 50, joyful: 40 },
    knight:       { profession:'Knight',       body: 7, reaction: 3, soul: 3, popular: 5, stamina: 60, willpower: 50, joyful: 40 },
    assasin:      { profession:'Assasin',      body: 5, reaction: 7, soul: 1, popular: 3, stamina: 45, willpower: 55, joyful: 40 },
    rogue:        { profession:'Rogue',        body: 4, reaction: 6, soul: 3, popular: 5, stamina: 55, willpower: 40, joyful: 40 },
    mage:         { profession:'Mage',         body: 3, reaction: 4, soul: 6, popular: 2, stamina: 25, willpower: 70, joyful: 40 },
    captain:      { profession:'Captain',      body: 5, reaction: 5, soul: 5, popular: 6, stamina: 55, willpower: 55, joyful: 40 },
    noble:        { profession:'Noble',        body: 4, reaction: 5, soul: 6, popular: 7, stamina: 45, willpower: 60, joyful: 40 },
    headHunter:   { profession:'Head hunter',  body: 5, reaction: 7, soul: 3, popular: 4, stamina: 60, willpower: 45, joyful: 40 },
    witch:        { profession:'Witch',        body: 2, reaction: 5, soul: 6, popular: 2, stamina: 25, willpower: 65, joyful: 40 },
    valkur:       { profession:'Valkur',       body: 5, reaction: 6, soul: 4, popular: 2, stamina: 60, willpower: 60, joyful: 40 },
    guard:        { profession:'Guard',        body: 6, reaction: 5, soul: 2, popular: 4, stamina: 65, willpower: 40, joyful: 40 },
    gladiator:    { profession:'Gladiator',    body: 7, reaction: 5, soul: 2, popular: 2, stamina: 75, willpower: 25, joyful: 40 },
    barbarian:    { profession:'Barbarian',    body: 8, reaction: 6, soul: 2, popular: 2, stamina: 80, willpower: 35, joyful: 40 },
    wizard:       { profession:'Wizard',       body: 1, reaction: 2, soul: 8, popular: 2, stamina: 25, willpower: 80, joyful: 40 },
    sage:         { profession:'Sage',         body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, willpower: 60, joyful: 40 },
    samurai:      { profession:'Samurai',      body: 6, reaction: 7, soul: 4, popular: 5, stamina: 70, willpower: 55, joyful: 40 },
    ninja:        { profession:'Ninja',        body: 4, reaction: 8, soul: 3, popular: 3, stamina: 55, willpower: 45, joyful: 40 },
    warlord:      { profession:'Warlord',      body: 4, reaction: 5, soul: 6, popular: 8, stamina: 45, willpower: 60, joyful: 40 },
    bishop:       { profession:'Bishop',       body: 4, reaction: 5, soul: 6, popular: 8, stamina: 45, willpower: 60, joyful: 40 },
    tracker:      { profession:'Tracker',      body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, willpower: 60, joyful: 40 },
    dementor:     { profession:'Dementor',     body: 6, reaction: 4, soul: 1, popular: 1, stamina: 75, willpower: 70, joyful: 40 },
    necromanta:   { profession:'Necromanta',   body: 2, reaction: 5, soul: 6, popular: 1, stamina: 45, willpower: 60, joyful: 40 },
  summoner:     { profession:'Summoner',     body: 3, reaction: 5, soul: 6, popular: 2, stamina: 45, willpower: 60, joyful: 40 },
    shaman:       { profession:'Shaman',       body: 4, reaction: 5, soul: 6, popular: 6, stamina: 45, willpower: 60, joyful: 40 },
    thief:        { profession:'Thief',        body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    rouge:        { profession:'Rouge',        body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, willpower: 60, joyful: 40 },
    cavalier:     { profession:'Cavalier',     body: 6, reaction: 5, soul: 6, popular: 4, stamina: 45, willpower: 60, joyful: 40 },
    pirate:       { profession:'Pirate',       body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    inquisitor:   { profession:'Inquisitor',   body: 4, reaction: 5, soul: 6, popular: 4, stamina: 45, willpower: 60, joyful: 40 },
    icelander:    { profession:'Icelander',    body: 7, reaction: 6, soul: 6, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    heretic:      { profession:'Heretic',      body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, willpower: 60, joyful: 40 },
    nomad:        { profession:'Nomad',        body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    bard:         { profession:'Bard',         body: 4, reaction: 5, soul: 6, popular: 6, stamina: 45, willpower: 60, joyful: 40 },
    warlock:      { profession:'Warlock',      body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, willpower: 60, joyful: 40 },
    monk:         { profession:'Monk',         body: 6, reaction: 6, soul: 6, popular: 5, stamina: 45, willpower: 60, joyful: 40 },
    druid:        { profession:'Druid',        body: 4, reaction: 5, soul: 6, popular: 4, stamina: 45, willpower: 60, joyful: 40 },
    illusionist:  { profession:'Illusionist',  body: 3, reaction: 6, soul: 5, popular: 5, stamina: 35, willpower: 50, joyful: 40 },
    wardancer:    { profession:'Wardancer',    body: 5, reaction: 7, soul: 6, popular: 2, stamina: 60, willpower: 40, joyful: 40 },
    runeSmith:    { profession:'Rune smith',   body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, willpower: 60, joyful: 40 },
    merchant:     { profession:'Merchant',     body: 3, reaction: 3, soul: 6, popular: 6, stamina: 55, willpower: 65, joyful: 40 },
    explorer:     { profession:'Explorer',     body: 4, reaction: 5, soul: 6, popular: 7, stamina: 45, willpower: 60, joyful: 40 },
    templar:      { profession:'Templar',      body: 6, reaction: 3, soul: 6, popular: 5, stamina: 60, willpower: 55, joyful: 40 },
    spy:          { profession:'Spy',          body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, willpower: 60, joyful: 40 },
    nun:          { profession:'Nun',          body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, willpower: 60, joyful: 40 },
    mercenary:    { profession:'Mercenary',    body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    duelist:      { profession:'Duelist',      body: 3, reaction: 8, soul: 5, popular: 5, stamina: 50, willpower: 60, joyful: 40 },
    beastmaster:  { profession:'Beastmaster',  body: 6, reaction: 5, soul: 7, popular: 1, stamina: 45, willpower: 70, joyful: 40 },
    sorcerer:     { profession:'Sorcerer',     body: 3, reaction: 5, soul: 6, popular: 2, stamina: 45, willpower: 60, joyful: 40 },
    archer:       { profession:'Archer',       body: 4, reaction: 7, soul: 6, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    psionic:      { profession:'Psionic',      body: 4, reaction: 4, soul: 7, popular: 3, stamina: 45, willpower: 60, joyful: 40 },
    alchemist:    { profession:'Alchemist',    body: 3, reaction: 5, soul: 7, popular: 2, stamina: 35, willpower: 70, joyful: 40 },
    enginer:      { profession:'Enginer',      body: 3, reaction: 5, soul: 4, popular: 4, stamina: 35, willpower: 65, joyful: 40 },
    antiPaladin:  { profession:'Anti Paladin', body: 7, reaction: 3, soul: 1, popular: 5, stamina: 60, willpower: 60, joyful: 10 },
    chaosKnigh:   { profession:'Chaos Knigh',  body: 7, reaction: 4, soul: 6, popular: 1, stamina: 50, willpower: 60, joyful: 10 },
    chief:        { profession:'Chief',        body: 5, reaction: 5, soul: 4, popular: 7, stamina: 55, willpower: 60, joyful: 40 },
    maruder:      { profession:'Maruder',      body: 7, reaction: 4, soul: 2, popular: 4, stamina: 60, willpower: 40, joyful: 40 },
    rich:         { profession:'Rich',         body: 3, reaction: 4, soul: 3, popular: 8, stamina: 30, willpower: 70, joyful: 30 },
    shapechanger: { profession:'Shapechanger', body: 6, reaction: 4, soul: 4, popular: 2, stamina: 55, willpower: 45, joyful: 30 },
    // child:      { profession:'Children',     body: 1, reaction: 1, soul: 2, popular: 1, stamina:  5, willpower: 50, joyful: 50 },
}

// https://en.wikipedia.org/wiki/Character_class_(Dungeons_%26_Dragons)
// https://wfrp1e.fandom.com/wiki/List_Of_Advanced_Careers

/// const professions = Object.keys(profTypes).map( key => profTypes[key]);
const professions = Object.entries(profTypes).map( ([_, prof]) => prof);

export default (level = 1, profession = professions[rnd(professions.length)], uidFactory = uid ) => {
  const leveled:ProfessionInstance = {
    body    : leveling(level, profession.body    / 10, 2),
    reaction    : leveling(level, profession.reaction    / 10, 2),
    soul        : leveling(level, profession.soul        / 10, 2),
    popular : leveling(level, profession.popular / 10, 2),
    stamina     : leveling(level, profession.stamina     / 10, 2),
    willpower   : leveling(level, profession.willpower   / 10, 2),
    joyful       : leveling(level, profession.joyful       / 10, 2),
    profession  : profession.profession,
    uid         : uidFactory(),
    staminaState: 0,
    willpowerState: 0,
    joyfulState: 0,
  };
  leveled.staminaState = leveled.stamina;
  leveled.willpowerState = leveled.willpower;
  leveled.joyfulState = leveled.joyful;
  return ({...leveled, level, type: profession});
}