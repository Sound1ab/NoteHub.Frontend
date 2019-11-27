import React, { useRef } from 'react'
import { styled } from '../../../theme'
import { CardList, Sidebar, Toolbar } from '../../organisms'
import {
  useReadCurrentRepoName,
  useReadGithubUser,
  useFile,
  useDropzone,
  useIsEdit,
} from '../../../hooks'
import { MarkdownPreview, Monaco, Ref } from '../../atoms'

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .Dashboard-page {
    display: grid;
    grid-template-columns:
      min-content
      min-content
      3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'toolbar toolbar toolbar'
      'sidebar filelist editor';
    height: 100%;
    width: 100%;
  }
`

export function Dashboard() {
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

  return (
    <Style>
      <Dropzone />
      <div className="Dashboard-page">
        <Sidebar />
        <CardList />
        <Toolbar uploadImage={uploadImage} />
        {isEdit ? (
          <Monaco
            onChange={setValue}
            value={value}
            loading={loadingFile || uploadingImage}
            ref={ref}
          />
        ) : (
          <MarkdownPreview value={value} />
        )}
      </div>
    </Style>
  )
}
