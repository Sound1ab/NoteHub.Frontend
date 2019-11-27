import { useRef } from 'react'
import { Ref } from '../../components/atoms'
import {
  useDropzone,
  useFile,
  useIsEdit,
  useReadCurrentRepoName,
  useReadGithubUser,
} from '..'

export function useCommands() {
  const ref = useRef<Ref | null>(null)
  const { currentRepoName } = useReadCurrentRepoName()
  const user = useReadGithubUser()
  const { isEdit } = useIsEdit()
  const {
    selectFileAndUpload,
    Dropzone,
    loading: uploadingImage,
  } = useDropzone()
  const { setValue, loading: loadingFile, value } = useFile()

  async function uploadImage() {
    try {
      const filename = await selectFileAndUpload()
      const text = `![](https://github.com/${user?.name}/noted-app-notes--${currentRepoName}/blob/master/images/${filename}?raw=true)`
      ref?.current?.insertTextAtCursorPosition(text)
    } catch (error) {
      console.log(`Could not upload image: ${error}`)
    }
  }

  return {
    editorRef: ref,
    isEdit,
    Dropzone,
    loading: uploadingImage || loadingFile,
    setValue,
    value,
    uploadImage,
  }
}
