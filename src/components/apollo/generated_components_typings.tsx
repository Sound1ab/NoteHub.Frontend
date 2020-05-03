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
  path: Scalars['String']
  content?: Maybe<Scalars['String']>
}

export type DeleteFileInput = {
  path: Scalars['String']
}

export type File = {
  __typename?: 'File'
  filename: Scalars['String']
  path: Scalars['String']
  content?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  sha: Scalars['String']
  type: Node_Type
  url: Scalars['String']
}

export type GithubUser = {
  __typename?: 'GithubUser'
  id: Scalars['Int']
  login: Scalars['String']
  avatar_url: Scalars['String']
  html_url: Scalars['String']
  name: Scalars['String']
}

export type GitNode = {
  __typename?: 'GitNode'
  path: Scalars['String']
  type: Node_Type
  sha: Scalars['String']
  url: Scalars['String']
}

export type Links = {
  __typename?: 'Links'
  html: Scalars['String']
}

export type ModelFileConnection = {
  __typename?: 'ModelFileConnection'
  items: Array<File>
}

export type ModelNodeConnection = {
  __typename?: 'ModelNodeConnection'
  nodes: Array<GitNode>
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

export type MutationUpdateRepoArgs = {
  input: UpdateRepoInput
}

export enum Node_Type {
  File = 'FILE',
  Folder = 'FOLDER',
}

export type Position = {
  __typename?: 'Position'
  ch: Scalars['Int']
  line: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  readFile?: Maybe<File>
  readNodes: ModelNodeConnection
  readImage?: Maybe<File>
  listImages: ModelFileConnection
  readRepo?: Maybe<Repo>
  readGithubUserAccessToken: Scalars['String']
  readGithubUser?: Maybe<GithubUser>
  login: Scalars['String']
  logout: Scalars['String']
  refresh?: Maybe<Scalars['String']>
  currentRepoName?: Maybe<Scalars['String']>
  currentFileName?: Maybe<Scalars['String']>
  currentPath?: Maybe<Scalars['String']>
  currentTheme?: Maybe<Scalars['String']>
  isEdit: Scalars['Boolean']
  isNewFileOpen: Scalars['Boolean']
  isNewRepoOpen: Scalars['Boolean']
  cursorPosition: Position
  jwt?: Maybe<Scalars['String']>
}

export type QueryReadFileArgs = {
  path: Scalars['String']
}

export type QueryReadImageArgs = {
  path: Scalars['String']
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
  path: Scalars['String']
  content?: Maybe<Scalars['String']>
}

export type UpdateRepoInput = {
  description?: Maybe<Scalars['String']>
  private?: Maybe<Scalars['Boolean']>
}

export type FileFragment = { __typename?: 'File' } & Pick<
  File,
  'filename' | 'path' | 'content' | 'excerpt' | 'sha' | 'type' | 'url'
>

export type RepoFragment = { __typename?: 'Repo' } & Pick<
  Repo,
  'name' | 'description' | 'private'
>

export type GithubUserFragment = { __typename?: 'GithubUser' } & Pick<
  GithubUser,
  'id' | 'login' | 'avatar_url' | 'html_url' | 'name'
>

export type GitNodeFragment = { __typename?: 'GitNode' } & Pick<
  GitNode,
  'path' | 'type' | 'sha' | 'url'
>

export type DeleteRepoMutationVariables = {}

export type DeleteRepoMutation = { __typename?: 'Mutation' } & {
  deleteRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
}

export type ReadRepoQueryVariables = {}

export type ReadRepoQuery = { __typename?: 'Query' } & {
  readRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
}

export type UpdateRepoMutationVariables = {
  input: UpdateRepoInput
}

export type UpdateRepoMutation = { __typename?: 'Mutation' } & {
  updateRepo: Maybe<{ __typename?: 'Repo' } & RepoFragment>
}

export type LoginQueryVariables = {}

export type LoginQuery = { __typename?: 'Query' } & Pick<Query, 'login'>

export type LogoutQueryVariables = {}

export type LogoutQuery = { __typename?: 'Query' } & Pick<Query, 'logout'>

export type RefreshQueryVariables = {}

export type RefreshQuery = { __typename?: 'Query' } & Pick<Query, 'refresh'>

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

export type ReadFileQueryVariables = {
  path: Scalars['String']
}

export type ReadFileQuery = { __typename?: 'Query' } & {
  readFile: Maybe<{ __typename?: 'File' } & FileFragment>
}

export type ReadNodesQueryVariables = {}

export type ReadNodesQuery = { __typename?: 'Query' } & {
  readNodes: { __typename?: 'ModelNodeConnection' } & {
    nodes: Array<{ __typename?: 'GitNode' } & GitNodeFragment>
  }
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

export type ListImagesQueryVariables = {}

export type ListImagesQuery = { __typename?: 'Query' } & {
  listImages: { __typename?: 'ModelFileConnection' } & {
    items: Array<{ __typename?: 'File' } & FileFragment>
  }
}

export type ReadImageQueryVariables = {
  path: Scalars['String']
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

export type ReadCurrentPathQueryVariables = {}

export type ReadCurrentPathQuery = { __typename?: 'Query' } & Pick<
  Query,
  'currentPath'
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

export type ReadIsNewRepoOpenQueryVariables = {}

export type ReadIsNewRepoOpenQuery = { __typename?: 'Query' } & Pick<
  Query,
  'isNewRepoOpen'
>

export type ReadJwtQueryVariables = {}

export type ReadJwtQuery = { __typename?: 'Query' } & Pick<Query, 'jwt'>

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

export type Unnamed_1_QueryVariables = {}

export type Unnamed_1_Query = { __typename?: 'Query' } & Pick<Query, 'refresh'>

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
