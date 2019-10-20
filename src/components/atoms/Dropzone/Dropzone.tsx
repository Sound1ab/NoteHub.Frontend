import React, { ReactNode, useRef, useState } from 'react'
import { useStore } from '../../../hooks'
import { useCreateImage } from '../../../hooks/image/useCreateImage'
import { styled } from '../../../theme'

export const DropzoneContext = React.createContext<
  [() => Promise<string>, boolean]
>([null as any, false])

const Style = styled.input`
  display: none;
`

interface IDropzone {
  children: ReactNode
}

export function Dropzone({ children }: IDropzone) {
  const input = useRef<HTMLInputElement>(null)
  const [state] = useStore()
  const [loading, setLoading] = useState(false)
  const resolver = useRef<(value?: any | PromiseLike<any>) => void>(null)
  const rejecter = useRef<(value?: any | PromiseLike<any>) => void>(null)
  const createNewImage = useCreateImage()

  async function handleCreateNewImage(filename: string, content: any) {
    if (!content) {
      alert('no content')
      return
    }
    if (!state.repo.activeRepo) {
      alert('No active repo')
      return
    }
    setLoading(true)
    try {
      await createNewImage({
        variables: {
          input: {
            content,
            filename,
            repo: state.repo.activeRepo.name,
            username: state.user.username,
          },
        },
      })
    } catch (e) {
      alert('There was an issue saving your image, please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = e.target.files

    if (!acceptedFiles || acceptedFiles.length === 0) {
      if (rejecter && rejecter.current) {
        rejecter.current()
      }
      return
    }

    const [file] = acceptedFiles
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = async () => {
      const { name } = file
      await handleCreateNewImage(name, reader.result)
      if (resolver && resolver.current) {
        resolver.current(name)
      }
    }

    reader.readAsBinaryString(file)
  }

  function selectFileAndUpload(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!input.current) {
        return
      }
      input.current.click()
      // Todo: Note sure about this. Can be done better I think
      // @ts-ignore
      resolver.current = resolve
      // @ts-ignore
      rejecter.current = reject
    })
  }

  return (
    <DropzoneContext.Provider value={[selectFileAndUpload, loading]}>
      <Style
        autoComplete="off"
        accept="image/png"
        multiple={false}
        ref={input}
        tabIndex={-1}
        type="file"
        onChange={handleDrop}
      />
      {children}
    </DropzoneContext.Provider>
  )
}
