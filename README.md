# 📓 NoteHub

NoteHub is an open-source markdown editor powered by GitHub. NoteHub stores your notes in a GitHub repository meaning you have total control over your data. 

Having notes stored in GitHub also opens up a huge world of opportunities to automate your note taking using GitHub actions. For some examples check out [NoteHub.Actions](https://github.com/Sound1ab/NoteHub.Actions) which provides some example automation such as generating new journal entries and automatically adding header images to new files.

NoteHub also integrates natural language processing using [`retext`](https://github.com/retextjs/retext) and [`rehype`](https://github.com/rehypejs/rehype), powered by [`unified`](https://github.com/unifiedjs/unified). Additionally, it can accept an increasing list of [`mdx`](https://github.com/mdx-js/mdx) components to bring your notes to life.

## 👀 Preview Links

App: [Master](http://notehub.xyz)

## Production

AWS [Lambda](https://aws.amazon.com/lambda/) and [APIGateway](https://aws.amazon.com/api-gateway/) are used with [serverless](https://serverless.com/) to host the API in production.

## 🚀 CircleCI

[Continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) provided by [CircleCI](https://circleci.com/).

## ☮️ GraphQL Code Generator

[GQL](https://github.com/dotansimha/graphql-code-generator) is used to provide TypeScript types.

## 🍺 Front End

Built with React and Hooks. Styled with Styled Components. Data layer provider by Apollo.
