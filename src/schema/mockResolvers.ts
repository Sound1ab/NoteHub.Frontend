import {
  File,
  MutationCreateRepoArgs,
  MutationDeleteFileArgs,
  MutationUpdateFileArgs,
  QueryReadFileArgs,
  Repo,
} from '../components/apollo/generated_components_typings'

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
    _links: {
      html: 'MOCK_HTML_LINK_2',
    },
    repo: 'MOCK_FULL_NAME_2',
  },
  {
    filename: 'MOCK_FILENAME_1',
    path: 'MOCK_PATH_1',
    content: 'MOCK_CONTENT_1',
    excerpt: 'MOCK_EXCERPT_1',
    sha: 'MOCK_SHA_1',
    _links: {
      html: 'MOCK_HTML_LINK_1',
    },
    repo: 'MOCK_FULL_NAME_2',
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
    listRepos: () => ({
      items: repos,
    }),
    listFiles: () => ({
      items: files,
    }),
    readGithubUser: () => user,
    readFile: (_: any, input: QueryReadFileArgs) =>
      files.find(({ filename }) => filename === input.filename),
  }),
  Mutation: () => ({
    createRepo: (_: any, { input }: MutationCreateRepoArgs): Repo => ({
      id: 3,
      node_id: 'MOCK_NODE_ID',
      name: input.name,
      full_name: 'MOCK_FULL_NAME',
      description: input.description,
      private: input.private ?? false,
    }),
    deleteFile: (_: any, { input }: MutationDeleteFileArgs): File => ({
      filename: input.filename,
      path: 'MOCK_PATH_2',
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      _links: {
        html: 'MOCK_HTML_LINK_2',
      },
      repo: input.repo,
    }),
    updateFile: (_: any, { input }: MutationUpdateFileArgs): File => {
      const findFile = ({ filename }: any) => filename === input.filename
      const fileIndex = files.findIndex(findFile)
      const file = files.find(findFile)

      if (!file) {
        throw new Error('Mock update mutation resolver: Could not find file')
      }

      files[fileIndex] = {
        ...file,
        excerpt: file.excerpt ?? '',
        content: input.content ?? '',
        repo: input.repo,
        filename: input.filename,
      }
      return files[fileIndex]
    },
  }),
}
