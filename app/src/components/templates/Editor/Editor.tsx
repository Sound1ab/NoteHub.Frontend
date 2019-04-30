import React from 'react'
import { styled } from '../../../theme'
import { Ace, Container } from '../../atoms'
import { Sidebar } from '../../molecules'
import { CardList } from '../../organism'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .page {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    min-width: 0;
    height: 100%;
  }
`

// export const ReadUserDocument = gql`
//   ${UserFragment}
//   ${NotebookFragment}
//   ${NoteFragment}
//   ${DateFragment}
//   query ReadUser {
//     readUser(id: "985d9b4d-920d-4b4f-9358-ab91146944d8") {
//       ...user
//       notebooks {
//         ...notebook
//         notes {
//           ...note
//         }
//       }
//       createdAt {
//         ...date
//       }
//       updatedAt {
//         ...date
//       }
//     }
//   }
// `

export function Editor() {
  return (
    <Style>
      <Container className="page">
        <Sidebar />
        <CardList />
        <main className="main">
          <Ace />
        </main>
      </Container>
    </Style>
  )
}
