import {
  File,
  GitNode,
  MutationCreateFileArgs,
  MutationDeleteFileArgs,
  MutationUpdateFileArgs,
  Node_Type,
  QueryReadFileArgs,
  QueryReadGithubUserAccessTokenArgs,
} from '../components/apollo/generated_components_typings'
import { ITreeNode } from '../types'

export const folderGitNode: GitNode = {
  type: Node_Type.Folder,
  path: 'MOCK_FOLDER_PATH',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

export const fileGitNodeOne: GitNode = {
  type: Node_Type.File,
  path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

export const fileGitNodeTwo: GitNode = {
  type: Node_Type.File,
  path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

export const folderNode: ITreeNode = {
  type: folderGitNode.type,
  name: 'MOCK_FOLDER',
  toggled: false,
  path: folderGitNode.path,
  children: [],
}

export const fileNodeOne: ITreeNode = {
  type: fileGitNodeOne.type,
  name: 'MOCK_FILE_PATH_1.md',
  toggled: false,
  path: fileGitNodeOne.path,
  children: [],
}

export const fileNodeTwo: ITreeNode = {
  type: fileGitNodeTwo.type,
  name: 'MOCK_FILE_PATH_2.md',
  toggled: false,
  path: fileGitNodeTwo.path,
  children: [],
}

export const files = [
  {
    filename: 'MOCK_FILE_PATH_2.md',
    path: fileGitNodeTwo.path,
    content: 'MOCK_CONTENT_2',
    excerpt: 'MOCK_EXCERPT_2',
    sha: 'MOCK_SHA_2',
    type: Node_Type.File,
    url: 'MOCK_URL',
  },
  {
    filename: 'MOCK_FILE_PATH_1.md',
    path: fileGitNodeOne.path,
    content: 'MOCK_CONTENT_1',
    excerpt: 'MOCK_EXCERPT_1',
    sha: 'MOCK_SHA_1',
    type: Node_Type.File,
    url: 'MOCK_URL',
  },
]

export const user = {
  id: 1,
  login: 'MOCK_LOGIN',
  avatar_url: 'MOCK_AVATAR_URL',
  html_url: 'MOCK_HTML_URL',
  name: 'MOCK_NAME',
}

export const resolvers = {
  Query: () => ({
    readGithubUser: () => user,
    readGithubUserAccessToken: (
      _: any,
      { code, state }: QueryReadGithubUserAccessTokenArgs
    ) => (code && state ? 'MOCK_JWT' : null),
    readFile: (_: any, input: QueryReadFileArgs) =>
      files.find(({ path }) => path === input.path),
    readNodes: () => ({
      nodes: [folderGitNode, fileGitNodeOne, fileGitNodeTwo],
    }),
    logout: () => 'ok',
  }),
  Mutation: () => ({
    deleteFile: (_: any, { input }: MutationDeleteFileArgs): File => ({
      filename: 'MOCK_FILENAME',
      path: input.path,
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      type: Node_Type.File,
      url: 'MOCK_URL',
    }),
    createFile: (_: any, { input }: MutationCreateFileArgs): File => ({
      filename: 'MOCK_FILENAME',
      path: input.path,
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      type: Node_Type.File,
      url: 'MOCK_URL',
    }),
    updateFile: (
      _: any,
      { input }: MutationUpdateFileArgs
    ): {
      path: string
      filename: string
      excerpt: string
      type: string
      sha: string
      content: string
      url: string
    } => {
      const findFile = ({ path }: any) => path === input.path
      const fileIndex = files.findIndex(findFile)
      const file = files.find(findFile)

      if (!file) {
        throw new Error('Mock update mutation resolver: Could not find file')
      }

      files[fileIndex] = {
        ...file,
        content: input.content ?? '',
        filename: 'MOCK_FILENAME',
        type: Node_Type.File,
        url: 'MOCK_URL',
      }
      return files[fileIndex]
    },
  }),
}
