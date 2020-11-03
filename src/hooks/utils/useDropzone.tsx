import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useUpload } from 'react-use-upload'

import { styled } from '../../theme'
import { useCreateSignedUrl } from '..'

const Style = styled.input`
  display: none;
`

export function useDropzone() {
  const input = useRef<HTMLInputElement>(null)
  const [createSignedUrl] = useCreateSignedUrl()
  const [file, setFile] = useState<File | null>(null)
  const [imagePath, setImagePath] = useState<string | null>(null)

  async function getUrl() {
    const { data } = await createSignedUrl()

    const signedUrl = data?.createSignedUrl

    if (!signedUrl) {
      throw new Error('No signedUrl')
    }

    const [imagePath] = signedUrl.split('?')

    setImagePath(imagePath)

    return signedUrl
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { progress, done, loading } = useUpload(file!, {
    getUrl,
    method: 'PUT',
    headers: {
      'x-amz-acl': 'public-read',
    },
  })

  useEffect(() => {
    if (!done || !file || !imagePath) {
      return
    }
    console.log('useDropzone: done and resetting')
    setFile(null)
    setImagePath(null)
  }, [done, file, imagePath])

  const handleDrop = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files || files.length === 0) {
      return
    }

    const reader = new FileReader()

    reader.onload = async () => {
      setFile(files[0])
    }

    reader.readAsBinaryString(files[0])
  }, [])

  function openFileDialog() {
    if (!input.current) {
      return
    }
    input.current.click()
  }

  const onInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  const inputElement = useCallback(() => {
    return (
      <Style
        autoComplete="off"
        accept="image/*"
        multiple={false}
        ref={input}
        tabIndex={-1}
        type="file"
        onChange={handleDrop}
        onClick={onInputClick}
        aria-label="Upload file"
      />
    )
  }, [handleDrop])

  return {
    Dropzone: inputElement,
    openFileDialog,
    done,
    progress,
    imagePath,
    loading,
  }
}
