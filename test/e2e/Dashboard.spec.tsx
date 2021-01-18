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
  })
})
