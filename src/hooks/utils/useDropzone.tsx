import React, {
  ReactText,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { useUpload } from 'react-use-upload'
import styled from 'styled-components'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import { useEditor } from '../codeMirror/useEditor'
import { useCreateSignedUrl } from '../image/useCreateSignedUrl'
import { useReadCursorPosition } from '../localState/useReadCursorPosition'

const Style = styled.input`
  display: none;
`

export function useDropzone() {
  const { editor } = useEditor()
  const input = useRef<HTMLInputElement>(null)
  const [createSignedUrl] = useCreateSignedUrl()
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [imagePath, setImagePath] = useState<string | null>(null)
  const toastId = React.useRef<ReactText | null>(null)
  const cursorPosition = useReadCursorPosition()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { progress, done, loading } = useUpload(uploadFile!, {
    getUrl,
    method: 'PUT',
    headers: {
      'x-amz-acl': 'public-read',
    },
  })

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

  useEffect(() => {
    if (!done || !uploadFile || !imagePath) {
      return
    }
    setUploadFile(null)
    setImagePath(null)
  }, [done, uploadFile, imagePath])

  const handleDrop = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files || files.length === 0) {
      return
    }

    const reader = new FileReader()

    reader.onload = async () => {
      setUploadFile(files[0])
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

  const insertPathIntoString = useCallback(
    (path: string | null) => {
      if (!path) {
        return
      }

      const text = `![](${path})`
      const { ch, line } = cursorPosition
      const lines = editor?.getValue().split('\n') ?? []
      const characters = lines.length > 0 ? [...lines[line]] : []
      characters.splice(ch, 0, text)
      lines[line] = characters.join('')
      return lines.join('\n')
    },
    [cursorPosition, editor]
  )

  const updateEditor = useCallback(async () => {
    const content = insertPathIntoString(imagePath)

    if (!content) return

    editor?.setValue(content)
  }, [imagePath, insertPathIntoString, editor])

  useEffect(() => {
    if (!done || !imagePath) {
      return
    }
    updateEditor()
  }, [done, updateEditor, imagePath])

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

  return {
    Dropzone: inputElement,
    openFileDialog,
    done,
    progress,
    imagePath,
    loading,
  }
}
