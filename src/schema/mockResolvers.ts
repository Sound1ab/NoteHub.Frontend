import {
  File,
  GitNode,
  MutationCreateFileArgs,
  MutationDeleteFileArgs,
  MutationMoveFileArgs,
  MutationUpdateFileArgs,
  Node_Type,
  QueryReadFileArgs,
  QueryReadGithubUserAccessTokenArgs,
} from '../components/apollo'
import { ITreeNode } from '../types'
import { extractFilename } from '../utils'

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

export const fileGitNodeThree: GitNode = {
  type: Node_Type.File,
  path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_3.md',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

export const fileGitNodeFour: GitNode = {
  type: Node_Type.File,
  path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

export const folderNode: ITreeNode = {
  type: folderGitNode.type,
  name: 'MOCK_FOLDER',
  toggled: false,
  path: folderGitNode.path,
  children: [],
  isOptimistic: false,
}

export const fileNodeOne: ITreeNode = {
  type: fileGitNodeOne.type,
  name: 'MOCK_FILE_PATH_1.md',
  toggled: false,
  path: fileGitNodeOne.path,
  children: [],
  isOptimistic: false,
}

export const fileNodeTwo: ITreeNode = {
  type: fileGitNodeTwo.type,
  name: 'MOCK_FILE_PATH_2.md',
  toggled: false,
  path: fileGitNodeTwo.path,
  children: [],
  isOptimistic: false,
}

export const files: File[] = [
  {
    filename: 'MOCK_FILE_PATH_4.md',
    path: fileGitNodeFour.path,
    content: 'heelo',
    excerpt: 'MOCK_EXCERPT_2',
    sha: 'MOCK_SHA_2',
    type: Node_Type.File,
    url: 'MOCK_URL',
    messages: {
      nodes: [
        {
          message: '`heelo` is misspelt',
          location: {
            start: {
              offset: 0,
            },
            end: {
              offset: 5,
            },
          },
          actual: 16,
        },
      ],
    },
  },
  {
    filename: 'MOCK_FILE_PATH_2.md',
    path: fileGitNodeTwo.path,
    content: 'MOCK_CONTENT_2',
    excerpt: 'MOCK_EXCERPT_2',
    sha: 'MOCK_SHA_2',
    type: Node_Type.File,
    url: 'MOCK_URL',
    readAt: new Date().toString(),
  },
  {
    filename: 'MOCK_FILE_PATH_1.md',
    path: fileGitNodeOne.path,
    content: 'MOCK_CONTENT_1',
    excerpt: 'MOCK_EXCERPT_1',
    sha: 'MOCK_SHA_1',
    type: Node_Type.File,
    url: 'MOCK_URL',
    readAt: new Date().toString(),
  },
  {
    filename: 'MOCK_FILE_PATH_3.md',
    path: fileGitNodeThree.path,
    content: '# MOCK_CONTENT_3',
    excerpt: 'MOCK_EXCERPT_3',
    sha: 'MOCK_SHA_3',
    type: Node_Type.File,
    url: 'MOCK_URL',
    readAt: new Date().toString(),
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
      _: unknown,
      { code, state }: QueryReadGithubUserAccessTokenArgs
    ) => (code && state ? 'MOCK_JWT' : null),
    readFile: (_: unknown, input: QueryReadFileArgs) =>
      files.find(({ path }) => path === input.path),
    readNodes: () => ({
      nodes: [folderGitNode, fileGitNodeOne, fileGitNodeTwo],
    }),
    logout: () => 'ok',
  }),
  Mutation: () => ({
    deleteFile: (_: unknown, { input }: MutationDeleteFileArgs): File => ({
      filename: 'MOCK_FILENAME',
      path: input.path,
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      type: Node_Type.File,
      url: 'MOCK_URL',
    }),
    createFile: (_: unknown, { input }: MutationCreateFileArgs): File => ({
      filename: 'MOCK_FILENAME',
      path: input.path,
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      type: Node_Type.File,
      url: 'MOCK_URL',
    }),
    updateFile: (_: unknown, { input }: MutationUpdateFileArgs): File => {
      const findFile = ({ path }: { path: string }) => path === input.path
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
    moveFile: (_: unknown, { input }: MutationMoveFileArgs) => {
      const filename = extractFilename(input.newPath)

      return {
        filename,
        path: input.newPath,
        content: 'MOCK_CONTENT_2',
        excerpt: 'MOCK_EXCERPT_2',
        sha: 'MOCK_SHA_2',
        type: Node_Type.File,
        url: 'MOCK_URL',
      }
    },
  }),
}
