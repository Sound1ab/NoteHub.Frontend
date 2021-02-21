/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  activeRetextSettings?: Maybe<Array<Retext_Settings>>;
  isDarkMode: Scalars['Boolean'];
  listRepos?: Maybe<Array<Repo>>;
  login: Scalars['String'];
  logout: Scalars['String'];
  readConfiguration?: Maybe<Configuration>;
  readFile?: Maybe<File>;
  readFiles?: Maybe<Array<File>>;
  readGithubUser?: Maybe<GithubUser>;
  readGithubUserAccessToken: Scalars['String'];
  readImage?: Maybe<File>;
  readRepo?: Maybe<Repo>;
  refresh?: Maybe<Scalars['String']>;
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


export type QueryReadRepoArgs = {
  name: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  path: Scalars['String'];
  type: Node_Type;
  sha: Scalars['String'];
  url: Scalars['String'];
  filename?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export enum Node_Type {
  File = 'FILE',
  Folder = 'FOLDER',
  User = 'USER'
}

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['Int'];
  node_id: Scalars['String'];
  name: Scalars['String'];
  full_name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
  updated_at: Scalars['String'];
};

export type GithubUser = {
  __typename?: 'GithubUser';
  id: Scalars['Int'];
  login: Scalars['String'];
  avatar_url: Scalars['String'];
  html_url: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  configuration?: Maybe<Configuration>;
};

export type Configuration = {
  __typename?: 'Configuration';
  id: Scalars['String'];
  connectedRepos?: Maybe<Array<Scalars['String']>>;
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
  createSignedUrl?: Maybe<Scalars['String']>;
  createRepo?: Maybe<Repo>;
  updateRepo?: Maybe<Repo>;
  deleteRepo?: Maybe<Repo>;
  updateConfiguration?: Maybe<Configuration>;
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


export type MutationDeleteRepoArgs = {
  input: DeleteRepoInput;
};


export type MutationUpdateConfigurationArgs = {
  input: UpdateConfigurationInput;
};

export type CreateFileInput = {
  path: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  retextSettings?: Maybe<Array<Retext_Settings>>;
};

export enum Retext_Settings {
  Spell = 'SPELL',
  Equality = 'EQUALITY',
  IndefiniteArticle = 'INDEFINITE_ARTICLE',
  RepeatedWords = 'REPEATED_WORDS',
  Readability = 'READABILITY'
}

export type UpdateFileInput = {
  path: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  retextSettings?: Maybe<Array<Retext_Settings>>;
};

export type DeleteFileInput = {
  path: Scalars['String'];
};

export type MoveFileInput = {
  path: Scalars['String'];
  newPath: Scalars['String'];
};

export type UpdateRepoInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
};

export type DeleteRepoInput = {
  name: Scalars['String'];
};

export type UpdateConfigurationInput = {
  connectedRepos?: Maybe<Array<Scalars['String']>>;
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


export type TreeFileFragment = (
  { __typename?: 'File' }
  & Pick<File, 'id' | 'path' | 'type' | 'url' | 'sha'>
);

export type FileFragment = (
  { __typename?: 'File' }
  & Pick<File, 'filename' | 'content'>
  & TreeFileFragment
);

export type RepoFragment = (
  { __typename?: 'Repo' }
  & Pick<Repo, 'name' | 'description' | 'private' | 'full_name' | 'updated_at'>
);

export type ConfigurationFragment = (
  { __typename?: 'Configuration' }
  & Pick<Configuration, 'id' | 'connectedRepos'>
);

export type GithubUserFragment = (
  { __typename?: 'GithubUser' }
  & Pick<GithubUser, 'id' | 'login' | 'avatar_url' | 'html_url' | 'name'>
  & { configuration?: Maybe<(
    { __typename?: 'Configuration' }
    & ConfigurationFragment
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

export type ReadConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadConfigurationQuery = (
  { __typename?: 'Query' }
  & { readConfiguration?: Maybe<(
    { __typename?: 'Configuration' }
    & ConfigurationFragment
  )> }
);

export type UpdateConfigurationMutationVariables = Exact<{
  input: UpdateConfigurationInput;
}>;


export type UpdateConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { updateConfiguration?: Maybe<(
    { __typename?: 'Configuration' }
    & ConfigurationFragment
  )> }
);

export type CreateSignedUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSignedUrlMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSignedUrl'>
);

export type CreateRepoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRepoMutation = (
  { __typename?: 'Mutation' }
  & { createRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
);

export type ListReposQueryVariables = Exact<{ [key: string]: never; }>;


export type ListReposQuery = (
  { __typename?: 'Query' }
  & { listRepos?: Maybe<Array<(
    { __typename?: 'Repo' }
    & Pick<Repo, 'id' | 'name' | 'full_name'>
  )>> }
);

export type ReadRepoQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ReadRepoQuery = (
  { __typename?: 'Query' }
  & { readRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
);

export type ReadRepoLazyQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ReadRepoLazyQuery = (
  { __typename?: 'Query' }
  & { readRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
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
    