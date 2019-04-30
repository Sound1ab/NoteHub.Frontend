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

export type DeleteNotebookInput = {
  id?: Maybe<Scalars['ID']>
}

export type DeleteNoteInput = {
  id?: Maybe<Scalars['ID']>
}

export type DeleteUserInput = {
  id?: Maybe<Scalars['ID']>
}

export type ModelBooleanFilterInput = {
  ne?: Maybe<Scalars['Boolean']>
  eq?: Maybe<Scalars['Boolean']>
}

export type ModelFloatFilterInput = {
  ne?: Maybe<Scalars['Float']>
  eq?: Maybe<Scalars['Float']>
  le?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  ge?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  contains?: Maybe<Scalars['Float']>
  notContains?: Maybe<Scalars['Float']>
  between?: Maybe<Array<Maybe<Scalars['Float']>>>
}

export type ModelIdFilterInput = {
  ne?: Maybe<Scalars['ID']>
  eq?: Maybe<Scalars['ID']>
  le?: Maybe<Scalars['ID']>
  lt?: Maybe<Scalars['ID']>
  ge?: Maybe<Scalars['ID']>
  gt?: Maybe<Scalars['ID']>
  contains?: Maybe<Scalars['ID']>
  notContains?: Maybe<Scalars['ID']>
  between?: Maybe<Array<Maybe<Scalars['ID']>>>
  beginsWith?: Maybe<Scalars['ID']>
}

export type ModelIntFilterInput = {
  ne?: Maybe<Scalars['Int']>
  eq?: Maybe<Scalars['Int']>
  le?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  ge?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  contains?: Maybe<Scalars['Int']>
  notContains?: Maybe<Scalars['Int']>
  between?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type ModelNotebookConnection = {
  items?: Maybe<Array<Maybe<Notebook>>>
  nextOffset?: Maybe<Scalars['Int']>
}

export type ModelNotebookFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  userId?: Maybe<ModelStringFilterInput>
}

export type ModelNoteConnection = {
  items?: Maybe<Array<Maybe<Note>>>
  nextToken?: Maybe<Scalars['String']>
}

export type ModelNoteFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  description?: Maybe<ModelStringFilterInput>
  and?: Maybe<Array<Maybe<ModelNoteFilterInput>>>
  or?: Maybe<Array<Maybe<ModelNoteFilterInput>>>
  not?: Maybe<ModelNoteFilterInput>
}

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ModelStringFilterInput = {
  ne?: Maybe<Scalars['String']>
  eq?: Maybe<Scalars['String']>
  le?: Maybe<Scalars['String']>
  lt?: Maybe<Scalars['String']>
  ge?: Maybe<Scalars['String']>
  gt?: Maybe<Scalars['String']>
  contains?: Maybe<Scalars['String']>
  notContains?: Maybe<Scalars['String']>
  between?: Maybe<Array<Maybe<Scalars['String']>>>
  beginsWith?: Maybe<Scalars['String']>
}

export type ModelUserConnection = {
  items?: Maybe<Array<Maybe<User>>>
  nextToken?: Maybe<Scalars['String']>
}

export type ModelUserFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  description?: Maybe<ModelStringFilterInput>
  and?: Maybe<Array<Maybe<ModelUserFilterInput>>>
  or?: Maybe<Array<Maybe<ModelUserFilterInput>>>
  not?: Maybe<ModelUserFilterInput>
}

