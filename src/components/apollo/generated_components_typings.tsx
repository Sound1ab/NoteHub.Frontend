/* eslint-disable */
export type Maybe<T> = T | null

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
  __typename?: 'File'
  filename: Scalars['String']
  path: Scalars['String']
  content?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  sha: Scalars['String']
  _links: Links
  repo: Scalars['String']
}

export type GithubUser = {
  __typename?: 'GithubUser'
  id: Scalars['Int']
  login: Scalars['String']
  avatar_url: Scalars['String']
  html_url: Scalars['String']
  name: Scalars['String']
}

export type Links = {
  __typename?: 'Links'
  html: Scalars['String']
}

export type ModelFileConnection = {
  __typename?: 'ModelFileConnection'
  items: Array<File>
}

export type ModelRepoConnection = {
  __typename?: 'ModelRepoConnection'
  items: Array<Repo>
}

export type Mutation = {
  __typename?: 'Mutation'
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

export type Position = {
  __typename?: 'Position'
  ch: Scalars['Int']
  line: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
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
  currentTheme?: Maybe<Scalars['String']>
  isEdit: Scalars['Boolean']
  isNewFileOpen: Scalars['Boolean']
  cursorPosition: Position
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
  __typename?: 'Repo'
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
  'filename' | 'path' | 'content' | 'excerpt' | 'sha' | 'repo'
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

export type ReadCurrentFileNameQueryVariables = {}

export type ReadCurrentFileNameQuery = { __typename?: 'Query' } & Pick<
  Query,
  'currentFileName'
>

export type ReadCurrentRepoNameQueryVariables = {}

export type ReadCurrentRepoNameQuery = { __typename?: 'Query' } & Pick<
  Query,
  'currentRepoName'
>

export type ReadCurrentThemeQueryVariables = {}

export type ReadCurrentThemeQuery = { __typename?: 'Query' } & Pick<
  Query,
  'currentTheme'
>

export type ReadCursorPositionQueryVariables = {}

export type ReadCursorPositionQuery = { __typename?: 'Query' } & {
  cursorPosition: { __typename?: 'Position' } & Pick<Position, 'ch' | 'line'>
}

export type ReadIsEditQueryVariables = {}

export type ReadIsEditQuery = { __typename?: 'Query' } & Pick<Query, 'isEdit'>

export type ReadIsNewFileOpenQueryVariables = {}

export type ReadIsNewFileOpenQuery = { __typename?: 'Query' } & Pick<
  Query,
  'isNewFileOpen'
>

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
