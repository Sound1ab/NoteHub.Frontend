import { getGithubImagePath } from '../getGithubImagePath'

describe('getGithubImagePath', () => {
  it('should return the correct image path', async () => {
    const path = 'MOCK_FOLDER/MOCK_FILE.md'
    const image = 'MOCK_IMAGE.png'

    const result = getGithubImagePath(image, path)

    expect(result).toBe('MOCK_FOLDER/images/MOCK_IMAGE.png')
  })

  it('should throw an error if path is not a folder', async () => {
    const path = 'MOCK_FOLDER'
    const image = 'MOCK_IMAGE.png'

    expect(() => getGithubImagePath(image, path)).toThrow('No file selected')
  })

  it('should throw an error if no path is provided', async () => {
    const image = 'MOCK_IMAGE.png'

    expect(() => getGithubImagePath(image)).toThrow('No file selected')
  })

  it('should return correct image path if file is at a top level', async () => {
    const path = 'MOCK_FILE.md'
    const image = 'MOCK_IMAGE.png'

    const result = getGithubImagePath(image, path)

    expect(result).toBe('images/MOCK_IMAGE.png')
  })
})