export type Mutation = {
  createNote?: Maybe<Note>
  updateNote?: Maybe<Note>
  deleteNote?: Maybe<Note>
  createNotebook?: Maybe<Notebook>
  updateNotebook?: Maybe<Notebook>
  deleteNotebook?: Maybe<Notebook>
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  deleteUser?: Maybe<User>
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
  notebook: Notebook
  title: Scalars['String']
  markdown: Scalars['String']
  excerpt: Scalars['String']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Notebook = {
  id: Scalars['ID']
  user: User
  title: Scalars['String']
  notes?: Maybe<Array<Maybe<Note>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Query = {
  readNote?: Maybe<Note>
  listNotes?: Maybe<ModelNoteConnection>
  readNotebook?: Maybe<Notebook>
  listNotebooks?: Maybe<ModelNotebookConnection>
  readUser?: Maybe<User>
  listUsers?: Maybe<ModelUserConnection>
}

export type QueryReadNoteArgs = {
  id: Scalars['ID']
}

export type QueryListNotesArgs = {
  filter?: Maybe<ModelNoteFilterInput>
  limit?: Maybe<Scalars['Int']>
  nextToken?: Maybe<Scalars['String']>
}

export type QueryReadNotebookArgs = {
  id: Scalars['ID']
}

export type QueryListNotebooksArgs = {
  filter?: Maybe<ModelNotebookFilterInput>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryReadUserArgs = {
  id: Scalars['ID']
}

export type QueryListUsersArgs = {
  filter?: Maybe<ModelUserFilterInput>
  limit?: Maybe<Scalars['Int']>
  nextToken?: Maybe<Scalars['String']>
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
  notebooks?: Maybe<Array<Maybe<Notebook>>>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
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
  ID: Scalars['ID']
  Note: Note
  Notebook: Notebook
  User: User
  String: Scalars['String']
  ModelNoteFilterInput: ModelNoteFilterInput
  ModelIDFilterInput: ModelIdFilterInput
  ModelStringFilterInput: ModelStringFilterInput
  Int: Scalars['Int']
  ModelNoteConnection: ModelNoteConnection
  ModelNotebookFilterInput: ModelNotebookFilterInput
  ModelNotebookConnection: ModelNotebookConnection
  ModelUserFilterInput: ModelUserFilterInput
  ModelUserConnection: ModelUserConnection
  Mutation: Mutation
  CreateNoteInput: CreateNoteInput
  UpdateNoteInput: UpdateNoteInput
  DeleteNoteInput: DeleteNoteInput
  CreateNotebookInput: CreateNotebookInput
  UpdateNotebookInput: UpdateNotebookInput
  DeleteNotebookInput: DeleteNotebookInput
  CreateUserInput: CreateUserInput
  UpdateUserInput: UpdateUserInput
  DeleteUserInput: DeleteUserInput
  Boolean: Scalars['Boolean']
  Date: Date
  ModelSortDirection: ModelSortDirection
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
  nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
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
  nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type MutationResolvers<
  Context = any,
  ParentType = ResolversTypes['Mutation']
> = {
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
  notebook?: Resolver<ResolversTypes['Notebook'], ParentType, Context>
  title?: Resolver<ResolversTypes['String'], ParentType, Context>
  markdown?: Resolver<ResolversTypes['String'], ParentType, Context>
  excerpt?: Resolver<ResolversTypes['String'], ParentType, Context>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, Context>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type NotebookResolvers<
  Context = any,
  ParentType = ResolversTypes['Notebook']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, Context>
  user?: Resolver<ResolversTypes['User'], ParentType, Context>
  title?: Resolver<ResolversTypes['String'], ParentType, Context>
  notes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Note']>>>,
    ParentType,
    Context
  >
  createdAt?: Resolver<ResolversTypes['String'], ParentType, Context>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type QueryResolvers<
  Context = any,
  ParentType = ResolversTypes['Query']
> = {
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

export type UserResolvers<
  Context = any,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, Context>
  firstName?: Resolver<ResolversTypes['String'], ParentType, Context>
  lastName?: Resolver<ResolversTypes['String'], ParentType, Context>
  email?: Resolver<ResolversTypes['String'], ParentType, Context>
  notebooks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Notebook']>>>,
    ParentType,
    Context
  >
  createdAt?: Resolver<ResolversTypes['String'], ParentType, Context>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type Resolvers<Context = any> = {
  Date?: DateResolvers<Context>
  ModelNotebookConnection?: ModelNotebookConnectionResolvers<Context>
  ModelNoteConnection?: ModelNoteConnectionResolvers<Context>
  ModelUserConnection?: ModelUserConnectionResolvers<Context>
  Mutation?: MutationResolvers<Context>
  Note?: NoteResolvers<Context>
  Notebook?: NotebookResolvers<Context>
  Query?: QueryResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = any> = Resolvers<Context>
