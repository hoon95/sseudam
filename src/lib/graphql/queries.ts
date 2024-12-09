import { gql } from '@apollo/client'

export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      created_at
      title
      content
    }
  }
`

export const GET_ITEM_BY_ID = gql`
  query GetItemById($id: uuid!) {
    items_by_pk(id: $id) {
      id
      created_at
      title
      content
    }
  }
` 