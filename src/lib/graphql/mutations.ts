import { gql } from '@apollo/client'

export const CREATE_ITEM = gql`
  mutation CreateItem($title: String!, $content: String!) {
    insert_items_one(object: { title: $title, content: $content }) {
      id
      created_at
      title
      content
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: uuid!, $title: String!, $content: String!) {
    update_items_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, content: $content }
    ) {
      id
      title
      content
      updated_at
    }
  }
`

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: uuid!) {
    delete_items_by_pk(id: $id) {
      id
    }
  }
` 