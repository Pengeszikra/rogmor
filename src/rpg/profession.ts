import { rnd, leveling, uid, pickOne } from './rpg';

export interface Ability { 
  title:string;
  body: number;
  reaction: number;
  soul: number;
  popular: number;
  stamina: number;
  will: number;
  joyful: number; 
}

export interface Condition {
  staminaState: number;
  willState: number;
  joyfulState: number;
}

export enum Team { PLAYER, GOOD, BAD, UGLY };

export interface MobTraits {  
  level: number;
  professionType: ProfessionKey;
  ability: Ability;
  condition: Condition;
}
export interface MobPerson {  
  name: string;
  avatar: number;
  coord: number;
  uid: string;
  team: Team;
}

export interface Mob extends MobTraits, MobPerson {}

export type ProfessionKey =
  'fighter' |'priest' |'paladin' |'knight' |'assasin' |'rogue' |'mage' |'captain' |'noble' |
  'headHunter' |'witch' |'valkur' |'guard' |'gladiator' |'barbarian' |'wizard' |'sage' |
  'samurai' |'ninja' |'warlord' |'bishop' |'tracker' |'dementor' |'necromanta' |'summoner' |
  'shaman' |'thief' |'rouge' |'cavalier' |'pirate' |'inquisitor' |'icelander' |'heretic' |
  'nomad' |'bard' |'warlock' |'monk' |'druid' |'illusionist' |'wardancer' |'runeSmith' |
  'merchant' |'explorer' |'templar' |'spy' |'nun' |'mercenary' |'duelist' |'beastmaster' |
  'sorcerer' |'archer' |'psionic' |'alchemist' |'enginer' |'antiPaladin' |'chaosKnigh' |
  'chief' |'maruder' |'rich' |'shapechanger' 

export type ProfessionLookup = Record<ProfessionKey, Ability>; 

