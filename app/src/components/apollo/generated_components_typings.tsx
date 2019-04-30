/* tslint:disable */

type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CreateNotebookInput = {
  userId: Scalars['ID']
  title: Scalars['String']
}

export type CreateNoteInput = {
  notebookId: Scalars['ID']
  title: Scalars['String']
  markdown: Scalars['String']
  excerpt: Scalars['String']
}

export type CreateUserInput = {
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
}

export type Date = {
  dayOfWeek: Scalars['String']
  dayOfMonth: Scalars['Int']
  month: Scalars['String']
  dateLongForm: Scalars['String']
}

export type DeleteNotebookInput = {
  id?: Maybe<Scalars['ID']>
}

export type DeleteNoteInput = {
  id?: Maybe<Scalars['ID']>
}

export type DeleteUserInput = {
  id?: Maybe<Scalars['ID']>
}

export type ModelBooleanFilterInput = {
  ne?: Maybe<Scalars['Boolean']>
  eq?: Maybe<Scalars['Boolean']>
}

export type ModelFloatFilterInput = {
  ne?: Maybe<Scalars['Float']>
  eq?: Maybe<Scalars['Float']>
  le?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  ge?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  contains?: Maybe<Scalars['Float']>
  notContains?: Maybe<Scalars['Float']>
  between?: Maybe<Array<Maybe<Scalars['Float']>>>
}

export type ModelIdFilterInput = {
  ne?: Maybe<Scalars['ID']>
  eq?: Maybe<Scalars['ID']>
  le?: Maybe<Scalars['ID']>
  lt?: Maybe<Scalars['ID']>
  ge?: Maybe<Scalars['ID']>
  gt?: Maybe<Scalars['ID']>
  contains?: Maybe<Scalars['ID']>
  notContains?: Maybe<Scalars['ID']>
  between?: Maybe<Array<Maybe<Scalars['ID']>>>
  beginsWith?: Maybe<Scalars['ID']>
}

export type ModelIntFilterInput = {
  ne?: Maybe<Scalars['Int']>
  eq?: Maybe<Scalars['Int']>
  le?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  ge?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  contains?: Maybe<Scalars['Int']>
  notContains?: Maybe<Scalars['Int']>
  between?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type ModelNotebookConnection = {
  items?: Maybe<Array<Maybe<Notebook>>>
  nextOffset?: Maybe<Scalars['Int']>
}

export type ModelNotebookFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  userId?: Maybe<ModelStringFilterInput>
}

export type ModelNoteConnection = {
  items?: Maybe<Array<Maybe<Note>>>
  nextToken?: Maybe<Scalars['String']>
}

export type ModelNoteFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  description?: Maybe<ModelStringFilterInput>
  and?: Maybe<Array<Maybe<ModelNoteFilterInput>>>
  or?: Maybe<Array<Maybe<ModelNoteFilterInput>>>
  not?: Maybe<ModelNoteFilterInput>
}

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ModelStringFilterInput = {
  ne?: Maybe<Scalars['String']>
  eq?: Maybe<Scalars['String']>
  le?: Maybe<Scalars['String']>
  lt?: Maybe<Scalars['String']>
  ge?: Maybe<Scalars['String']>
  gt?: Maybe<Scalars['String']>
  contains?: Maybe<Scalars['String']>
  notContains?: Maybe<Scalars['String']>
  between?: Maybe<Array<Maybe<Scalars['String']>>>
  beginsWith?: Maybe<Scalars['String']>
}

export type ModelUserConnection = {
  items?: Maybe<Array<Maybe<User>>>
  nextToken?: Maybe<Scalars['String']>
}

export type ModelUserFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  description?: Maybe<ModelStringFilterInput>
  and?: Maybe<Array<Maybe<ModelUserFilterInput>>>
  or?: Maybe<Array<Maybe<ModelUserFilterInput>>>
  not?: Maybe<ModelUserFilterInput>
}

export type Mutation = {
  createNote?: Maybe<Note>
  updateNote?: Maybe<Note>
  deleteNote?: Maybe<Note>
  createNotebook?: Maybe<Notebook>
  updateNotebook?: Maybe<Notebook>
  deleteNotebook?: Maybe<Notebook>
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  deleteUser?: Maybe<User>
}

export type MutationCreateNoteArgs = {
  input: CreateNoteInput
}

export type MutationUpdateNoteArgs = {
  input: UpdateNoteInput
}

export type MutationDeleteNoteArgs = {
  input: DeleteNoteInput
}

export type MutationCreateNotebookArgs = {
  input: CreateNotebookInput
}

export type MutationUpdateNotebookArgs = {
  input: UpdateNotebookInput
}

