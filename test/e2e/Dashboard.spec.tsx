import { wait } from 'playwright-testing-library'

import { DashboardPage } from './models/DashboardPage'

describe('Dashboard', () => {
  let dashboard: DashboardPage

  beforeEach(async () => {
    jest.clearAllMocks()

    dashboard = await DashboardPage.build(page, {
      debugRequests: true,
      interceptTraffic: true,
      mockRequests: true,
      surfaceConsoleLogs: true,
    })

    await dashboard.navigate()
  })

  it('should show sidebar, toolbar and editor', async () => {
    await dashboard.openFileInEditor([
      'levelOneFolderOne',
      'levelTwoFileOne.md',
    ])

    await wait(async () => {
      expect(await dashboard.search('Some more mock content')).not.toBeNull()
    })
  })

  describe('Editor', () => {
    it('should spell check text', async () => {
      await dashboard.openFileInEditor([
        'levelOneFolderOne',
        'levelTwoFileOne.md',
      ])

      await dashboard.typeInTextArea(' some spalling mistake')

      await dashboard.openAvatarMenuAndClickOption('Spelling')

      await dashboard.openWidget('spalling')

      await wait(async () => {
        expect(
          await dashboard.searchRegex(/.*`spalling` is misspelt.*/)
        ).not.toBeNull()
      })
    })

    it('should bold text from context menu', async () => {
      await dashboard.openFileInEditor([
        'levelOneFolderOne',
        'levelTwoFileOne.md',
      ])

      await dashboard.selectText(4)

      await dashboard.rightClickEditorAndClickDropdownItem('Bold')

      expect(await dashboard.getText('span[role="presentation"]')).toEqual(
        'Some more **mock** content'
      )
    })
  })

  describe('File tree', () => {
    it('should create new file and open in editor', async () => {
      await dashboard.openFileInEditor(['levelOneFileOne.md'])

      await dashboard.createTopLevelFile('levelOneFileTwo')

      await dashboard.typeInTextArea('this is some test content')

      await wait(async () => {
        expect(
          await dashboard.searchRegex(/.*this is some test content.*/)
        ).not.toBeNull()
      })
    })

    it('should create nested file and open in editor', async () => {
      await dashboard.openFileInEditor(['levelOneFileOne.md'])

      await dashboard.createTopLevelFile(
        'levelOneFolderTwo/levelTwoFolderOne/levelThreeFileOne'
      )

      await dashboard.typeInTextArea('this is some test content')

      await wait(async () => {
        expect(
          await dashboard.searchRegex(/.*this is some test content.*/)
        ).not.toBeNull()
      })
    })

    it('should create file in existing folder', async () => {
      await dashboard.openFileInEditor(['levelOneFileOne.md'])

      await dashboard.createTopLevelFile(
        'levelOneFolderOne/levelTwoFolderOne/levelThreeFileOne'
      )

      await dashboard.typeInTextArea('this is some test content')

      await wait(async () => {
        expect(
          await dashboard.searchRegex(/.*this is some test content.*/)
        ).not.toBeNull()
      })
    })
  })
})
