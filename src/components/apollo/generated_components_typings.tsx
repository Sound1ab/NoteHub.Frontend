/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Configuration = {
  __typename?: 'Configuration';
  connectedRepos?: Maybe<Array<Scalars['String']>>;
  id: Scalars['String'];
};

export type CreateFileInput = {
  content?: InputMaybe<Scalars['String']>;
  path: Scalars['String'];
  retextSettings?: InputMaybe<Array<Retext_Settings>>;
};

export type DeleteFileInput = {
  path: Scalars['String'];
};

export type DeleteRepoInput = {
  name: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  content?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  path: Scalars['String'];
  sha: Scalars['String'];
  type: Node_Type;
  url: Scalars['String'];
};

export type GithubUser = {
  __typename?: 'GithubUser';
  avatar_url: Scalars['String'];
  configuration?: Maybe<Configuration>;
  html_url: Scalars['String'];
  id: Scalars['Int'];
  login: Scalars['String'];
  name?: Maybe<Scalars['String']>;
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

export type MoveFileInput = {
  newPath: Scalars['String'];
  path: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile?: Maybe<File>;
  createImage?: Maybe<File>;
  createRepo?: Maybe<Repo>;
  createSignedUrl?: Maybe<Scalars['String']>;
  deleteFile?: Maybe<File>;
  deleteImage?: Maybe<File>;
  deleteRepo?: Maybe<Repo>;
  moveFile?: Maybe<File>;
  updateConfiguration?: Maybe<Configuration>;
  updateFile?: Maybe<File>;
  updateImage?: Maybe<File>;
  updateRepo?: Maybe<Repo>;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateImageArgs = {
  input: CreateFileInput;
};


export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


export type MutationDeleteImageArgs = {
  input: DeleteFileInput;
};


export type MutationDeleteRepoArgs = {
  input: DeleteRepoInput;
};


export type MutationMoveFileArgs = {
  input: MoveFileInput;
};


export type MutationUpdateConfigurationArgs = {
  input: UpdateConfigurationInput;
};


export type MutationUpdateFileArgs = {
  input: UpdateFileInput;
};


export type MutationUpdateImageArgs = {
  input: UpdateFileInput;
};


export type MutationUpdateRepoArgs = {
  input: UpdateRepoInput;
};

export enum Node_Type {
  File = 'FILE',
  Folder = 'FOLDER',
  User = 'USER'
}

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

export type Repo = {
  __typename?: 'Repo';
  description?: Maybe<Scalars['String']>;
  full_name: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  node_id: Scalars['String'];
  private: Scalars['Boolean'];
  updated_at: Scalars['String'];
};

export enum Retext_Settings {
  Equality = 'EQUALITY',
  IndefiniteArticle = 'INDEFINITE_ARTICLE',
  Readability = 'READABILITY',
  RepeatedWords = 'REPEATED_WORDS',
  Spell = 'SPELL'
}

export type UpdateConfigurationInput = {
  connectedRepos?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateFileInput = {
  content?: InputMaybe<Scalars['String']>;
  path: Scalars['String'];
  retextSettings?: InputMaybe<Array<Retext_Settings>>;
};

export type UpdateRepoInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  private?: InputMaybe<Scalars['Boolean']>;
};

export type TreeFileFragment = { __typename?: 'File', id: string, path: string, type: Node_Type, url: string, sha: string };

export type FileFragment = { __typename?: 'File', filename?: string | null | undefined, content?: string | null | undefined, id: string, path: string, type: Node_Type, url: string, sha: string };

export type RepoFragment = { __typename?: 'Repo', name: string, description?: string | null | undefined, private: boolean, full_name: string, updated_at: string };

export type ConfigurationFragment = { __typename?: 'Configuration', id: string, connectedRepos?: Array<string> | null | undefined };

export type GithubUserFragment = { __typename?: 'GithubUser', id: number, login: string, avatar_url: string, html_url: string, name?: string | null | undefined, configuration?: { __typename?: 'Configuration', id: string, connectedRepos?: Array<string> | null | undefined } | null | undefined };

export type LoginQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginQuery = { __typename?: 'Query', login: string };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: string };

export type RefreshQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshQuery = { __typename?: 'Query', refresh?: string | null | undefined };

export type ReadConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadConfigurationQuery = { __typename?: 'Query', readConfiguration?: { __typename?: 'Configuration', id: string, connectedRepos?: Array<string> | null | undefined } | null | undefined };

export type UpdateConfigurationMutationVariables = Exact<{
  input: UpdateConfigurationInput;
}>;


export type UpdateConfigurationMutation = { __typename?: 'Mutation', updateConfiguration?: { __typename?: 'Configuration', id: string, connectedRepos?: Array<string> | null | undefined } | null | undefined };

export type CreateSignedUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSignedUrlMutation = { __typename?: 'Mutation', createSignedUrl?: string | null | undefined };

export type CreateRepoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRepoMutation = { __typename?: 'Mutation', createRepo?: { __typename?: 'Repo', name: string, description?: string | null | undefined, private: boolean, full_name: string, updated_at: string } | null | undefined };

export type ListReposQueryVariables = Exact<{ [key: string]: never; }>;


export type ListReposQuery = { __typename?: 'Query', listRepos?: Array<{ __typename?: 'Repo', id: number, name: string, full_name: string }> | null | undefined };

export type ReadRepoQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ReadRepoQuery = { __typename?: 'Query', readRepo?: { __typename?: 'Repo', name: string, description?: string | null | undefined, private: boolean, full_name: string, updated_at: string } | null | undefined };

export type ReadGithubUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadGithubUserQuery = { __typename?: 'Query', readGithubUser?: { __typename?: 'GithubUser', id: number, login: string, avatar_url: string, html_url: string, name?: string | null | undefined, configuration?: { __typename?: 'Configuration', id: string, connectedRepos?: Array<string> | null | undefined } | null | undefined } | null | undefined };

export type ReadGithubUserAccessTokenQueryVariables = Exact<{
  code: Scalars['String'];
  state: Scalars['String'];
}>;


export type ReadGithubUserAccessTokenQuery = { __typename?: 'Query', readGithubUserAccessToken: string };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    