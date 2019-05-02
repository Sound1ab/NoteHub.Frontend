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

export type CreateFileInput = {
  username: Scalars['String']
  repo: Scalars['String']
  name: Scalars['String']
  markdown?: Maybe<Scalars['String']>
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
  name: Scalars['String']
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
  type: Scalars['String']
  name: Scalars['String']
  path: Scalars['String']
  content?: Maybe<Scalars['String']>
  sha: Scalars['String']
  _links: Links
}

export type GithubUser = {
  id: Scalars['Int']
  login: Scalars['String']
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
  markdown: Scalars['String']
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
  readFile?: Maybe<Repo>
  listFiles?: Maybe<ModelFileConnection>
  readNote?: Maybe<Note>
  listNotes?: Maybe<ModelNoteConnection>
  readNotebook?: Maybe<Notebook>
  listNotebooks?: Maybe<ModelNotebookConnection>
  readRepo?: Maybe<Repo>
  listRepos?: Maybe<ModelRepoConnection>
  readGithubUser?: Maybe<GithubUser>
  readUser?: Maybe<User>
  listUsers?: Maybe<ModelUserConnection>
}

export type QueryReadFileArgs = {
  username: Scalars['String']
  repo: Scalars['String']
  file: Scalars['String']
}

export type QueryListFilesArgs = {
  username: Scalars['ID']
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
  username: Scalars['ID']
}

export type QueryReadGithubUserArgs = {
  username: Scalars['String']
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
  name: Scalars['String']
  markdown?: Maybe<Scalars['String']>
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

import { GraphQLResolveInfo } from 'graphql'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: Query
  String: Scalars['String']
  Repo: Repo
  Int: Scalars['Int']
  ID: Scalars['ID']
  ModelFileConnection: ModelFileConnection
  File: File
  Links: Links
  Note: Note
  Date: Date
  ModelNoteFilterInput: ModelNoteFilterInput
  ModelIDFilterInput: ModelIdFilterInput
  ModelNoteConnection: ModelNoteConnection
  Notebook: Notebook
  ModelNotebookFilterInput: ModelNotebookFilterInput
  ModelNotebookConnection: ModelNotebookConnection
  ModelRepoConnection: ModelRepoConnection
  GithubUser: GithubUser
  User: User
  ModelUserFilterInput: ModelUserFilterInput
  ModelUserConnection: ModelUserConnection
  Mutation: Mutation
  CreateFileInput: CreateFileInput
  UpdateFileInput: UpdateFileInput
  DeleteFileInput: DeleteFileInput
  CreateNoteInput: CreateNoteInput
  UpdateNoteInput: UpdateNoteInput
  DeleteNoteInput: DeleteNoteInput
  CreateNotebookInput: CreateNotebookInput
  UpdateNotebookInput: UpdateNotebookInput
  DeleteNotebookInput: DeleteNotebookInput
  CreateRepoInput: CreateRepoInput
  UpdateRepoInput: UpdateRepoInput
  DeleteRepoInput: DeleteRepoInput
  CreateUserInput: CreateUserInput
  UpdateUserInput: UpdateUserInput
  DeleteUserInput: DeleteUserInput
  Boolean: Scalars['Boolean']
  ModelSortDirection: ModelSortDirection
  ModelStringFilterInput: ModelStringFilterInput
  ModelIntFilterInput: ModelIntFilterInput
  ModelFloatFilterInput: ModelFloatFilterInput
  Float: Scalars['Float']
  ModelBooleanFilterInput: ModelBooleanFilterInput
}

export type DateResolvers<
  Context = any,
  ParentType = ResolversTypes['Date']
> = {
  dayOfWeek?: Resolver<ResolversTypes['String'], ParentType, Context>
  dayOfMonth?: Resolver<ResolversTypes['Int'], ParentType, Context>
  month?: Resolver<ResolversTypes['String'], ParentType, Context>
  dateLongForm?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type FileResolvers<
  Context = any,
  ParentType = ResolversTypes['File']
> = {
  type?: Resolver<ResolversTypes['String'], ParentType, Context>
  name?: Resolver<ResolversTypes['String'], ParentType, Context>
  path?: Resolver<ResolversTypes['String'], ParentType, Context>
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  sha?: Resolver<ResolversTypes['String'], ParentType, Context>
  _links?: Resolver<ResolversTypes['Links'], ParentType, Context>
}

export type GithubUserResolvers<
  Context = any,
  ParentType = ResolversTypes['GithubUser']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, Context>
  login?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type LinksResolvers<
  Context = any,
  ParentType = ResolversTypes['Links']
> = {
  html?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type ModelFileConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['ModelFileConnection']
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['File']>>>,
    ParentType,
    Context
  >
}

export type ModelNotebookConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['ModelNotebookConnection']
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Notebook']>>>,
    ParentType,
    Context
  >
  nextOffset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, Context>
}

export type ModelNoteConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['ModelNoteConnection']
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Note']>>>,
    ParentType,
    Context
  >
  nextOffset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, Context>
}

export type ModelRepoConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['ModelRepoConnection']
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Repo']>>>,
    ParentType,
    Context
  >
}

export type ModelUserConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['ModelUserConnection']
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    Context
  >
  nextOffset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, Context>
}

export type MutationResolvers<
  Context = any,
  ParentType = ResolversTypes['Mutation']
