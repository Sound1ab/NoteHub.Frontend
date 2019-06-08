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

export type CreateRepoInput = {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type DeleteFileInput = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
}

export type DeleteRepoInput = {
  username: Scalars['String']
  repo: Scalars['String']
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

export type ModelFileConnection = {
  items: Array<File>
}

export type ModelRepoConnection = {
  items: Array<Repo>
}

export type Mutation = {
  createFile?: Maybe<File>
  updateFile?: Maybe<File>
  deleteFile?: Maybe<File>
  createImage?: Maybe<File>
  updateImage?: Maybe<File>
  deleteImage?: Maybe<File>
  createRepo?: Maybe<Repo>
  updateRepo?: Maybe<Repo>
  deleteRepo?: Maybe<Repo>
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

export type MutationCreateImageArgs = {
  input: CreateFileInput
}

export type MutationUpdateImageArgs = {
  input: UpdateFileInput
}

export type MutationDeleteImageArgs = {
  input: DeleteFileInput
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

export type Query = {
  readFile?: Maybe<File>
  listFiles: ModelFileConnection
  readImage?: Maybe<File>
  listImages: ModelFileConnection
  readRepo?: Maybe<Repo>
  listRepos: ModelRepoConnection
  readGithubUserAccessToken: Scalars['String']
  readGithubUser?: Maybe<GithubUser>
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

export type QueryReadImageArgs = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
}

export type QueryListImagesArgs = {
  username: Scalars['String']
  repo: Scalars['String']
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

export type UpdateRepoInput = {
  username: Scalars['String']
  repo: Scalars['String']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
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
  listFiles: { __typename?: 'ModelFileConnection' } & {
    items: Array<{ __typename?: 'File' } & FileFragment>
  }
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

export type CreateImageMutationVariables = {
  input: CreateFileInput
}

export type CreateImageMutation = { __typename?: 'Mutation' } & {
  createImage: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type DeleteImageMutationVariables = {
  input: DeleteFileInput
}

export type DeleteImageMutation = { __typename?: 'Mutation' } & {
  deleteImage: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type ListImagesQueryVariables = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type ListImagesQuery = { __typename?: 'Query' } & {
  listImages: { __typename?: 'ModelFileConnection' } & {
    items: Array<{ __typename?: 'File' } & FileFragment>
  }
}

export type ReadImageQueryVariables = {
  username: Scalars['String']
  repo: Scalars['String']
  filename: Scalars['String']
}

export type ReadImageQuery = { __typename?: 'Query' } & {
  readImage: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type UpdateImageMutationVariables = {
  input: UpdateFileInput
}

export type UpdateImageMutation = { __typename?: 'Mutation' } & {
  updateImage: Maybe<{ __typename?: 'File' } & FileFragment>
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
  listRepos: { __typename?: 'ModelRepoConnection' } & {
    items: Array<{ __typename?: 'Repo' } & RepoFragment>
  }
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
export const CreateImageDocument = gql`
  mutation CreateImage($input: CreateFileInput!) {
    createImage(input: $input) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class CreateImageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateImageMutation, CreateImageMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateImageMutation, CreateImageMutationVariables>
        mutation={CreateImageDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateImageProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateImageMutation, CreateImageMutationVariables>
> &
  TChildProps
export type CreateImageMutationFn = ReactApollo.MutationFn<
  CreateImageMutation,
  CreateImageMutationVariables
>
export function withCreateImage<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateImageMutation,
        CreateImageMutationVariables,
        CreateImageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateImageMutation,
    CreateImageMutationVariables,
    CreateImageProps<TChildProps>
  >(CreateImageDocument, operationOptions)
}
export const DeleteImageDocument = gql`
  mutation DeleteImage($input: DeleteFileInput!) {
    deleteImage(input: $input) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class DeleteImageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteImageMutation, DeleteImageMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteImageMutation, DeleteImageMutationVariables>
        mutation={DeleteImageDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type DeleteImageProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteImageMutation, DeleteImageMutationVariables>
> &
  TChildProps
export type DeleteImageMutationFn = ReactApollo.MutationFn<
  DeleteImageMutation,
  DeleteImageMutationVariables
>
export function withDeleteImage<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteImageMutation,
        DeleteImageMutationVariables,
        DeleteImageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteImageMutation,
    DeleteImageMutationVariables,
    DeleteImageProps<TChildProps>
  >(DeleteImageDocument, operationOptions)
}
export const ListImagesDocument = gql`
  query ListImages($username: String!, $repo: String!) {
    listImages(username: $username, repo: $repo) {
      items {
        ...file
      }
    }
  }
  ${fileFragmentDoc}
`

export class ListImagesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListImagesQuery, ListImagesQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListImagesQuery, ListImagesQueryVariables>
        query={ListImagesDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ListImagesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListImagesQuery, ListImagesQueryVariables>
> &
  TChildProps
export function withListImages<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListImagesQuery,
        ListImagesQueryVariables,
        ListImagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ListImagesQuery,
    ListImagesQueryVariables,
    ListImagesProps<TChildProps>
  >(ListImagesDocument, operationOptions)
}
export const ReadImageDocument = gql`
  query ReadImage($username: String!, $repo: String!, $filename: String!) {
    readImage(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class ReadImageComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReadImageQuery, ReadImageQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReadImageQuery, ReadImageQueryVariables>
        query={ReadImageDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ReadImageProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReadImageQuery, ReadImageQueryVariables>
> &
  TChildProps
export function withReadImage<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReadImageQuery,
        ReadImageQueryVariables,
        ReadImageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReadImageQuery,
    ReadImageQueryVariables,
    ReadImageProps<TChildProps>
  >(ReadImageDocument, operationOptions)
}
export const UpdateImageDocument = gql`
  mutation UpdateImage($input: UpdateFileInput!) {
    updateImage(input: $input) {
      ...file
    }
  }
  ${fileFragmentDoc}
`

export class UpdateImageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateImageMutation, UpdateImageMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateImageMutation, UpdateImageMutationVariables>
        mutation={UpdateImageDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type UpdateImageProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateImageMutation, UpdateImageMutationVariables>
> &
  TChildProps
export type UpdateImageMutationFn = ReactApollo.MutationFn<
  UpdateImageMutation,
  UpdateImageMutationVariables
>
export function withUpdateImage<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateImageMutation,
        UpdateImageMutationVariables,
        UpdateImageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateImageMutation,
    UpdateImageMutationVariables,
    UpdateImageProps<TChildProps>
  >(UpdateImageDocument, operationOptions)
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
