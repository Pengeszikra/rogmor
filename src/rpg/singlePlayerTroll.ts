import { actionFactory, kebabToCamelCase } from 'react-troll';
import { physicalStrike, socialTalk, soulSkill } from '../gui/battleSaga';
import { increaseLevel, Mob } from './profession';
import { FlowAction } from './slash';

export const [getActionsLookup, action] = actionFactory(kebabToCamelCase);

export enum GameMode {
  ROLL_CHARACTER,
  ADVENTURE_ON_MAP,
}

export enum CombatOutcome {
  HERO_DIE,
  NPC_DIE,
  OVER_WITHOUT_LOSS,
}

export interface MainState {
  round : number;
  hero: Mob;
  focus: string;
  game: GameMode;
  entities: Record<string, Mob>;
  actionAnim: any;
  combatResult: any;
  damegeResult: any;
  encounterOutcome: any[];
  mobList: Mob[];
  flow?: FlowAction;
}

export const initialState:MainState = {
  round : 0,
  hero: null,
  focus: null,
  game: GameMode.ROLL_CHARACTER,
  entities: {},
  actionAnim: null,
  combatResult: null,
  damegeResult: null,
  encounterOutcome: [],
  mobList: [],
  flow: null,
};

export const 
  SET_HERO = action('set-hero'),
  MOD_HERO = action('mod-hero'),
  NEXT_ROUND = action('next-round'),
  HEART_BEAT = action('heart-beat'),
  SET_GAME_STATE = action('set-game-state'),
  SETUP_ENTITIES = action('setup-entities'),
  MOD_ENTITI = action('mod-entiti'),
  ADD_ENTITI = action('add-entiti'),
  REMOVE_ENTITI = action('remove-entiti'),
  FOCUS_ON = action('focus-on'),
  FIGHT = action('fight'),
  SKILL = action('skill'),
  TALK  = action('talk'),
  ENCOUNTER_BEGIN  = action('encounter-begin'),
  ENCOUNTER_OUTCOME  = action('encounter-outcome'),
  LEVEL_UP_HERO  = action('level-up-hero'),
  SET_DAMAGE_RESULT  = action('set-damage-result'),
  USER_ACT = action("user-act"),
  PLAY_ACTION = action("play-action"),
  PLAY_OUTCOME = action("play-outcome"),
  ANIMATION_ENDED = action("animation-ended"),
  ANIMATION_SKIPPED = action("animation-skipped"),

  SET_MOB_LIST = action('set-mob-list'),
  PLAY_FLOW = action('play-flow'),

  PLAY_ACTION_ANIM = action('play-action-anim')
;

export const gameReducer = (state:MainState, {type, payload}) => {
  switch (type) {
    case SET_HERO: return {...state, hero: payload};
    case MOD_HERO: return {...state, hero: payload(state.hero), combatResult:null};
    case NEXT_ROUND: return {...state, round: payload(state.round)};
    case SET_GAME_STATE: return {...state, game:payload};
    case SETUP_ENTITIES: return {...state, entities: payload};
    case SET_MOB_LIST: return {...state, mobList: payload};
    case MOD_ENTITI: {
      const {entities} = state;
      return entities[payload?.uid] 
        ? {...state, entities: {...entities, [payload?.uid]: payload} }
        : state;
    };
    case FOCUS_ON: return {...state, focus: payload};
    case FIGHT: return useFullCheck(fightRound(state));
    case SKILL: return useFullCheck(skillRound(state));
    case TALK:  return useFullCheck(talkRound(state));
    case PLAY_ACTION_ANIM: return {...state, actionAnim: payload};
    case PLAY_FLOW: return {...state, flow: payload};
    case SET_DAMAGE_RESULT: return {...state, damageResult: payload};

    case LEVEL_UP_HERO: return {...state, hero: increaseLevel(1)(state.hero)}
    default: return state;
  }
};

const lostFocus = s => s

const useFullCheck = ({focus, entities, ...rest}) => {
  const {condition:{staminaState, focusState, moraleState}} = entities[focus] as Mob;
  return staminaState > 0 
      && focusState > 0 
      && moraleState > 0
        ? {focus, entities, ...rest} 
        : {focus: null, entities, ...rest}; 
};

const checkIsLive = ({condition}:Mob) => (
     condition.staminaState > 0 
  && condition.focusState > 0 
  && condition.moraleState > 0
);

const interactionRound = interaction => ({hero, entities, round, focus, combatResult, ...rest}) => {
  const [hMod, npcMod, damageResult] = interaction(hero, entities[focus], round);
  const heroIsDie = !checkIsLive(hMod);
  const npcIsDie = !checkIsLive(npcMod);
  const newCombatResult = heroIsDie
    ? CombatOutcome.HERO_DIE
    : npcIsDie
      ? {outcome: CombatOutcome.NPC_DIE, npc: npcMod}
      : CombatOutcome.OVER_WITHOUT_LOSS
  ;
  return {...rest, hero:hMod, round: round + 1, focus, entities:{...entities, [npcMod.uid]:npcMod}, combatResult: newCombatResult, damageResult};
};

const fightRound = interactionRound(physicalStrike);
const skillRound = interactionRound(soulSkill);
const  talkRound = interactionRound(socialTalk);