> = {
  createFile?: Resolver<
    Maybe<ResolversTypes['File']>,
    ParentType,
    Context,
    MutationCreateFileArgs
  >
  updateFile?: Resolver<
    Maybe<ResolversTypes['File']>,
    ParentType,
    Context,
    MutationUpdateFileArgs
  >
  deleteFile?: Resolver<
    Maybe<ResolversTypes['File']>,
    ParentType,
    Context,
    MutationDeleteFileArgs
  >
  createNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    Context,
    MutationCreateNoteArgs
  >
  updateNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    Context,
    MutationUpdateNoteArgs
  >
  deleteNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    Context,
    MutationDeleteNoteArgs
  >
  createNotebook?: Resolver<
    Maybe<ResolversTypes['Notebook']>,
    ParentType,
    Context,
    MutationCreateNotebookArgs
  >
  updateNotebook?: Resolver<
    Maybe<ResolversTypes['Notebook']>,
    ParentType,
    Context,
    MutationUpdateNotebookArgs
  >
  deleteNotebook?: Resolver<
    Maybe<ResolversTypes['Notebook']>,
    ParentType,
    Context,
    MutationDeleteNotebookArgs
  >
  createRepo?: Resolver<
    Maybe<ResolversTypes['Repo']>,
    ParentType,
    Context,
    MutationCreateRepoArgs
  >
  updateRepo?: Resolver<
    Maybe<ResolversTypes['Repo']>,
    ParentType,
    Context,
    MutationUpdateRepoArgs
  >
  deleteRepo?: Resolver<
    Maybe<ResolversTypes['Repo']>,
    ParentType,
    Context,
    MutationDeleteRepoArgs
  >
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    Context,
    MutationCreateUserArgs
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    Context,
    MutationUpdateUserArgs
  >
  deleteUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    Context,
    MutationDeleteUserArgs
  >
}

export type NoteResolvers<
  Context = any,
  ParentType = ResolversTypes['Note']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, Context>
  title?: Resolver<ResolversTypes['String'], ParentType, Context>
  markdown?: Resolver<ResolversTypes['String'], ParentType, Context>
  excerpt?: Resolver<ResolversTypes['String'], ParentType, Context>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, Context>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, Context>
}

export type NotebookResolvers<
  Context = any,
  ParentType = ResolversTypes['Notebook']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, Context>
  title?: Resolver<ResolversTypes['String'], ParentType, Context>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, Context>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, Context>
}

export type QueryResolvers<
  Context = any,
  ParentType = ResolversTypes['Query']
> = {
  readFile?: Resolver<
    Maybe<ResolversTypes['Repo']>,
    ParentType,
    Context,
    QueryReadFileArgs
  >
  listFiles?: Resolver<
    Maybe<ResolversTypes['ModelFileConnection']>,
    ParentType,
    Context,
    QueryListFilesArgs
  >
  readNote?: Resolver<
    Maybe<ResolversTypes['Note']>,
    ParentType,
    Context,
    QueryReadNoteArgs
  >
  listNotes?: Resolver<
    Maybe<ResolversTypes['ModelNoteConnection']>,
    ParentType,
    Context,
    QueryListNotesArgs
  >
  readNotebook?: Resolver<
    Maybe<ResolversTypes['Notebook']>,
    ParentType,
    Context,
    QueryReadNotebookArgs
  >
  listNotebooks?: Resolver<
    Maybe<ResolversTypes['ModelNotebookConnection']>,
    ParentType,
    Context,
    QueryListNotebooksArgs
  >
  readRepo?: Resolver<
    Maybe<ResolversTypes['Repo']>,
    ParentType,
    Context,
    QueryReadRepoArgs
  >
  listRepos?: Resolver<
    Maybe<ResolversTypes['ModelRepoConnection']>,
    ParentType,
    Context,
    QueryListReposArgs
  >
  readGithubUser?: Resolver<
    Maybe<ResolversTypes['GithubUser']>,
    ParentType,
    Context,
    QueryReadGithubUserArgs
  >
  readUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    Context,
    QueryReadUserArgs
  >
  listUsers?: Resolver<
    Maybe<ResolversTypes['ModelUserConnection']>,
    ParentType,
    Context,
    QueryListUsersArgs
  >
}

export type RepoResolvers<
  Context = any,
  ParentType = ResolversTypes['Repo']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, Context>
  node_id?: Resolver<ResolversTypes['String'], ParentType, Context>
  name?: Resolver<ResolversTypes['String'], ParentType, Context>
  full_name?: Resolver<ResolversTypes['String'], ParentType, Context>
  description?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type UserResolvers<
  Context = any,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, Context>
  firstName?: Resolver<ResolversTypes['String'], ParentType, Context>
  lastName?: Resolver<ResolversTypes['String'], ParentType, Context>
  email?: Resolver<ResolversTypes['String'], ParentType, Context>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, Context>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, Context>
}

export type Resolvers<Context = any> = {
  Date?: DateResolvers<Context>
  File?: FileResolvers<Context>
  GithubUser?: GithubUserResolvers<Context>
  Links?: LinksResolvers<Context>
  ModelFileConnection?: ModelFileConnectionResolvers<Context>
  ModelNotebookConnection?: ModelNotebookConnectionResolvers<Context>
  ModelNoteConnection?: ModelNoteConnectionResolvers<Context>
  ModelRepoConnection?: ModelRepoConnectionResolvers<Context>
  ModelUserConnection?: ModelUserConnectionResolvers<Context>
  Mutation?: MutationResolvers<Context>
  Note?: NoteResolvers<Context>
  Notebook?: NotebookResolvers<Context>
  Query?: QueryResolvers<Context>
  Repo?: RepoResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = any> = Resolvers<Context>
