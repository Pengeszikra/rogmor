import { useTroll, actionFactory, kebabToCamelCase } from "react-troll";
import { strikeDamage, strikeFirst, strikeOrder } from "../gui/battleSaga";
import profession, { profTypes } from "./profession";
import { dice, improved, rnd, shuffle } from "./rpg";

export const [actionSet, action] = actionFactory(kebabToCamelCase);

export const
  ADD_UNIT = action('add-unit'),
  ADD_RANDOM = action('add-random'),
  REMOVE_UNIT = action('remove-unit'),
  ATTACK = action('attack'),
  RIPOST = action('ripost'),
  SELECT_HERO = action('select-hero'),
  NEXT_ROUND = action('next-round'),
  ADVENTURE = action('adventure')
;

export const initial = {
  units: [],
  hero: null,
  quest: null,
  story: [],
}

export const reducer = (state, {type, payload}) => {

  console.log(type, payload, state)
  switch (type) {
    case ADD_UNIT: return {...state, units: [...state.units, payload]};
    case ADD_RANDOM: {
      const random = {
        ...profession(dice(payload ? payload : 12 |> dice)),
        heroId: 100 |> rnd
      }
      return {...state, units: [...state.units, random]}}
    ;
    case REMOVE_UNIT: return {...state, units: state.units.filter( ({uid}) => uid !== payload.uid)};
    case ATTACK: {
      const [atk, def] = payload || [];
      if (!atk || !def) return state;
      return state;
    };
    case ADVENTURE: {
      if (!state.hero) return state;
      const allEnemys = [...state.units].sort(shuffle) ;
      const enemys =  allEnemys.slice(-4);
      const [mob] = enemys;
      console.log(`--- mob:: ${mob.profession}`)
      return {...state, quest: {hero: state.hero, enemys, mob, actor: null }};
    };
    // case NEXT_ROUND: return nextRoundReducer(state, payload);
    case SELECT_HERO: return {...state, hero:payload};

    default: return state;
  }
}

export const useNoreboReducerTwo = () => useTroll(reducer, initial, actionSet);
