import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Profession {
    id: String,
    title: String,
    body: Int,
    reaction: Int,
    soul: Int,
    presence: Int,
    stamina: Int,
    focus: Int,
    morale: Int,
    sum: Int,
  }

  type Query {
    professions: [Profession]!
  }
`