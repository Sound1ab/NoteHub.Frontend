/* tslint:disable */
/* eslint-disable import/first */
import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as React from 'react'
import * as ApolloReactComponents from '@apollo/react-components'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
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
  private?: Maybe<Scalars['Boolean']>
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
  currentRepoName?: Maybe<Scalars['String']>
  currentFileName?: Maybe<Scalars['String']>
  isEdit: Scalars['Boolean']
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

export type QueryReadGithubUserAccessTokenArgs = {
  code: Scalars['String']
  state: Scalars['String']
}

export type Repo = {
  id: Scalars['Int']
  node_id: Scalars['String']
  name: Scalars['String']
  full_name: Scalars['String']
  description?: Maybe<Scalars['String']>
  private: Scalars['Boolean']
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
  'id' | 'node_id' | 'name' | 'full_name' | 'description' | 'private'
>

export type GithubUserFragment = { __typename?: 'GithubUser' } & Pick<
  GithubUser,
  'id' | 'login' | 'avatar_url' | 'html_url' | 'name'
>

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

export type ListReposQueryVariables = {}

export type ListReposQuery = { __typename?: 'Query' } & {
  listRepos: { __typename?: 'ModelRepoConnection' } & {
    items: Array<{ __typename?: 'Repo' } & RepoFragment>
  }
}

export type ReadCurrentRepoNameQueryVariables = {}

export type ReadCurrentRepoNameQuery = { __typename?: 'Query' } & Pick<
  Query,
  'currentRepoName'
>

export type ReadRepoQueryVariables = {
  username: Scalars['String']
  repo: Scalars['String']
}

export type ReadRepoQuery = { __typename?: 'Query' } & {
  readRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
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
  listFiles: { __typename?: 'ModelFileConnection' } & {
    items: Array<{ __typename?: 'File' } & FileFragment>
  }
}

export type ReadCurrentFileNameQueryVariables = {}

export type ReadCurrentFileNameQuery = { __typename?: 'Query' } & Pick<
  Query,
  'currentFileName'
>

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
export const FileFragmentDoc = gql`
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
export const RepoFragmentDoc = gql`
  fragment repo on Repo {
    id
    node_id
    name
    full_name
    description
    private
  }
`
export const GithubUserFragmentDoc = gql`
  fragment githubUser on GithubUser {
    id
    login
    avatar_url
    html_url
    name
  }
`
export const CreateRepoDocument = gql`
  mutation CreateRepo($input: CreateRepoInput!) {
    createRepo(input: $input) {
      ...repo
    }
  }
  ${RepoFragmentDoc}
`
export type CreateRepoMutationFn = ApolloReactCommon.MutationFunction<
  CreateRepoMutation,
  CreateRepoMutationVariables
>
export type CreateRepoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateRepoMutation,
    CreateRepoMutationVariables
  >,
  'mutation'
>

export const CreateRepoComponent = (props: CreateRepoComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateRepoMutation,
    CreateRepoMutationVariables
  >
    mutation={CreateRepoDocument}
    {...props}
  />
)

export type CreateRepoMutationResult = ApolloReactCommon.MutationResult<
  CreateRepoMutation
>
export type CreateRepoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRepoMutation,
  CreateRepoMutationVariables
>
export const DeleteRepoDocument = gql`
  mutation DeleteRepo($input: DeleteRepoInput!) {
    deleteRepo(input: $input) {
      ...repo
    }
  }
  ${RepoFragmentDoc}
`
export type DeleteRepoMutationFn = ApolloReactCommon.MutationFunction<
  DeleteRepoMutation,
  DeleteRepoMutationVariables
>
export type DeleteRepoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteRepoMutation,
    DeleteRepoMutationVariables
  >,
  'mutation'
>

export const DeleteRepoComponent = (props: DeleteRepoComponentProps) => (
  <ApolloReactComponents.Mutation<
    DeleteRepoMutation,
    DeleteRepoMutationVariables
  >
    mutation={DeleteRepoDocument}
    {...props}
  />
)

export type DeleteRepoMutationResult = ApolloReactCommon.MutationResult<
  DeleteRepoMutation
>
export type DeleteRepoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteRepoMutation,
  DeleteRepoMutationVariables
>
export const ListReposDocument = gql`
  query ListRepos {
    listRepos {
      items {
        ...repo
      }
    }
  }
  ${RepoFragmentDoc}
`
export type ListReposComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ListReposQuery,
    ListReposQueryVariables
  >,
  'query'
>

export const ListReposComponent = (props: ListReposComponentProps) => (
  <ApolloReactComponents.Query<ListReposQuery, ListReposQueryVariables>
    query={ListReposDocument}
    {...props}
  />
)

export type ListReposQueryResult = ApolloReactCommon.QueryResult<
  ListReposQuery,
  ListReposQueryVariables
>
export const ReadCurrentRepoNameDocument = gql`
  query ReadCurrentRepoName {
    currentRepoName @client
  }
`
export type ReadCurrentRepoNameComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadCurrentRepoNameQuery,
    ReadCurrentRepoNameQueryVariables
  >,
  'query'
>

export const ReadCurrentRepoNameComponent = (
  props: ReadCurrentRepoNameComponentProps
) => (
  <ApolloReactComponents.Query<
    ReadCurrentRepoNameQuery,
    ReadCurrentRepoNameQueryVariables
  >
    query={ReadCurrentRepoNameDocument}
    {...props}
  />
)

export type ReadCurrentRepoNameQueryResult = ApolloReactCommon.QueryResult<
  ReadCurrentRepoNameQuery,
  ReadCurrentRepoNameQueryVariables
>
export const ReadRepoDocument = gql`
  query ReadRepo($username: String!, $repo: String!) {
    readRepo(username: $username, repo: $repo) {
      ...repo
    }
  }
  ${RepoFragmentDoc}
`
export type ReadRepoComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadRepoQuery,
    ReadRepoQueryVariables
  >,
  'query'
> &
  ({ variables: ReadRepoQueryVariables; skip?: boolean } | { skip: boolean })

export const ReadRepoComponent = (props: ReadRepoComponentProps) => (
  <ApolloReactComponents.Query<ReadRepoQuery, ReadRepoQueryVariables>
    query={ReadRepoDocument}
    {...props}
  />
)

export type ReadRepoQueryResult = ApolloReactCommon.QueryResult<
  ReadRepoQuery,
  ReadRepoQueryVariables
>
export const CreateFileDocument = gql`
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type CreateFileMutationFn = ApolloReactCommon.MutationFunction<
  CreateFileMutation,
  CreateFileMutationVariables
>
export type CreateFileComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateFileMutation,
    CreateFileMutationVariables
  >,
  'mutation'
>

export const CreateFileComponent = (props: CreateFileComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateFileMutation,
    CreateFileMutationVariables
  >
    mutation={CreateFileDocument}
    {...props}
  />
)

export type CreateFileMutationResult = ApolloReactCommon.MutationResult<
  CreateFileMutation
>
export type CreateFileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateFileMutation,
  CreateFileMutationVariables
>
export const DeleteFileDocument = gql`
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type DeleteFileMutationFn = ApolloReactCommon.MutationFunction<
  DeleteFileMutation,
  DeleteFileMutationVariables
>
export type DeleteFileComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteFileMutation,
    DeleteFileMutationVariables
  >,
  'mutation'
>

export const DeleteFileComponent = (props: DeleteFileComponentProps) => (
  <ApolloReactComponents.Mutation<
    DeleteFileMutation,
    DeleteFileMutationVariables
  >
    mutation={DeleteFileDocument}
    {...props}
  />
)

export type DeleteFileMutationResult = ApolloReactCommon.MutationResult<
  DeleteFileMutation
>
export type DeleteFileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteFileMutation,
  DeleteFileMutationVariables
>
export const ListFilesDocument = gql`
  query ListFiles($username: String!, $repo: String!) {
    listFiles(username: $username, repo: $repo) {
      items {
        ...file
      }
    }
  }
  ${FileFragmentDoc}
`
export type ListFilesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ListFilesQuery,
    ListFilesQueryVariables
  >,
  'query'
> &
  ({ variables: ListFilesQueryVariables; skip?: boolean } | { skip: boolean })

export const ListFilesComponent = (props: ListFilesComponentProps) => (
  <ApolloReactComponents.Query<ListFilesQuery, ListFilesQueryVariables>
    query={ListFilesDocument}
    {...props}
  />
)

export type ListFilesQueryResult = ApolloReactCommon.QueryResult<
  ListFilesQuery,
  ListFilesQueryVariables
>
export const ReadCurrentFileNameDocument = gql`
  query ReadCurrentFileName {
    currentFileName @client
  }
`
export type ReadCurrentFileNameComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadCurrentFileNameQuery,
    ReadCurrentFileNameQueryVariables
  >,
  'query'
>

export const ReadCurrentFileNameComponent = (
  props: ReadCurrentFileNameComponentProps
) => (
  <ApolloReactComponents.Query<
    ReadCurrentFileNameQuery,
    ReadCurrentFileNameQueryVariables
  >
    query={ReadCurrentFileNameDocument}
    {...props}
  />
)

export type ReadCurrentFileNameQueryResult = ApolloReactCommon.QueryResult<
  ReadCurrentFileNameQuery,
  ReadCurrentFileNameQueryVariables
>
export const ReadFileDocument = gql`
  query ReadFile($username: String!, $repo: String!, $filename: String!) {
    readFile(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type ReadFileComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadFileQuery,
    ReadFileQueryVariables
  >,
  'query'
> &
  ({ variables: ReadFileQueryVariables; skip?: boolean } | { skip: boolean })

export const ReadFileComponent = (props: ReadFileComponentProps) => (
  <ApolloReactComponents.Query<ReadFileQuery, ReadFileQueryVariables>
    query={ReadFileDocument}
    {...props}
  />
)

export type ReadFileQueryResult = ApolloReactCommon.QueryResult<
  ReadFileQuery,
  ReadFileQueryVariables
>
export const UpdateFileDocument = gql`
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type UpdateFileMutationFn = ApolloReactCommon.MutationFunction<
  UpdateFileMutation,
  UpdateFileMutationVariables
>
export type UpdateFileComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateFileMutation,
    UpdateFileMutationVariables
  >,
  'mutation'
>

export const UpdateFileComponent = (props: UpdateFileComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateFileMutation,
    UpdateFileMutationVariables
  >
    mutation={UpdateFileDocument}
    {...props}
  />
)

export type UpdateFileMutationResult = ApolloReactCommon.MutationResult<
  UpdateFileMutation
>
export type UpdateFileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateFileMutation,
  UpdateFileMutationVariables
>
export const CreateImageDocument = gql`
  mutation CreateImage($input: CreateFileInput!) {
    createImage(input: $input) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type CreateImageMutationFn = ApolloReactCommon.MutationFunction<
  CreateImageMutation,
  CreateImageMutationVariables
>
export type CreateImageComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateImageMutation,
    CreateImageMutationVariables
  >,
  'mutation'
>

export const CreateImageComponent = (props: CreateImageComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateImageMutation,
    CreateImageMutationVariables
  >
    mutation={CreateImageDocument}
    {...props}
  />
)

export type CreateImageMutationResult = ApolloReactCommon.MutationResult<
  CreateImageMutation
>
export type CreateImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateImageMutation,
  CreateImageMutationVariables
>
export const DeleteImageDocument = gql`
  mutation DeleteImage($input: DeleteFileInput!) {
    deleteImage(input: $input) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type DeleteImageMutationFn = ApolloReactCommon.MutationFunction<
  DeleteImageMutation,
  DeleteImageMutationVariables
>
export type DeleteImageComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteImageMutation,
    DeleteImageMutationVariables
  >,
  'mutation'
>

export const DeleteImageComponent = (props: DeleteImageComponentProps) => (
  <ApolloReactComponents.Mutation<
    DeleteImageMutation,
    DeleteImageMutationVariables
  >
    mutation={DeleteImageDocument}
    {...props}
  />
)

export type DeleteImageMutationResult = ApolloReactCommon.MutationResult<
  DeleteImageMutation
>
export type DeleteImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteImageMutation,
  DeleteImageMutationVariables
>
export const ListImagesDocument = gql`
  query ListImages($username: String!, $repo: String!) {
    listImages(username: $username, repo: $repo) {
      items {
        ...file
      }
    }
  }
  ${FileFragmentDoc}
`
export type ListImagesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ListImagesQuery,
    ListImagesQueryVariables
  >,
  'query'
> &
  ({ variables: ListImagesQueryVariables; skip?: boolean } | { skip: boolean })

export const ListImagesComponent = (props: ListImagesComponentProps) => (
  <ApolloReactComponents.Query<ListImagesQuery, ListImagesQueryVariables>
    query={ListImagesDocument}
    {...props}
  />
)

export type ListImagesQueryResult = ApolloReactCommon.QueryResult<
  ListImagesQuery,
  ListImagesQueryVariables
>
export const ReadImageDocument = gql`
  query ReadImage($username: String!, $repo: String!, $filename: String!) {
    readImage(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type ReadImageComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadImageQuery,
    ReadImageQueryVariables
  >,
  'query'
> &
  ({ variables: ReadImageQueryVariables; skip?: boolean } | { skip: boolean })

export const ReadImageComponent = (props: ReadImageComponentProps) => (
  <ApolloReactComponents.Query<ReadImageQuery, ReadImageQueryVariables>
    query={ReadImageDocument}
    {...props}
  />
)

export type ReadImageQueryResult = ApolloReactCommon.QueryResult<
  ReadImageQuery,
  ReadImageQueryVariables
>
export const UpdateImageDocument = gql`
  mutation UpdateImage($input: UpdateFileInput!) {
    updateImage(input: $input) {
      ...file
    }
  }
  ${FileFragmentDoc}
`
export type UpdateImageMutationFn = ApolloReactCommon.MutationFunction<
  UpdateImageMutation,
  UpdateImageMutationVariables
>
export type UpdateImageComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateImageMutation,
    UpdateImageMutationVariables
  >,
  'mutation'
>

export const UpdateImageComponent = (props: UpdateImageComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateImageMutation,
    UpdateImageMutationVariables
  >
    mutation={UpdateImageDocument}
    {...props}
  />
)

export type UpdateImageMutationResult = ApolloReactCommon.MutationResult<
  UpdateImageMutation
>
export type UpdateImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateImageMutation,
  UpdateImageMutationVariables
>
export const ReadGithubUserDocument = gql`
  query ReadGithubUser {
    readGithubUser {
      ...githubUser
    }
  }
  ${GithubUserFragmentDoc}
`
export type ReadGithubUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadGithubUserQuery,
    ReadGithubUserQueryVariables
  >,
  'query'
>

export const ReadGithubUserComponent = (
  props: ReadGithubUserComponentProps
) => (
  <ApolloReactComponents.Query<
    ReadGithubUserQuery,
    ReadGithubUserQueryVariables
  >
    query={ReadGithubUserDocument}
    {...props}
  />
)

export type ReadGithubUserQueryResult = ApolloReactCommon.QueryResult<
  ReadGithubUserQuery,
  ReadGithubUserQueryVariables
>
export const ReadGithubUserAccessTokenDocument = gql`
  query ReadGithubUserAccessToken($code: String!, $state: String!) {
    readGithubUserAccessToken(code: $code, state: $state)
  }
`
export type ReadGithubUserAccessTokenComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ReadGithubUserAccessTokenQuery,
    ReadGithubUserAccessTokenQueryVariables
  >,
  'query'
> &
  (
    | { variables: ReadGithubUserAccessTokenQueryVariables; skip?: boolean }
    | { skip: boolean }
  )

export const ReadGithubUserAccessTokenComponent = (
  props: ReadGithubUserAccessTokenComponentProps
) => (
  <ApolloReactComponents.Query<
    ReadGithubUserAccessTokenQuery,
    ReadGithubUserAccessTokenQueryVariables
  >
    query={ReadGithubUserAccessTokenDocument}
    {...props}
  />
)

export type ReadGithubUserAccessTokenQueryResult = ApolloReactCommon.QueryResult<
  ReadGithubUserAccessTokenQuery,
  ReadGithubUserAccessTokenQueryVariables
>
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
