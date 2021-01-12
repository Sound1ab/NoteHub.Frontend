export function useFileTree() {
  return [
    {
      openFoldersInPath: jest.fn(),
      toggleFolder: jest.fn(),
      deleteFile: jest.fn(),
      renameNode: jest.fn(),
      fileClick: jest.fn(),
      createFile: jest.fn(),
      folderClick: jest.fn(),
      chevronClick: jest.fn(),
    },
    { loading: false, error: null },
  ]
}
