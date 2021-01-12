export function useGit() {
  return [
    {
      getUnstagedChanges: jest.fn(() => ['MOCK_PATH.md']),
      addAll: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      status: jest.fn(),
      getCommittedChanges: jest.fn(() => ['MOCK_PATH.md']),
      clone: jest.fn(),
      push: jest.fn(),
      remove: jest.fn(),
      removeAll: jest.fn(),
      getDeletedUnstagedChanges: jest.fn(() => ['MOCK_PATH.md']),
    },
    { loading: false, error: null },
  ]
}
