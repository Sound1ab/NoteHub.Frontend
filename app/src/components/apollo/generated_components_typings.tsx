/* tslint:disable */
/* eslint-disable import/first */

type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CreateFileInput = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
  content?: Maybe<Scalars['String']>
}

export type CreateNotebookInput = {
  userId: Scalars['ID']
  title: Scalars['String']
}

export type CreateNoteInput = {
  notebookId: Scalars['ID']
  title: Scalars['String']
  content: Scalars['String']
  excerpt: Scalars['String']
}

export type CreateRepoInput = {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
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

export type DeleteFileInput = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
}

export type DeleteNotebookInput = {
  id?: Maybe<Scalars['ID']>
}

export type DeleteNoteInput = {
  id?: Maybe<Scalars['ID']>
}

export type DeleteRepoInput = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type DeleteUserInput = {
  id?: Maybe<Scalars['ID']>
}

export type File = {
  filename: Scalars['String']
  path: Scalars['String']
  content?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  sha: Scalars['String']
  _links: Links
}

export type GithubUser = {
  id: Scalars['Int']
  login: Scalars['String']
  avatar_url: Scalars['String']
  html_url: Scalars['String']
  name: Scalars['String']
}

export type Links = {
  html: Scalars['String']
}

export type ModelBooleanFilterInput = {
  eq?: Maybe<Scalars['Boolean']>
}

export type ModelFileConnection = {
  items?: Maybe<Array<Maybe<File>>>
}

export type ModelFloatFilterInput = {
  eq?: Maybe<Scalars['Float']>
}

export type ModelIdFilterInput = {
  eq?: Maybe<Scalars['ID']>
}

export type ModelIntFilterInput = {
  eq?: Maybe<Scalars['Int']>
}

export type ModelNotebookConnection = {
  items?: Maybe<Array<Maybe<Notebook>>>
  nextOffset?: Maybe<Scalars['Int']>
}

export type ModelNotebookFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  userId?: Maybe<ModelIdFilterInput>
}

export type ModelNoteConnection = {
  items?: Maybe<Array<Maybe<Note>>>
  nextOffset?: Maybe<Scalars['Int']>
}

export type ModelNoteFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  notebookId?: Maybe<ModelIdFilterInput>
}

export type ModelRepoConnection = {
  items?: Maybe<Array<Maybe<Repo>>>
}

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ModelStringFilterInput = {
  eq?: Maybe<Scalars['String']>
}

export type ModelUserConnection = {
  items?: Maybe<Array<Maybe<User>>>
  nextOffset?: Maybe<Scalars['Int']>
}

export type ModelUserFilterInput = {
  id?: Maybe<ModelIdFilterInput>
}

export type Mutation = {
  createFile?: Maybe<File>
  updateFile?: Maybe<File>
  deleteFile?: Maybe<File>
  createNote?: Maybe<Note>
  updateNote?: Maybe<Note>
  deleteNote?: Maybe<Note>
  createNotebook?: Maybe<Notebook>
  updateNotebook?: Maybe<Notebook>
  deleteNotebook?: Maybe<Notebook>
  createRepo?: Maybe<Repo>
  updateRepo?: Maybe<Repo>
  deleteRepo?: Maybe<Repo>
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  deleteUser?: Maybe<User>
}

export type MutationCreateFileArgs = {
  input: CreateFileInput
}

export type MutationUpdateFileArgs = {
  input: UpdateFileInput
}

export type MutationDeleteFileArgs = {
  input: DeleteFileInput
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

export type MutationCreateRepoArgs = {
  input: CreateRepoInput
}

export type MutationUpdateRepoArgs = {
  input: UpdateRepoInput
}

export type MutationDeleteRepoArgs = {
  input: DeleteRepoInput
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
  title: Scalars['String']
  content: Scalars['String']
  excerpt: Scalars['String']
  createdAt: Date
  updatedAt: Date
}

export type Notebook = {
  id: Scalars['ID']
  title: Scalars['String']
  createdAt: Date
  updatedAt: Date
}

export type Query = {
  readFile?: Maybe<File>
  listFiles?: Maybe<ModelFileConnection>
  readNote?: Maybe<Note>
  listNotes?: Maybe<ModelNoteConnection>
  readNotebook?: Maybe<Notebook>
  listNotebooks?: Maybe<ModelNotebookConnection>
  readRepo?: Maybe<Repo>
  listRepos?: Maybe<ModelRepoConnection>
  readGithubUserAccessToken: Scalars['String']
  readGithubUser?: Maybe<GithubUser>
  readUser?: Maybe<User>
  listUsers?: Maybe<ModelUserConnection>
}

export type QueryReadFileArgs = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
}

