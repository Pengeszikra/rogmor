import {actionFactory, kebabToCamelCase} from 'react-troll';
import { physicalStrike, socialTalk, soulSkill } from '../gui/battleSaga';

export const [getActionsLookup, action] = actionFactory(kebabToCamelCase);

export const initialState = {
 round : 0,
 hero: null,
 game: {},
 entities: {},
 focus: null,
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
  TALK  = action('talk')
;

export const gameReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_HERO: return {...state, hero: payload};
    case MOD_HERO: return {...state, hero: state.hero |> payload};
    case NEXT_ROUND: return {...state, round:  state.round |> payload};
    case SET_GAME_STATE: return {...state, game: state.game |> payload};
    case SETUP_ENTITIES: return {...state, entities: payload};
    case MOD_ENTITI: {
      const {entities} = state;
      return entities[payload?.uid] 
        ? {...state, entities: {...entities, [uid]: payload} }
        : state;
    };
    case FOCUS_ON: return {...state, focus: payload};
    case FIGHT: return state |> fightRound |> useFullCheck;
    case SKILL: return state |> skillRound |> useFullCheck;
    case TALK:  return state |> talkRound  |> useFullCheck;
    default: return state;
  }
};

const lostFocus = s => s

const useFullCheck = ({focus, entities, ...rest}) => {
  const {staminaState, willpowerState, merryState} = entities[focus];
  return staminaState > 0 
      && willpowerState > 0 
      && merryState > 0
      ? {focus, entities, ...rest} : {focus: null, entities, ...rest}; 
}

const interactionRound = interaction => ({hero, entities, round, focus, ...rest}) => {
  const [hMod, npcMod] = interaction(hero, entities[focus], round);
  return {...rest, hero:hMod, round: round + 1, focus, entities:{...entities, [npcMod.uid]:npcMod}};
};

const fightRound = physicalStrike |> interactionRound;
const skillRound = soulSkill |> interactionRound;
const  talkRound = socialTalk |> interactionRound;

