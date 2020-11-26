import {
  File,
  MutationCreateFileArgs,
  MutationDeleteFileArgs,
  MutationMoveFileArgs,
  MutationUpdateFileArgs,
  Node_Type,
  QueryReadFileArgs,
  QueryReadGithubUserAccessTokenArgs,
} from '../components/apollo'
import { extractFilename } from '../utils'

export const files: File[] = [
  {
    id: 'MOCK_ID_2',
    filename: 'MOCK_FILE_PATH_2.md',
    path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md',
    content: '# MOCK_CONTENT',
    sha: 'MOCK_SHA_2',
    type: Node_Type.File,
    url: 'MOCK_URL',
    readAt: new Date().toString(),
  },
  {
    id: 'MOCK_ID_3',
    filename: 'MOCK_FILE_PATH_1.md',
    path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md',
    content: '# MOCK_CONTENT',
    sha: 'MOCK_SHA_1',
    type: Node_Type.File,
    url: 'MOCK_URL',
    readAt: new Date().toString(),
  },
  {
    id: 'MOCK_ID_4',
    filename: 'MOCK_FILE_PATH_3.md',
    path: 'MOCK_FILE_PATH_3.md',
    content: '# MOCK_CONTENT',
    sha: 'MOCK_SHA_3',
    type: Node_Type.File,
    url: 'MOCK_URL',
    readAt: new Date().toString(),
  },
  {
    id: 'MOCK_ID_1',
    filename: 'MOCK_FILE_PATH_4.md',
    path: 'MOCK_FILE_PATH_4.md',
    content: 'heelo',
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
    readFiles: () => files,
    logout: () => 'ok',
  }),
  Mutation: () => ({
    deleteFile: (_: unknown, { input }: MutationDeleteFileArgs): File => ({
      id: 'MOCK_ID_DELETE',
      filename: 'MOCK_FILENAME',
      path: input.path,
      content: 'MOCK_CONTENT_2',
      sha: 'MOCK_SHA_2',
      type: Node_Type.File,
      url: 'MOCK_URL',
    }),
    createFile: (_: unknown, { input }: MutationCreateFileArgs): File => ({
      id: 'MOCK_ID_CREATE',
      filename: 'MOCK_FILENAME',
      path: input.path,
      content: 'MOCK_CONTENT_2',
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
        id: 'MOVE_MOCK_ID',
        filename,
        path: input.newPath,
        content: 'MOCK_CONTENT_2',
        sha: 'MOCK_SHA_2',
        type: Node_Type.File,
        url: 'MOCK_URL',
      }
    },
  }),
}