export type QueryListFilesArgs = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type QueryReadNoteArgs = {
  id: Scalars['ID']
}

export type QueryListNotesArgs = {
  filter?: Maybe<ModelNoteFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryReadNotebookArgs = {
  id: Scalars['ID']
}

export type QueryListNotebooksArgs = {
  filter?: Maybe<ModelNotebookFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryReadRepoArgs = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type QueryListReposArgs = {
  username: Scalars['String']
}

export type QueryReadGithubUserAccessTokenArgs = {
  code: Scalars['String']
  state: Scalars['String']
}

export type QueryReadUserArgs = {
  id: Scalars['ID']
}

export type QueryListUsersArgs = {
  filter?: Maybe<ModelUserFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type Repo = {
  id: Scalars['Int']
  node_id: Scalars['String']
  name: Scalars['String']
  full_name: Scalars['String']
  description: Scalars['String']
}

export type UpdateFileInput = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
  content?: Maybe<Scalars['String']>
}

export type UpdateNotebookInput = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
}

export type UpdateNoteInput = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
}

export type UpdateRepoInput = {
  username: Scalars['String']
  repo: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
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
  createdAt: Date
  updatedAt: Date
}
export type FileFragment = { __typename?: 'File' } & Pick<
  File,
  'filename' | 'path' | 'content' | 'excerpt' | 'sha'
> & { _links: { __typename?: 'Links' } & Pick<Links, 'html'> }

export type RepoFragment = { __typename?: 'Repo' } & Pick<
  Repo,
  'id' | 'node_id' | 'name' | 'full_name'
>

export type GithubUserFragment = { __typename?: 'GithubUser' } & Pick<
  GithubUser,
  'id' | 'login' | 'avatar_url' | 'html_url' | 'name'
>

export type DateFragment = { __typename?: 'Date' } & Pick<
  Date,
  'dateLongForm' | 'dayOfMonth' | 'dayOfWeek' | 'month'
>

export type NoteFragment = { __typename?: 'Note' } & Pick<
  Note,
  'id' | 'title' | 'content' | 'excerpt'
> & {
    createdAt: { __typename?: 'Date' } & DateFragment
    updatedAt: { __typename?: 'Date' } & DateFragment
  }

export type NotebookFragment = { __typename?: 'Notebook' } & Pick<
  Notebook,
  'id' | 'title'
> & {
    createdAt: { __typename?: 'Date' } & DateFragment
    updatedAt: { __typename?: 'Date' } & DateFragment
  }

export type UserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email'
> & {
    createdAt: { __typename?: 'Date' } & DateFragment
    updatedAt: { __typename?: 'Date' } & DateFragment
  }

export type CreateFileMutationVariables = {
  input: CreateFileInput
}