export const professionLookup:ProfessionLookup = {
    fighter:      { title:'Fighter',      body: 7, reaction: 4, soul: 2, popular: 4, stamina: 55, will: 45, joyful: 40 },
    priest:       { title:'Priest',       body: 3, reaction: 3, soul: 7, popular: 8, stamina: 35, will: 65, joyful: 40 },
    paladin:      { title:'Paladin',      body: 6, reaction: 3, soul: 6, popular: 6, stamina: 50, will: 50, joyful: 40 },
    knight:       { title:'Knight',       body: 7, reaction: 3, soul: 3, popular: 5, stamina: 60, will: 50, joyful: 40 },
    assasin:      { title:'Assasin',      body: 5, reaction: 7, soul: 1, popular: 3, stamina: 45, will: 55, joyful: 40 },
    rogue:        { title:'Rogue',        body: 4, reaction: 6, soul: 3, popular: 5, stamina: 55, will: 40, joyful: 40 },
    mage:         { title:'Mage',         body: 3, reaction: 4, soul: 6, popular: 2, stamina: 25, will: 70, joyful: 40 },
    captain:      { title:'Captain',      body: 5, reaction: 5, soul: 5, popular: 6, stamina: 55, will: 55, joyful: 40 },
    noble:        { title:'Noble',        body: 4, reaction: 5, soul: 6, popular: 7, stamina: 45, will: 60, joyful: 40 },
    headHunter:   { title:'Head hunter',  body: 5, reaction: 7, soul: 3, popular: 4, stamina: 60, will: 45, joyful: 40 },
    witch:        { title:'Witch',        body: 2, reaction: 5, soul: 6, popular: 2, stamina: 25, will: 65, joyful: 40 },
    valkur:       { title:'Valkur',       body: 5, reaction: 6, soul: 4, popular: 2, stamina: 60, will: 60, joyful: 40 },
    guard:        { title:'Guard',        body: 6, reaction: 5, soul: 2, popular: 4, stamina: 65, will: 40, joyful: 40 },
    gladiator:    { title:'Gladiator',    body: 7, reaction: 5, soul: 2, popular: 2, stamina: 75, will: 25, joyful: 40 },
    barbarian:    { title:'Barbarian',    body: 8, reaction: 6, soul: 2, popular: 2, stamina: 80, will: 35, joyful: 40 },
    wizard:       { title:'Wizard',       body: 1, reaction: 2, soul: 8, popular: 2, stamina: 25, will: 80, joyful: 40 },
    sage:         { title:'Sage',         body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, will: 60, joyful: 40 },
    samurai:      { title:'Samurai',      body: 6, reaction: 7, soul: 4, popular: 5, stamina: 70, will: 55, joyful: 40 },
    ninja:        { title:'Ninja',        body: 4, reaction: 8, soul: 3, popular: 3, stamina: 55, will: 45, joyful: 40 },
    warlord:      { title:'Warlord',      body: 4, reaction: 5, soul: 6, popular: 8, stamina: 45, will: 60, joyful: 40 },
    bishop:       { title:'Bishop',       body: 4, reaction: 5, soul: 6, popular: 8, stamina: 45, will: 60, joyful: 40 },
    tracker:      { title:'Tracker',      body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, will: 60, joyful: 40 },
    dementor:     { title:'Dementor',     body: 6, reaction: 4, soul: 1, popular: 1, stamina: 75, will: 70, joyful: 40 },
    necromanta:   { title:'Necromanta',   body: 2, reaction: 5, soul: 6, popular: 1, stamina: 45, will: 60, joyful: 40 },
    summoner:     { title:'Summoner',     body: 3, reaction: 5, soul: 6, popular: 2, stamina: 45, will: 60, joyful: 40 },
    shaman:       { title:'Shaman',       body: 4, reaction: 5, soul: 6, popular: 6, stamina: 45, will: 60, joyful: 40 },
    thief:        { title:'Thief',        body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, will: 60, joyful: 40 },
    rouge:        { title:'Rouge',        body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, will: 60, joyful: 40 },
    cavalier:     { title:'Cavalier',     body: 6, reaction: 5, soul: 6, popular: 4, stamina: 45, will: 60, joyful: 40 },
    pirate:       { title:'Pirate',       body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, will: 60, joyful: 40 },
    inquisitor:   { title:'Inquisitor',   body: 4, reaction: 5, soul: 6, popular: 4, stamina: 45, will: 60, joyful: 40 },
    icelander:    { title:'Icelander',    body: 7, reaction: 6, soul: 6, popular: 3, stamina: 45, will: 60, joyful: 40 },
    heretic:      { title:'Heretic',      body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, will: 60, joyful: 40 },
    nomad:        { title:'Nomad',        body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, will: 60, joyful: 40 },
    bard:         { title:'Bard',         body: 4, reaction: 5, soul: 6, popular: 6, stamina: 45, will: 60, joyful: 40 },
    warlock:      { title:'Warlock',      body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, will: 60, joyful: 40 },
    monk:         { title:'Monk',         body: 6, reaction: 6, soul: 6, popular: 5, stamina: 45, will: 60, joyful: 40 },
    druid:        { title:'Druid',        body: 4, reaction: 5, soul: 6, popular: 4, stamina: 45, will: 60, joyful: 40 },
    illusionist:  { title:'Illusionist',  body: 3, reaction: 6, soul: 5, popular: 5, stamina: 35, will: 50, joyful: 40 },
    wardancer:    { title:'Wardancer',    body: 5, reaction: 7, soul: 6, popular: 2, stamina: 60, will: 40, joyful: 40 },
    runeSmith:    { title:'Rune smith',   body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, will: 60, joyful: 40 },
    merchant:     { title:'Merchant',     body: 3, reaction: 3, soul: 6, popular: 6, stamina: 55, will: 65, joyful: 40 },
    explorer:     { title:'Explorer',     body: 4, reaction: 5, soul: 6, popular: 7, stamina: 45, will: 60, joyful: 40 },
    templar:      { title:'Templar',      body: 6, reaction: 3, soul: 6, popular: 5, stamina: 60, will: 55, joyful: 40 },
    spy:          { title:'Spy',          body: 4, reaction: 5, soul: 6, popular: 5, stamina: 45, will: 60, joyful: 40 },
    nun:          { title:'Nun',          body: 4, reaction: 5, soul: 6, popular: 2, stamina: 45, will: 60, joyful: 40 },
    mercenary:    { title:'Mercenary',    body: 4, reaction: 5, soul: 6, popular: 3, stamina: 45, will: 60, joyful: 40 },
    duelist:      { title:'Duelist',      body: 3, reaction: 8, soul: 5, popular: 5, stamina: 50, will: 60, joyful: 40 },
    beastmaster:  { title:'Beastmaster',  body: 6, reaction: 5, soul: 7, popular: 1, stamina: 45, will: 70, joyful: 40 },
    sorcerer:     { title:'Sorcerer',     body: 3, reaction: 5, soul: 6, popular: 2, stamina: 45, will: 60, joyful: 40 },
    archer:       { title:'Archer',       body: 4, reaction: 7, soul: 6, popular: 3, stamina: 45, will: 60, joyful: 40 },
    psionic:      { title:'Psionic',      body: 4, reaction: 4, soul: 7, popular: 3, stamina: 45, will: 60, joyful: 40 },
    alchemist:    { title:'Alchemist',    body: 3, reaction: 5, soul: 7, popular: 2, stamina: 35, will: 70, joyful: 40 },
    enginer:      { title:'Enginer',      body: 3, reaction: 5, soul: 4, popular: 4, stamina: 35, will: 65, joyful: 40 },
    antiPaladin:  { title:'Anti Paladin', body: 7, reaction: 3, soul: 1, popular: 5, stamina: 60, will: 60, joyful: 10 },
    chaosKnigh:   { title:'Chaos Knigh',  body: 7, reaction: 4, soul: 6, popular: 1, stamina: 50, will: 60, joyful: 10 },
    chief:        { title:'Chief',        body: 5, reaction: 5, soul: 4, popular: 7, stamina: 55, will: 60, joyful: 40 },
    maruder:      { title:'Maruder',      body: 7, reaction: 4, soul: 2, popular: 4, stamina: 60, will: 40, joyful: 40 },
    rich:         { title:'Rich',         body: 3, reaction: 4, soul: 3, popular: 8, stamina: 30, will: 70, joyful: 30 },
    shapechanger: { title:'Shapechanger', body: 6, reaction: 4, soul: 4, popular: 2, stamina: 55, will: 45, joyful: 30 },
}

