import React, { useRef, useState } from 'react'
import { useCreateImage } from './useCreateImage'
import { useReadCurrentRepoName } from '../Repo/useReadCurrentRepoName'
import { styled } from '../../theme'
import { useReadGithubUser } from '../user/useReadGithubUser'

const Style = styled.input`
  display: none;
`

export function useDropzone() {
  const input = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const resolver = useRef<(value?: any | PromiseLike<any>) => void>(null)
  const rejecter = useRef<(value?: any | PromiseLike<any>) => void>(null)
  const createNewImage = useCreateImage()
  const { currentRepoName } = useReadCurrentRepoName()
  const user = useReadGithubUser()

  async function handleCreateNewImage(filename: string, content: any) {
    if (!content) {
      alert('no content')
      return
    }
    if (!currentRepoName || !user?.login) {
      alert('Error')
      return
    }
    setLoading(true)
    try {
      await createNewImage({
        variables: {
          input: {
            content,
            filename,
            repo: currentRepoName,
            username: user.login,
          },
        },
      })
    } catch (e) {
      alert(`There was an issue saving your image, please try again: ${e}`)
    } finally {
      setLoading(false)
    }
  }

  function removeWhiteSpace(str: string) {
    return str.replace(/\s+/g, '')
  }

  function handleDrop(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files || files.length === 0) {
      rejecter?.current?.()
      return
    }

    const [file] = files
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = async () => {
      const { name } = file
      const validatedName = removeWhiteSpace(name)
      await handleCreateNewImage(validatedName, reader.result)
      if (resolver && resolver.current) {
        resolver.current(validatedName)
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

  const inputElement = () => {
    return (
      <Style
        autoComplete="off"
        accept="image/*"
        multiple={false}
        ref={input}
        tabIndex={-1}
        type="file"
        onChange={handleDrop}
      />
    )
  }

  return { Dropzone: inputElement, selectFileAndUpload, loading }
}
