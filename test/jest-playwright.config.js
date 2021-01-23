module.exports = {
  launchOptions: {
    headless: true,
    // slowMo: 1000,
    devtools: true,
    args: ['--disable-web-security'],
  },
  browsers: ['firefox'],
  // serverOptions: {
  //   command: 'PORT=8080 yarn start',
  //   debug: true,
  //   launchTimeout: 60 * 5000,
  //   port: 8080,
  //   usedPortAction: 'ignore',
  //   waitOnScheme: {
  //     delay: 30 * 1000,
  //   },
  //   env: {
  //     REACT_APP_REPO: 'Sound1ab/NoteHub.Mock.git',
  //   },
  // },
}
