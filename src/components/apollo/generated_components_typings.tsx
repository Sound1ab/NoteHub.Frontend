/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  accentColor?: Maybe<Scalars['String']>;
  currentPath?: Maybe<Scalars['String']>;
  currentRepoName?: Maybe<Scalars['String']>;
  currentTheme?: Maybe<Scalars['String']>;
  cursorPosition: Position;
  jwt?: Maybe<Scalars['String']>;
  login: Scalars['String'];
  logout: Scalars['String'];
  readFile?: Maybe<File>;
  readGithubUser?: Maybe<GithubUser>;
  readGithubUserAccessToken: Scalars['String'];
  readImage?: Maybe<File>;
  readNodes: ModelNodeConnection;
  readRepo?: Maybe<Repo>;
  refresh?: Maybe<Scalars['String']>;
  search: Scalars['String'];
};


export type QueryReadFileArgs = {
  path: Scalars['String'];
};


export type QueryReadGithubUserAccessTokenArgs = {
  code: Scalars['String'];
  state: Scalars['String'];
};


export type QueryReadImageArgs = {
  path: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  path: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  sha: Scalars['String'];
  type: Node_Type;
  url: Scalars['String'];
};

export enum Node_Type {
  File = 'FILE',
  Folder = 'FOLDER'
}

export type ModelNodeConnection = {
  __typename?: 'ModelNodeConnection';
  nodes: Array<GitNode>;
};

export type GitNode = {
  __typename?: 'GitNode';
  path: Scalars['String'];
  type: Node_Type;
  sha: Scalars['String'];
  url: Scalars['String'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['Int'];
  node_id: Scalars['String'];
  name: Scalars['String'];
  full_name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
};

export type GithubUser = {
  __typename?: 'GithubUser';
  id: Scalars['Int'];
  login: Scalars['String'];
  avatar_url: Scalars['String'];
  html_url: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile?: Maybe<File>;
  updateFile?: Maybe<File>;
  deleteFile?: Maybe<File>;
  moveFile?: Maybe<File>;
  createImage?: Maybe<File>;
  updateImage?: Maybe<File>;
  deleteImage?: Maybe<File>;
  createRepo?: Maybe<Repo>;
  updateRepo?: Maybe<Repo>;
  deleteRepo?: Maybe<Repo>;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationUpdateFileArgs = {
  input: UpdateFileInput;
};


export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


export type MutationMoveFileArgs = {
  input: MoveFileInput;
};


export type MutationCreateImageArgs = {
  input: CreateFileInput;
};


export type MutationUpdateImageArgs = {
  input: UpdateFileInput;
};


export type MutationDeleteImageArgs = {
  input: DeleteFileInput;
};


export type MutationUpdateRepoArgs = {
  input: UpdateRepoInput;
};

export type CreateFileInput = {
  path: Scalars['String'];
  content?: Maybe<Scalars['String']>;
};

export type UpdateFileInput = {
  path: Scalars['String'];
  content?: Maybe<Scalars['String']>;
};

export type DeleteFileInput = {
  path: Scalars['String'];
};

export type MoveFileInput = {
  path: Scalars['String'];
  newPath: Scalars['String'];
};

export type UpdateRepoInput = {
  description?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
};

export type Links = {
  __typename?: 'Links';
  html: Scalars['String'];
};

export type ModelFileConnection = {
  __typename?: 'ModelFileConnection';
  items: Array<File>;
};

export type ModelRepoConnection = {
  __typename?: 'ModelRepoConnection';
  items: Array<Repo>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Position = {
  __typename?: 'Position';
  ch: Scalars['Int'];
  line: Scalars['Int'];
};

export type FileFragment = (
  { __typename?: 'File' }
  & Pick<File, 'filename' | 'path' | 'content' | 'excerpt' | 'sha' | 'type' | 'url'>
);

export type RepoFragment = (
  { __typename?: 'Repo' }
  & Pick<Repo, 'name' | 'description' | 'private'>
);

export type GithubUserFragment = (
  { __typename?: 'GithubUser' }
  & Pick<GithubUser, 'id' | 'login' | 'avatar_url' | 'html_url' | 'name'>
);

export type GitNodeFragment = (
  { __typename?: 'GitNode' }
  & Pick<GitNode, 'path' | 'type' | 'sha' | 'url'>
);

export type DeleteRepoMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteRepoMutation = (
  { __typename?: 'Mutation' }
  & { deleteRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
);

export type ReadRepoQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadRepoQuery = (
  { __typename?: 'Query' }
  & { readRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
);

export type UpdateRepoMutationVariables = Exact<{
  input: UpdateRepoInput;
}>;


export type UpdateRepoMutation = (
  { __typename?: 'Mutation' }
  & { updateRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
);

export type LoginQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'login'>
);

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'logout'>
);

export type CreateFileMutationVariables = Exact<{
  input: CreateFileInput;
}>;


export type CreateFileMutation = (
  { __typename?: 'Mutation' }
  & { createFile?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type DeleteFileMutationVariables = Exact<{
  input: DeleteFileInput;
}>;


export type DeleteFileMutation = (
  { __typename?: 'Mutation' }
  & { deleteFile?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type MoveFileMutationVariables = Exact<{
  input: MoveFileInput;
}>;


export type MoveFileMutation = (
  { __typename?: 'Mutation' }
  & { moveFile?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type ReadFileQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type ReadFileQuery = (
  { __typename?: 'Query' }
  & { readFile?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type ReadNodesQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadNodesQuery = (
  { __typename?: 'Query' }
  & { readNodes: (
    { __typename?: 'ModelNodeConnection' }
    & { nodes: Array<(
      { __typename?: 'GitNode' }
      & GitNodeFragment
    )> }
  ) }
);

export type UpdateFileMutationVariables = Exact<{
  input: UpdateFileInput;
}>;


export type UpdateFileMutation = (
  { __typename?: 'Mutation' }
  & { updateFile?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type CreateImageMutationVariables = Exact<{
  input: CreateFileInput;
}>;


export type CreateImageMutation = (
  { __typename?: 'Mutation' }
  & { createImage?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type ReadImageQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type ReadImageQuery = (
  { __typename?: 'Query' }
  & { readImage?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type UpdateImageMutationVariables = Exact<{
  input: UpdateFileInput;
}>;


export type UpdateImageMutation = (
  { __typename?: 'Mutation' }
  & { updateImage?: Maybe<(
    { __typename?: 'File' }
    & FileFragment
  )> }
);

export type ReadAccentColorQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadAccentColorQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'accentColor'>
);

export type ReadCurrentPathQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadCurrentPathQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'currentPath'>
);

export type ReadCurrentRepoNameQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadCurrentRepoNameQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'currentRepoName'>
);

export type ReadCurrentThemeQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadCurrentThemeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'currentTheme'>
);

export type ReadCursorPositionQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadCursorPositionQuery = (
  { __typename?: 'Query' }
  & { cursorPosition: (
    { __typename?: 'Position' }
    & Pick<Position, 'ch' | 'line'>
  ) }
);

export type ReadJwtQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadJwtQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'jwt'>
);

export type ReadSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadSearchQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'search'>
);

export type ReadGithubUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadGithubUserQuery = (
  { __typename?: 'Query' }
  & { readGithubUser?: Maybe<(
    { __typename?: 'GithubUser' }
    & GithubUserFragment
  )> }
);

export type ReadGithubUserAccessTokenQueryVariables = Exact<{
  code: Scalars['String'];
  state: Scalars['String'];
}>;


export type ReadGithubUserAccessTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'readGithubUserAccessToken'>
);

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & Pick<Query, 'refresh'>
);


      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    