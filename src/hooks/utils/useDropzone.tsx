import React, {
  ReactText,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { toast } from 'react-toastify'
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
  const toastId = React.useRef<ReactText | null>(null)

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
    setFile(null)
    setImagePath(null)
  }, [done, file, imagePath])

  useEffect(() => {
    if (!done) {
      return
    }

    // Have to wait for next tick to let whatever async stuff
    // toast is doing finish. If we don't do this and we reach 100
    // too quickly, the dismiss goes weird
    setTimeout(() => {
      if (toastId.current) {
        if (progress !== 100 || toast.isActive(toastId.current)) {
          // If the upload has finished but doesn't reach 100, the toast will not
          // close. In this case we need to dismiss ourselves
          toast.dismiss(toastId.current)
        }
        toastId.current = null
      }
    }, 1)

    return
  }, [done, progress])

  useEffect(() => {
    if (!loading) {
      return
    }

    const decimalProgress = progress / 100

    if (toastId.current === null) {
      toastId.current = toast('Upload in Progress', {
        progress: decimalProgress,
      })
    } else {
      toast.update(toastId.current, {
        progress: decimalProgress,
      })
    }
  }, [loading, progress])

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