// https://en.wikipedia.org/wiki/Character_class_(Dungeons_%26_Dragons)
// https://wfrp1e.fandom.com/wiki/List_Of_Advanced_Careers

export const professionList = Object.values(professionLookup);

export const traitsFactory = (level:number = 1,  professionType:ProfessionKey) => {

  const ability:Ability = professionLookup?.[professionType] ?? pickOne(professionList);

  const stamina = leveling(level, ability.stamina  / 10, 2);
  const will    = leveling(level, ability.will     / 10, 2);
  const joyful  = leveling(level, ability.joyful   / 10, 2);

  const mobTraits:MobTraits = {
    level,
    professionType,
    ability: {
      title        : ability.title,
      body         : leveling(level, ability.body     / 10, 2),
      reaction     : leveling(level, ability.reaction / 10, 2),
      soul         : leveling(level, ability.soul     / 10, 2),
      popular      : leveling(level, ability.popular  / 10, 2),
      stamina,
      will,
      joyful,
    },
    condition: {
      staminaState : stamina,
      willState    : will,
      joyfulState  : joyful,
    }
  };

  return mobTraits;
}

export const mobFactory = (name, avatar, coord, uid, team, traits:MobTraits):Mob => ({
  name,
  avatar,
  coord,
  uid,
  team,
  ...traits
});

export const increaseLevel = (amount:number = 1) => ({
  level, 
  professionType, 
  ability, 
  condition, 
  ...rest
}:Mob):Mob => ({
  ...traitsFactory(level + amount, professionType),
  ...rest
});

export const oneLevelUp = increaseLevel(1);