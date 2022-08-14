import { professionLookup } from '../rpg/profession';

export const resolvers = {
  Query: {
    professions: () => Object.entries(professionLookup)
      .map(([id, prof]) => ({id, ...prof, sum: prof.body + prof.reaction + prof.soul + prof.popular}))
    ,
  }
};