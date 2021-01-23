import fs from 'fs'

import nock from 'nock'
import { Page } from 'playwright'

import { interceptTraffic } from '../utils/interceptTraffic'

interface IOptions {
  debugRequests?: boolean
  mockRequests?: boolean
  surfaceConsoleLogs?: boolean
  interceptTraffic?: boolean
}

export class DashboardPage {
  private page: Page

  constructor(
    page: Page,
    { debugRequests, surfaceConsoleLogs, mockRequests }: IOptions
  ) {
    this.page = page

    debugRequests && this.debugRequests(page)

    surfaceConsoleLogs && this.surfaceConsoleLogs(page)

    mockRequests && this.mockRequets()
  }

  public static async pause() {
    await jestPlaywright.debug()
  }

  public static async build(
    page: Page,
    options: IOptions
  ): Promise<DashboardPage> {
    // Async setup
    options.interceptTraffic && (await interceptTraffic(page))

    return new DashboardPage(page, options)
  }

  public async navigate() {
    await this.page.goto(`${process.env.REACT_APP_CLIENT_BASE_URL!}/dashboard`)
  }

  public async search(text: string) {
    return this.page.$(`text="${text}"`)
  }

  public async searchRegex(text: RegExp) {
    return this.page.$(`text=${text}`)
  }

  public async getText(selector: string) {
    return this.page.$eval(
      selector,
      (e: SVGElement | HTMLElement) => e.textContent
    )
  }

  public async openFileInEditor(path: string[]) {
    for (const node of path) {
      await this.page.click(`text="${node}"`)
    }
  }

  public async openAvatarMenuAndClickOption(option: string) {
    await this.page.click('img[alt="avatar"]')

    await this.page.click(`text="${option}"`)

    await this.page.click(
      "//div[starts-with(normalize-space(.), 'FontDefaultSerifMonoThemeLight modeFull widthLarge textstyle checkSpellingReadab')]/div"
    )
  }

  public async clickDropdownItem(text: string) {
    await this.page.click(`text="${text}"`)
  }

  public async typeInTextArea(text: string) {
    await this.page.click('pre[role="presentation"]')

    await this.page.type('//article /textarea', text)
  }

  public async openWidget(text: string) {
    await this.page.click(`text="${text}"`)
  }

  public async createTopLevelFile(filepath: string) {
    await this.page.click('text="New file"')

    await this.page.fill('input[aria-label="Input file name"]', filepath)

    await this.page.press('input[aria-label="Input file name"]', 'Enter')
  }

  public async selectText(spacing: number) {
    await this.page.click('span[role="presentation"]')

    for (let i = 0; i < spacing; i++) {
      await this.page.press('//article /textarea', 'Shift+ArrowRight')
    }
  }

  public async rightClickEditorAndClickDropdownItem(item: string) {
    await this.page.click('//article', { button: 'right' })

    await this.page.click(`button[aria-label="${item}"]`)
  }

  private debugRequests(page: Page) {
    page.on('request', (request) =>
      console.log('>>', request.method(), request.url())
    )
  }

  private surfaceConsoleLogs(page: Page) {
    page.on('console', (m) => console.log(m.text()))
  }

  private mockRequets() {
    nock(process.env.REACT_APP_SERVER_BASE_URL!)
      .intercept('/graphql', 'OPTIONS')
      .reply(200)
      .post('/graphql', /"operationName":"Login"/gi)
      .reply(200, {
        data: {
          login: 'MOCK_JWT',
        },
      })
      .post('/graphql', /"operationName":"ReadRepo"/gi)
      .reply(200, {
        data: {
          readRepo: {
            name: 'MOCK.REPO',
            description: null,
            private: true,
            __typename: 'Repo',
          },
        },
      })
      .post('/graphql', /"operationName":"ReadGithubUser"/gi)
      .reply(200, {
        data: {
          readGithubUser: {
            id: 'MOCK_ID',
            login: 'MOCK_LOGIN',
            avatar_url: 'https://avatars3.githubusercontent.com/u/2397365?v=4',
            html_url: 'https://github.com/Sound1ab',
            name: 'MOCK NAME',
            __typename: 'GithubUser',
          },
        },
      })
    // .get(/proxy/)
    // .reply(
    //   200,
    //   '001e# service=git-upload-pack\n00000154aa5ac8085113aab828ceca16bfdaff84aa4effa6 HEAD\u0000multi_ack thin-pack side-band side-band-64k ofs-delta shallow deepen-since deepen-not deepen-relative no-progress include-tag multi_ack_detailed allow-tip-sha1-in-want allow-reachable-sha1-in-want no-done symref=HEAD:refs/heads/main filter object-format=sha1 agent=git/github-g130df6403707\n003daa5ac8085113aab828ceca16bfdaff84aa4effa6 refs/heads/main\n0000',
    //   {
    //     'Content-Type': 'application/x-git-upload-pack-advertisement',
    //     'Transfer-Encoding': 'chunked',
    //   }
    // )
    // .persist()
    // .post(/proxy/)
    // .reply(200, readFile(), {
    //   'Content-Type': 'application/x-git-upload-pack-result',
    //   'Transfer-Encoding': 'chunked',
    // })
  }
}