export type CreateFileMutation = { __typename?: 'Mutation' } & {
  createFile: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type DeleteFileMutationVariables = {
  input: DeleteFileInput
}

export type DeleteFileMutation = { __typename?: 'Mutation' } & {
  deleteFile: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type ListFilesQueryVariables = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type ListFilesQuery = { __typename?: 'Query' } & {
  listFiles: Maybe<
    { __typename?: 'ModelFileConnection' } & {
      items: Maybe<Array<Maybe<{ __typename?: 'File' } & FileFragment>>>
    }
  >
}

export type ReadFileQueryVariables = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
}

export type ReadFileQuery = { __typename?: 'Query' } & {
  readFile: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type UpdateFileMutationVariables = {
  input: UpdateFileInput
}

export type UpdateFileMutation = { __typename?: 'Mutation' } & {
  updateFile: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type CreateNoteMutationVariables = {
  input: CreateNoteInput
}

export type CreateNoteMutation = { __typename?: 'Mutation' } & {
  createNote: Maybe<{ __typename?: 'Note' } & NoteFragment>
}

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput
}

export type DeleteNoteMutation = { __typename?: 'Mutation' } & {
  deleteNote: Maybe<{ __typename?: 'Note' } & NoteFragment>
}

export type ListNotesQueryVariables = {
  filter?: Maybe<ModelNoteFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ListNotesQuery = { __typename?: 'Query' } & {
  listNotes: Maybe<
    { __typename?: 'ModelNoteConnection' } & {
      items: Maybe<Array<Maybe<{ __typename?: 'Note' } & NoteFragment>>>
    }
  >
}

export type ReadNoteQueryVariables = {
  id: Scalars['ID']
}

export type ReadNoteQuery = { __typename?: 'Query' } & {
  readNote: Maybe<{ __typename?: 'Note' } & NoteFragment>
}

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput
}

export type UpdateNoteMutation = { __typename?: 'Mutation' } & {
  updateNote: Maybe<{ __typename?: 'Note' } & NoteFragment>
}

export type CreateNotebookMutationVariables = {
  input: CreateNotebookInput
}

export type CreateNotebookMutation = { __typename?: 'Mutation' } & {
  createNotebook: Maybe<{ __typename?: 'Notebook' } & NotebookFragment>
}

export type DeleteNotebookMutationVariables = {
  input: DeleteNotebookInput
}

export type DeleteNotebookMutation = { __typename?: 'Mutation' } & {
  deleteNotebook: Maybe<{ __typename?: 'Notebook' } & NotebookFragment>
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

export type ReadNotebookQueryVariables = {
  id: Scalars['ID']
}

export type ReadNotebookQuery = { __typename?: 'Query' } & {
  readNotebook: Maybe<{ __typename?: 'Notebook' } & NotebookFragment>
}

export type CreateRepoMutationVariables = {
  input: CreateRepoInput
}

export type CreateRepoMutation = { __typename?: 'Mutation' } & {
  createRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
}

export type DeleteRepoMutationVariables = {
  input: DeleteRepoInput
}

export type DeleteRepoMutation = { __typename?: 'Mutation' } & {
  deleteRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
}

export type ListReposQueryVariables = {
  username: Scalars['String']
}

export type ListReposQuery = { __typename?: 'Query' } & {
  listRepos: Maybe<
    { __typename?: 'ModelRepoConnection' } & {
      items: Maybe<Array<Maybe<{ __typename?: 'Repo' } & RepoFragment>>>
    }
  >
}

export type ReadRepoQueryVariables = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type ReadRepoQuery = { __typename?: 'Query' } & {
  readRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
}

export type ReadGithubUserQueryVariables = {}

export type ReadGithubUserQuery = { __typename?: 'Query' } & {
  readGithubUser: Maybe<{ __typename?: 'GithubUser' } & GithubUserFragment>
}

export type ReadGithubUserAccessTokenQueryVariables = {
  code: Scalars['String']
  state: Scalars['String']
}

export type ReadGithubUserAccessTokenQuery = { __typename?: 'Query' } & Pick<
  Query,
  'readGithubUserAccessToken'
>

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
export const fileFragmentDoc = gql`
  fragment file on File {
    filename
    path
    content
    excerpt
    sha
    _links {
      html
    }
  }
`
export const repoFragmentDoc = gql`
  fragment repo on Repo {
    id
    node_id
    name
    full_name
  }
`
export const githubUserFragmentDoc = gql`
  fragment githubUser on GithubUser {
    id
    login
    avatar_url
    html_url
    name
  }
`
export const dateFragmentDoc = gql`
  fragment date on Date {
    dateLongForm
    dayOfMonth
    dayOfWeek
    month
  }
`
export const noteFragmentDoc = gql`
  fragment note on Note {
    id
    title
    content
    excerpt
    createdAt {
      ...date
    }
    updatedAt {
      ...date
    }
  }
  ${dateFragmentDoc}
`
export const notebookFragmentDoc = gql`
  fragment notebook on Notebook {
    id
    title
    createdAt {
      ...date
    }
    updatedAt {
      ...date
    }
  }
  ${dateFragmentDoc}
`
export const userFragmentDoc = gql`
  fragment user on User {
    id
    firstName
    lastName
    email
    createdAt {
      ...date
    }
    updatedAt {
      ...date
    }
  }
  ${dateFragmentDoc}
`
export const CreateFileDocument = gql`
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class CreateFileComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateFileMutation, CreateFileMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateFileMutation, CreateFileMutationVariables>
        mutation={CreateFileDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateFileProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateFileMutation, CreateFileMutationVariables>
> &
  TChildProps
export type CreateFileMutationFn = ReactApollo.MutationFn<
  CreateFileMutation,
  CreateFileMutationVariables
>
export function withCreateFile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateFileMutation,
        CreateFileMutationVariables,
        CreateFileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateFileMutation,
    CreateFileMutationVariables,
    CreateFileProps<TChildProps>
  >(CreateFileDocument, operationOptions)
}
export const DeleteFileDocument = gql`
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class DeleteFileComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteFileMutation, DeleteFileMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteFileMutation, DeleteFileMutationVariables>
        mutation={DeleteFileDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type DeleteFileProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteFileMutation, DeleteFileMutationVariables>
> &
  TChildProps
export type DeleteFileMutationFn = ReactApollo.MutationFn<
  DeleteFileMutation,
  DeleteFileMutationVariables
>
export function withDeleteFile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteFileMutation,
        DeleteFileMutationVariables,
        DeleteFileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteFileMutation,
    DeleteFileMutationVariables,
    DeleteFileProps<TChildProps>
  >(DeleteFileDocument, operationOptions)
}
export const ListFilesDocument = gql`
  query ListFiles($username: String!, $repo: String!) {
    listFiles(username: $username, repo: $repo) {
      items {
        ...file
      }
    }
  }
  ${fileFragmentDoc}
`

export class ListFilesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListFilesQuery, ListFilesQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListFilesQuery, ListFilesQueryVariables>
        query={ListFilesDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ListFilesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListFilesQuery, ListFilesQueryVariables>
> &
  TChildProps
export function withListFiles<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListFilesQuery,
        ListFilesQueryVariables,
        ListFilesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ListFilesQuery,
    ListFilesQueryVariables,
    ListFilesProps<TChildProps>
  >(ListFilesDocument, operationOptions)
}
export const ReadFileDocument = gql`
  query ReadFile($username: String!, $repo: String!, $filename: String!) {
    readFile(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class ReadFileComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReadFileQuery, ReadFileQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReadFileQuery, ReadFileQueryVariables>
        query={ReadFileDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadFileProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReadFileQuery, ReadFileQueryVariables>
> &
  TChildProps
export function withReadFile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadFileQuery,
        ReadFileQueryVariables,
        ReadFileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadFileQuery,
    ReadFileQueryVariables,
    ReadFileProps<TChildProps>
  >(ReadFileDocument, operationOptions)
}
export const UpdateFileDocument = gql`
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class UpdateFileComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateFileMutation, UpdateFileMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateFileMutation, UpdateFileMutationVariables>
        mutation={UpdateFileDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type UpdateFileProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateFileMutation, UpdateFileMutationVariables>
> &
  TChildProps
export type UpdateFileMutationFn = ReactApollo.MutationFn<
  UpdateFileMutation,
  UpdateFileMutationVariables
>
export function withUpdateFile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateFileMutation,
        UpdateFileMutationVariables,
        UpdateFileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateFileMutation,
    UpdateFileMutationVariables,
    UpdateFileProps<TChildProps>
  >(UpdateFileDocument, operationOptions)
}
export const CreateNoteDocument = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      ...note
    }
  }
  ${noteFragmentDoc}
`

export class CreateNoteComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateNoteMutation, CreateNoteMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateNoteMutation, CreateNoteMutationVariables>
        mutation={CreateNoteDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateNoteProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateNoteMutation, CreateNoteMutationVariables>
> &
  TChildProps
export type CreateNoteMutationFn = ReactApollo.MutationFn<
  CreateNoteMutation,
  CreateNoteMutationVariables
>
export function withCreateNote<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateNoteMutation,
        CreateNoteMutationVariables,
        CreateNoteProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateNoteMutation,
    CreateNoteMutationVariables,
    CreateNoteProps<TChildProps>
  >(CreateNoteDocument, operationOptions)
}
export const DeleteNoteDocument = gql`
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      ...note
    }
  }
  ${noteFragmentDoc}
