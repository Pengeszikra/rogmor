import { increaseLevel, Mob } from './profession';
import { FlowAction } from './slash';
import { Labels, TypedActionMap } from 'react-state-factory';

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
  isAutoFight: boolean;
  encounterResult: any;
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
  isAutoFight: false,
  encounterResult: null,
};

export type ActionsMap = 
  | { type: "SET_HERO", payload: any }
  | { type: "MOD_HERO", payload: any }
  | { type: "NEXT_ROUND", payload: any }
  | { type: "HEART_BEAT", payload: any }
  | { type: "USE_SKILL", payload: any }
  | { type: "SET_GAME_STATE", payload: any }
  | { type: "SET_AUTO_FIGHT", payload: any }
  | { type: "SETUP_ENTITIES", payload: any }
  | { type: "MOD_ENTITI", payload: any }
  | { type: "ADD_ENTITI", payload: any }
  | { type: "REMOVE_ENTITI", payload: any }
  | { type: "FOCUS_ON", payload: any }
  | { type: "FIGHT", payload: any }
  | { type: "SKILL", payload: any }
  | { type: "TALK", payload: any }
  | { type: "ENCOUNTER_BEGIN", payload: any }
  | { type: "ENCOUNTER_OUTCOME", payload: any }
  | { type: "ENCOUNTER_RESULT", payload: any }
  | { type: "LEVEL_UP_HERO", payload: any }
  | { type: "USER_ACT", payload: any }
  | { type: "PLAY_ACTION", payload: any }
  | { type: "PLAY_OUTCOME", payload: any }
  | { type: "ANIMATION_ENDED", payload: any }
  | { type: "ANIMATION_SKIPPED", payload: any }
  | { type: "SET_MOB_LIST", payload: any }
  | { type: "PLAY_FLOW", payload: any }
  | { type: "PLAY_ACTION_ANIM", payload: any }

export const labels:Labels<ActionsMap> = {
  SET_HERO: 'SET_HERO',
  MOD_HERO: 'MOD_HERO',
  NEXT_ROUND: 'NEXT_ROUND',
  HEART_BEAT: 'HEART_BEAT',
  USE_SKILL: 'USE_SKILL',
  SET_GAME_STATE: 'SET_GAME_STATE',
  SET_AUTO_FIGHT: 'SET_AUTO_FIGHT',
  SETUP_ENTITIES: 'SETUP_ENTITIES',
  MOD_ENTITI: 'MOD_ENTITI',
  ADD_ENTITI: 'ADD_ENTITI',
  REMOVE_ENTITI: 'REMOVE_ENTITI',
  FOCUS_ON: 'FOCUS_ON',
  FIGHT: 'FIGHT',
  SKILL: 'SKILL',
  TALK: 'TALK',
  ENCOUNTER_BEGIN: 'ENCOUNTER_BEGIN',
  ENCOUNTER_OUTCOME: 'ENCOUNTER_OUTCOME',
  ENCOUNTER_RESULT: 'ENCOUNTER_RESULT',
  LEVEL_UP_HERO: 'LEVEL_UP_HERO',
  USER_ACT: 'USER_ACT',
  PLAY_ACTION: 'PLAY_ACTION',
  PLAY_OUTCOME: 'PLAY_OUTCOME',
  ANIMATION_ENDED: 'ANIMATION_ENDED',
  ANIMATION_SKIPPED: 'ANIMATION_SKIPPED',
  SET_MOB_LIST: 'SET_MOB_LIST',
  PLAY_FLOW: 'PLAY_FLOW',
  PLAY_ACTION_ANIM: 'PLAY_ACTION_ANIM'
}


export const gameReducer = (state:MainState, {type, payload}):MainState => {
  switch (type) {
    case "SET_HERO": return {...state, hero: payload};
    case "MOD_HERO": return {...state, hero: payload(state.hero), combatResult:null};
    case "NEXT_ROUND": return {...state, round: payload(state.round)};
    case "SET_GAME_STATE": return {...state, game:payload};
    case "SETUP_ENTITIES": return {...state, entities: payload};
    case "SET_MOB_LIST": return {...state, mobList: payload};
    case "MOD_ENTITI": {
      const {entities} = state;
      return entities[payload?.uid] 
        ? {...state, entities: {...entities, [payload?.uid]: payload} }
        : state;
    };
    case "FOCUS_ON": return {...state, focus: payload};
    case "PLAY_ACTION_ANIM": return {...state, actionAnim: payload};
    case "PLAY_FLOW": return {...state, flow: payload};
    case "ENCOUNTER_BEGIN": return {...state, encounterResult: null};
    case "ENCOUNTER_RESULT": return {...state, encounterResult: payload};
    case "SET_AUTO_FIGHT": return {...state, isAutoFight: payload};

    case "LEVEL_UP_HERO": return {...state, hero: increaseLevel(1)(state.hero)}
    default: return state;
  }
};

const lostFocus = s => s

const checkIsLive = ({condition}:Mob) => (
     condition.staminaState > 0 
  && condition.focusState > 0 
  && condition.moraleState > 0
);

export interface StateArmy {
  state: MainState;
  army: TypedActionMap<{
    type: any;
    payload: any;
  }, Labels<ActionsMap>>;
}
