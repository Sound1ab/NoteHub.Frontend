export function useGit() {
  return [
    {
      getUnstagedChanges: jest.fn(),
      stageChanges: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      status: jest.fn(),
      getCommittedChanges: jest.fn(),
      clone: jest.fn(),
    },
    { loading: false },
  ]
}
