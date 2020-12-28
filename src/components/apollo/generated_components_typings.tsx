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
  fileTree?: Maybe<TreeNode>;
  isDarkMode: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['String'];
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
  Folder = 'FOLDER'
}

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
  name?: Maybe<Scalars['String']>;
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


export type FileNode = {
  __typename?: 'FileNode';
  id: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
  type?: Maybe<Node_Type>;
  isOptimistic?: Maybe<Scalars['Boolean']>;
};

export type FolderNode = {
  __typename?: 'FolderNode';
  id: Scalars['String'];
  name: Scalars['String'];
  toggled?: Maybe<Scalars['Boolean']>;
  path: Scalars['String'];
  type?: Maybe<Node_Type>;
  children?: Maybe<Array<Maybe<TreeNode>>>;
  isOptimistic?: Maybe<Scalars['Boolean']>;
};

export type TreeNode = FileNode | FolderNode;

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
  & Pick<Repo, 'name' | 'description' | 'private'>
);

export type GithubUserFragment = (
  { __typename?: 'GithubUser' }
  & Pick<GithubUser, 'id' | 'login' | 'avatar_url' | 'html_url' | 'name'>
);

type TreeNode_FileNode_Fragment = (
  { __typename?: 'FileNode' }
  & Pick<FileNode, 'id' | 'name' | 'path' | 'type' | 'isOptimistic'>
);

type TreeNode_FolderNode_Fragment = (
  { __typename?: 'FolderNode' }
  & Pick<FolderNode, 'id' | 'name' | 'toggled' | 'path' | 'type' | 'isOptimistic'>
);

export type TreeNodeFragment = TreeNode_FileNode_Fragment | TreeNode_FolderNode_Fragment;

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

export type ReadFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadFilesQuery = (
  { __typename?: 'Query' }
  & { readFiles?: Maybe<Array<(
    { __typename?: 'File' }
    & TreeFileFragment
  )>> }
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

export type CreateSignedUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSignedUrlMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSignedUrl'>
);

export type ReadActiveRetextSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadActiveRetextSettingsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'activeRetextSettings'>
);

export type ReadFileTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadFileTreeQuery = (
  { __typename?: 'Query' }
  & { fileTree?: Maybe<(
    { __typename?: 'FileNode' }
    & Pick<FileNode, 'id' | 'name' | 'path' | 'type' | 'isOptimistic'>
  ) | (
    { __typename?: 'FolderNode' }
    & Pick<FolderNode, 'id' | 'name' | 'toggled' | 'path' | 'type' | 'isOptimistic'>
    & { children?: Maybe<Array<Maybe<(
      { __typename?: 'FileNode' }
      & TreeNode_FileNode_Fragment
    ) | (
      { __typename?: 'FolderNode' }
      & TreeNode_FolderNode_Fragment
    )>>> }
  )> }
);

export type CreateRepoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRepoMutation = (
  { __typename?: 'Mutation' }
  & { createRepo?: Maybe<(
    { __typename?: 'Repo' }
    & RepoFragment
  )> }
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
    "types": [
      {
        "kind": "UNION",
        "name": "TreeNode",
        "possibleTypes": [
          {
            "name": "FileNode"
          },
          {
            "name": "FolderNode"
          }
        ]
      }
    ]
  }
};
      export default result;
    