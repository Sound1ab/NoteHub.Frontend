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

export const folderNode: ITreeNode = {
  type: Node_Type.Folder,
  name: 'MOCK_FOLDER',
  toggled: false,
  path: 'MOCK_FOLDER_PATH',
  children: [],
}

export const fileNode: ITreeNode = {
  type: Node_Type.File,
  name: 'MOCK_FILE',
  toggled: false,
  path: 'MOCK_FILE_PATH',
  children: [],
}

const folderGitNode: GitNode = {
  type: Node_Type.Folder,
  path: 'MOCK_FOLDER_PATH',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

const fileGitNode: GitNode = {
  type: Node_Type.File,
  path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH',
  sha: 'MOCK_SHA',
  url: 'MOCK_URL',
}

export const repos = [
  {
    description: 'MOCK_DESCRIPTION_2',
    full_name: 'MOCK_FULL_NAME_2',
    id: 2,
    name: 'MOCK_NAME_2',
    node_id: 'MOCK_ID_2',
    private: false,
  },
  {
    description: 'MOCK_DESCRIPTION_1',
    full_name: 'MOCK_FULL_NAME_1',
    id: 1,
    name: 'MOCK_NAME_1',
    node_id: 'MOCK_ID_1',
    private: true,
  },
]

export const files = [
  {
    filename: 'MOCK_FILENAME_2',
    path: 'MOCK_PATH_2',
    content: 'MOCK_CONTENT_2',
    excerpt: 'MOCK_EXCERPT_2',
    sha: 'MOCK_SHA_2',
    type: 'file',
    url: 'MOCK_URL',
  },
  {
    filename: 'MOCK_FILENAME_1',
    path: 'MOCK_PATH_1',
    content: 'MOCK_CONTENT_1',
    excerpt: 'MOCK_EXCERPT_1',
    sha: 'MOCK_SHA_1',
    type: 'file',
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
      files.find(({ filename }) => filename === input.path),
    readNodes: () => ({
      nodes: [folderGitNode, fileGitNode],
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
      const findFile = ({ filename }: any) => filename === input.path
      const fileIndex = files.findIndex(findFile)
      const file = files.find(findFile)

      if (!file) {
        throw new Error('Mock update mutation resolver: Could not find file')
      }

      files[fileIndex] = {
        ...file,
        excerpt: file.excerpt ?? '',
        content: input.content ?? '',
        filename: 'MOCK_FILENAME',
        type: Node_Type.File,
        url: 'MOCK_URL',
      }
      return files[fileIndex]
    },
  }),
}