export type MutationDeleteNotebookArgs = {
  input: DeleteNotebookInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type Note = {
  id: Scalars['ID']
  notebook: Notebook
  title: Scalars['String']
  markdown: Scalars['String']
  excerpt: Scalars['String']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Notebook = {
  id: Scalars['ID']
  user: User
  title: Scalars['String']
  notes?: Maybe<Array<Maybe<Note>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Query = {
  readNote?: Maybe<Note>
  listNotes?: Maybe<ModelNoteConnection>
  readNotebook?: Maybe<Notebook>
  listNotebooks?: Maybe<ModelNotebookConnection>
  readUser?: Maybe<User>
  listUsers?: Maybe<ModelUserConnection>
}

export type QueryReadNoteArgs = {
  id: Scalars['ID']
}

export type QueryListNotesArgs = {
  filter?: Maybe<ModelNoteFilterInput>
  limit?: Maybe<Scalars['Int']>
  nextToken?: Maybe<Scalars['String']>
}

export type QueryReadNotebookArgs = {
  id: Scalars['ID']
}

export type QueryListNotebooksArgs = {
  filter?: Maybe<ModelNotebookFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryReadUserArgs = {
  id: Scalars['ID']
}

export type QueryListUsersArgs = {
  filter?: Maybe<ModelUserFilterInput>
  limit?: Maybe<Scalars['Int']>
  nextToken?: Maybe<Scalars['String']>
}

export type UpdateNotebookInput = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type UpdateNoteInput = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  markdown?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  id: Scalars['ID']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type User = {
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  notebooks?: Maybe<Array<Maybe<Notebook>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}
export type ReadNoteQueryVariables = {
  id: Scalars['ID']
}

export type ReadNoteQuery = { __typename?: 'Query' } & {
  readNote: Maybe<{ __typename?: 'Note' } & NoteFragment>
}

export type ReadNotebookQueryVariables = {
  id: Scalars['ID']
}

export type ReadNotebookQuery = { __typename?: 'Query' } & {
  readNotebook: Maybe<
    { __typename?: 'Notebook' } & {
      notes: Maybe<Array<Maybe<{ __typename?: 'Note' } & NoteFragment>>>
    } & NotebookFragment
  >
}

export type ListNotebooksQueryVariables = {
  filter?: Maybe<ModelNotebookFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ListNotebooksQuery = { __typename?: 'Query' } & {
  listNotebooks: Maybe<
    { __typename?: 'ModelNotebookConnection' } & {
      items: Maybe<Array<Maybe<{ __typename?: 'Notebook' } & NotebookFragment>>>
    }
  >
}

export type NoteFragment = { __typename?: 'Note' } & Pick<
  Note,
  'id' | 'title' | 'markdown' | 'excerpt' | 'createdAt' | 'updatedAt'
>

export type NotebookFragment = { __typename?: 'Notebook' } & Pick<
  Notebook,
  'id' | 'title' | 'createdAt' | 'updatedAt'
>

export type UserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'createdAt' | 'updatedAt'
>

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
export const noteFragmentDoc = gql`
  fragment note on Note {
    id
    title
    markdown
    excerpt
    createdAt
    updatedAt
  }
`
export const notebookFragmentDoc = gql`
  fragment notebook on Notebook {
    id
    title
    createdAt
    updatedAt
  }
`
export const userFragmentDoc = gql`
  fragment user on User {
    id
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
`
export const ReadNoteDocument = gql`
  query ReadNote($id: ID!) {
    readNote(id: $id) {
      ...note
    }
  }
  ${noteFragmentDoc}
`

export class ReadNoteComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReadNoteQuery, ReadNoteQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReadNoteQuery, ReadNoteQueryVariables>
        query={ReadNoteDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadNoteProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReadNoteQuery, ReadNoteQueryVariables>
> &
  TChildProps
export function withReadNote<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadNoteQuery,
        ReadNoteQueryVariables,
        ReadNoteProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadNoteQuery,
    ReadNoteQueryVariables,
    ReadNoteProps<TChildProps>
  >(ReadNoteDocument, operationOptions)
}
export const ReadNotebookDocument = gql`
  query ReadNotebook($id: ID!) {
    readNotebook(id: $id) {
      ...notebook
      notes {
        ...note
      }
    }
  }
  ${notebookFragmentDoc}
  ${noteFragmentDoc}
`

export class ReadNotebookComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReadNotebookQuery, ReadNotebookQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReadNotebookQuery, ReadNotebookQueryVariables>
        query={ReadNotebookDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadNotebookProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReadNotebookQuery, ReadNotebookQueryVariables>
> &
  TChildProps
export function withReadNotebook<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadNotebookQuery,
        ReadNotebookQueryVariables,
        ReadNotebookProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadNotebookQuery,
    ReadNotebookQueryVariables,
    ReadNotebookProps<TChildProps>
  >(ReadNotebookDocument, operationOptions)
}
export const ListNotebooksDocument = gql`
  query ListNotebooks(
    $filter: ModelNotebookFilterInput
    $limit: Int
    $offset: Int
  ) {
    listNotebooks(filter: $filter, limit: $limit, offset: $offset) {
      items {
        ...notebook
      }
    }
  }
  ${notebookFragmentDoc}
`

export class ListNotebooksComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ListNotebooksQuery, ListNotebooksQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ListNotebooksQuery, ListNotebooksQueryVariables>
        query={ListNotebooksDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ListNotebooksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListNotebooksQuery, ListNotebooksQueryVariables>
> &
  TChildProps
export function withListNotebooks<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListNotebooksQuery,
        ListNotebooksQueryVariables,
        ListNotebooksProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ListNotebooksQuery,
    ListNotebooksQueryVariables,
    ListNotebooksProps<TChildProps>
  >(ListNotebooksDocument, operationOptions)
}
export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}

const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
}

export default result