`

export class DeleteNoteComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteNoteMutation, DeleteNoteMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteNoteMutation, DeleteNoteMutationVariables>
        mutation={DeleteNoteDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type DeleteNoteProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteNoteMutation, DeleteNoteMutationVariables>
> &
  TChildProps
export type DeleteNoteMutationFn = ReactApollo.MutationFn<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>
export function withDeleteNote<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteNoteMutation,
        DeleteNoteMutationVariables,
        DeleteNoteProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteNoteMutation,
    DeleteNoteMutationVariables,
    DeleteNoteProps<TChildProps>
  >(DeleteNoteDocument, operationOptions)
}
export const ListNotesDocument = gql`
  query ListNotes($filter: ModelNoteFilterInput, $limit: Int, $offset: Int) {
    listNotes(filter: $filter, limit: $limit, offset: $offset) {
      items {
        ...note
      }
    }
  }
  ${noteFragmentDoc}
`

export class ListNotesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListNotesQuery, ListNotesQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListNotesQuery, ListNotesQueryVariables>
        query={ListNotesDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ListNotesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListNotesQuery, ListNotesQueryVariables>
> &
  TChildProps
export function withListNotes<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListNotesQuery,
        ListNotesQueryVariables,
        ListNotesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ListNotesQuery,
    ListNotesQueryVariables,
    ListNotesProps<TChildProps>
  >(ListNotesDocument, operationOptions)
}
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
export const UpdateNoteDocument = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      ...note
    }
  }
  ${noteFragmentDoc}
`

