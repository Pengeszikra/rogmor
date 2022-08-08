import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Profession {
    id: String,
    title: String,
    body: Float,
    reaction: Float,
    soul: Float,
    popular: Float,
    stamina: Float,
    will: Float,
    joyful: Float
  }

  type Query {
    professions: [Profession]!
  }
`