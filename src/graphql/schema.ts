import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Profession {
    id: String,
    title: String,
    body: Int,
    reaction: Int,
    soul: Int,
    popular: Int,
    stamina: Int,
    will: Int,
    joyful: Int,
    sum: Int,
  }

  type Query {
    professions: [Profession]!
  }
`