export class UpdateNoteComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateNoteMutation, UpdateNoteMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateNoteMutation, UpdateNoteMutationVariables>
        mutation={UpdateNoteDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type UpdateNoteProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateNoteMutation, UpdateNoteMutationVariables>
> &
  TChildProps
export type UpdateNoteMutationFn = ReactApollo.MutationFn<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>
export function withUpdateNote<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateNoteMutation,
        UpdateNoteMutationVariables,
        UpdateNoteProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateNoteMutation,
    UpdateNoteMutationVariables,
    UpdateNoteProps<TChildProps>
  >(UpdateNoteDocument, operationOptions)
}
export const CreateNotebookDocument = gql`
  mutation CreateNotebook($input: CreateNotebookInput!) {
    createNotebook(input: $input) {
      ...notebook
    }
  }
  ${notebookFragmentDoc}
`

export class CreateNotebookComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateNotebookMutation,
      CreateNotebookMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateNotebookMutation,
        CreateNotebookMutationVariables
      >
        mutation={CreateNotebookDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateNotebookProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateNotebookMutation,
    CreateNotebookMutationVariables
  >
> &
  TChildProps
export type CreateNotebookMutationFn = ReactApollo.MutationFn<
  CreateNotebookMutation,
  CreateNotebookMutationVariables
>
export function withCreateNotebook<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateNotebookMutation,
        CreateNotebookMutationVariables,
        CreateNotebookProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateNotebookMutation,
    CreateNotebookMutationVariables,
    CreateNotebookProps<TChildProps>
  >(CreateNotebookDocument, operationOptions)
}
export const DeleteNotebookDocument = gql`
  mutation DeleteNotebook($input: DeleteNotebookInput!) {
    deleteNotebook(input: $input) {
      ...notebook
    }
  }
  ${notebookFragmentDoc}
`

