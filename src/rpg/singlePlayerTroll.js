import {useTroll, actionFactory, kebabToCamelCase} from 'react-troll';
import { physicalStrike, socialTalk, soulSkill } from '../gui/battleSaga';

export const [getActionsLookup, action] = actionFactory(kebabToCamelCase);

const initialState = {
  round : 0,
  hero: null,
  game: {},
  entities: {},
  focus: null,
  flow: [],
  actionAnim: null,
  combatResult: null,
};

export const 
  SET_HERO = action('set-hero'),
  MOD_HERO = action('mod-hero'),
  NEXT_ROUND = action('next-round'),
  SET_GAME_STATE = action('set-game-state'),
  SETUP_ENTITIES = action('setup-entities'),
  MOD_ENTITI = action('mod-entiti'),
  ADD_ENTITI = action('add-entiti'),
  REMOVE_ENTITI = action('remove-entiti'),
  FOCUS_ON = action('focus-on'),
  FIGHT = action('fight'),
  SKILL = action('skill'),
  TALK  = action('talk'),
  PLAY_ACTION_ANIM = action('play-action-anim')
;

const gameReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_HERO: return {...state, hero: payload};
    case MOD_HERO: return {...state, hero: payload(state.hero), combatResult:null};
    case NEXT_ROUND: return {...state, round: payload(state.round)};
    case SET_GAME_STATE: return {...state, game: payload(state.game)};
    case SETUP_ENTITIES: return {...state, entities: payload};
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
    default: return state;
  }
};

const lostFocus = s => s

const useFullCheck = ({focus, entities, ...rest}) => {
  const {staminaState, willState, joyfulState} = entities[focus];
  return staminaState > 0 
      && willState > 0 
      && joyfulState > 0
        ? {focus, entities, ...rest} 
        : {focus: null, entities, ...rest}; 
};

const checkIsLive = ({staminaState, willState, joyfulState}) => (staminaState > 0 && willState > 0 && joyfulState > 0);

const interactionRound = interaction => ({hero, entities, round, focus, combatResult, ...rest}) => {
  const [hMod, npcMod] = interaction(hero, entities[focus], round);
  const heroIsDie = !checkIsLive(hMod);
  const npcIsDie = !checkIsLive(npcMod);
  const newCombatResult = heroIsDie
    ? "your adventure is over"
    : npcIsDie
      ? `great win over: ${npcMod.name}`
      : combatResult
  ;
  return {...rest, hero:hMod, round: round + 1, focus, entities:{...entities, [npcMod.uid]:npcMod}, combatResult: newCombatResult};
};

const fightRound = interactionRound(physicalStrike);
const skillRound = interactionRound(soulSkill);
const  talkRound = interactionRound(socialTalk);

export const useSinglePlayerReducer = _ => useTroll(gameReducer, initialState, getActionsLookup);