export class DeleteNotebookComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeleteNotebookMutation,
      DeleteNotebookMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeleteNotebookMutation,
        DeleteNotebookMutationVariables
      >
        mutation={DeleteNotebookDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type DeleteNotebookProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    DeleteNotebookMutation,
    DeleteNotebookMutationVariables
  >
> &
  TChildProps
export type DeleteNotebookMutationFn = ReactApollo.MutationFn<
  DeleteNotebookMutation,
  DeleteNotebookMutationVariables
>
export function withDeleteNotebook<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteNotebookMutation,
        DeleteNotebookMutationVariables,
        DeleteNotebookProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteNotebookMutation,
    DeleteNotebookMutationVariables,
    DeleteNotebookProps<TChildProps>
  >(DeleteNotebookDocument, operationOptions)
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
export const ReadNotebookDocument = gql`
  query ReadNotebook($id: ID!) {
    readNotebook(id: $id) {
      ...notebook
    }
  }
  ${notebookFragmentDoc}
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
export const CreateRepoDocument = gql`
  mutation CreateRepo($input: CreateRepoInput!) {
    createRepo(input: $input) {
      ...repo
    }
  }
  ${repoFragmentDoc}
`

export class CreateRepoComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateRepoMutation, CreateRepoMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateRepoMutation, CreateRepoMutationVariables>
        mutation={CreateRepoDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateRepoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateRepoMutation, CreateRepoMutationVariables>
> &
  TChildProps
export type CreateRepoMutationFn = ReactApollo.MutationFn<
  CreateRepoMutation,
  CreateRepoMutationVariables
>
export function withCreateRepo<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateRepoMutation,
        CreateRepoMutationVariables,
        CreateRepoProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateRepoMutation,
    CreateRepoMutationVariables,
    CreateRepoProps<TChildProps>
  >(CreateRepoDocument, operationOptions)
}
export const DeleteRepoDocument = gql`
  mutation DeleteRepo($input: DeleteRepoInput!) {
    deleteRepo(input: $input) {
      ...repo
    }
  }
  ${repoFragmentDoc}
`

export class DeleteRepoComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteRepoMutation, DeleteRepoMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteRepoMutation, DeleteRepoMutationVariables>
        mutation={DeleteRepoDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type DeleteRepoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteRepoMutation, DeleteRepoMutationVariables>
> &
  TChildProps
export type DeleteRepoMutationFn = ReactApollo.MutationFn<
  DeleteRepoMutation,
  DeleteRepoMutationVariables
>
export function withDeleteRepo<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteRepoMutation,
        DeleteRepoMutationVariables,
        DeleteRepoProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteRepoMutation,
    DeleteRepoMutationVariables,
    DeleteRepoProps<TChildProps>
  >(DeleteRepoDocument, operationOptions)
}
export const ListReposDocument = gql`
  query ListRepos($username: String!) {
    listRepos(username: $username) {
      items {
        ...repo
      }
    }
  }
  ${repoFragmentDoc}
`

export class ListReposComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListReposQuery, ListReposQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListReposQuery, ListReposQueryVariables>
        query={ListReposDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ListReposProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListReposQuery, ListReposQueryVariables>
> &
  TChildProps
export function withListRepos<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListReposQuery,
        ListReposQueryVariables,
        ListReposProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ListReposQuery,
    ListReposQueryVariables,
    ListReposProps<TChildProps>
  >(ListReposDocument, operationOptions)
}
export const ReadRepoDocument = gql`
  query ReadRepo($username: String!, $repo: String!) {
    readRepo(username: $username, repo: $repo) {
      ...repo
    }
  }
  ${repoFragmentDoc}
`

export class ReadRepoComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReadRepoQuery, ReadRepoQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReadRepoQuery, ReadRepoQueryVariables>
        query={ReadRepoDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadRepoProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReadRepoQuery, ReadRepoQueryVariables>
> &
  TChildProps
export function withReadRepo<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadRepoQuery,
        ReadRepoQueryVariables,
        ReadRepoProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadRepoQuery,
    ReadRepoQueryVariables,
    ReadRepoProps<TChildProps>
  >(ReadRepoDocument, operationOptions)
}
export const ReadGithubUserDocument = gql`
  query ReadGithubUser {
    readGithubUser {
      ...githubUser
    }
  }
  ${githubUserFragmentDoc}
`

export class ReadGithubUserComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ReadGithubUserQuery, ReadGithubUserQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ReadGithubUserQuery, ReadGithubUserQueryVariables>
        query={ReadGithubUserDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadGithubUserProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReadGithubUserQuery, ReadGithubUserQueryVariables>
> &
  TChildProps
export function withReadGithubUser<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadGithubUserQuery,
        ReadGithubUserQueryVariables,
        ReadGithubUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadGithubUserQuery,
    ReadGithubUserQueryVariables,
    ReadGithubUserProps<TChildProps>
  >(ReadGithubUserDocument, operationOptions)
}
export const ReadGithubUserAccessTokenDocument = gql`
  query ReadGithubUserAccessToken($code: String!, $state: String!) {
    readGithubUserAccessToken(code: $code, state: $state)
  }
`

export class ReadGithubUserAccessTokenComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      ReadGithubUserAccessTokenQuery,
      ReadGithubUserAccessTokenQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        ReadGithubUserAccessTokenQuery,
        ReadGithubUserAccessTokenQueryVariables
      >
        query={ReadGithubUserAccessTokenDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadGithubUserAccessTokenProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    ReadGithubUserAccessTokenQuery,
    ReadGithubUserAccessTokenQueryVariables
  >
> &
  TChildProps
export function withReadGithubUserAccessToken<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadGithubUserAccessTokenQuery,
        ReadGithubUserAccessTokenQueryVariables,
        ReadGithubUserAccessTokenProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadGithubUserAccessTokenQuery,
    ReadGithubUserAccessTokenQueryVariables,
    ReadGithubUserAccessTokenProps<TChildProps>
  >(ReadGithubUserAccessTokenDocument, operationOptions)
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
