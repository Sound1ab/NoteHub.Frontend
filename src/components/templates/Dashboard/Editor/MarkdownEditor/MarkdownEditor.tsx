import React, { Ref } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import styled from 'styled-components'

import { useEasyMDE, useReadCurrentPath } from '../../../../../hooks'
import { isFile } from '../../../../../utils'
import { Fade } from '../../../../animation'
import { Icon } from '../../../../atoms'
import { renderMarkdown } from './utils/renderMarkdown'
import { renderMdx } from './utils/renderMdx'
import { Widget } from './Widget/Widget'

interface IMarkdownEditor {
  targetRef: Ref<HTMLElement>
}

export function MarkdownEditor({ targetRef }: IMarkdownEditor) {
  const currentPath = useReadCurrentPath()
  const {
    setEasyMDE,
    isPreviewActive,
    loading,
    activeWidget,
    isWidgetOpen,
    onEditorClick,
    onUpdateFile,
    onMarkdownCursorPosition,
    onRemoveWidget,
    file,
  } = useEasyMDE()

  const shouldRenderMdx = true

  if (!isFile(currentPath)) {
    return null
  }

  return (
    <StyledMarkdownEditor
      aria-label="Markdown editor"
      ref={targetRef}
      isPreviewActive={isPreviewActive}
    >
      <Fade show={Boolean(loading)}>
        <Spinner size="1x" icon="spinner" />
      </Fade>
      <Fade show={Boolean(isWidgetOpen)}>
        <Widget
          position={activeWidget?.coords}
          message={activeWidget?.message}
        />
      </Fade>
      <span onClick={onEditorClick}>
        <SimpleMDE
          key={file?.path}
          className="MarkdownEditor-wrapper"
          onChange={onUpdateFile}
          value={file?.content ?? ''}
          getLineAndCursor={onMarkdownCursorPosition}
          events={{ scroll: onRemoveWidget, viewportChange: onRemoveWidget }}
          options={{
            spellChecker: false,
            nativeSpellcheck: false,
            toolbar: true,
            status: true,
            theme: 'darcula',
            previewRender(text) {
              return shouldRenderMdx ? renderMdx(text) : renderMarkdown(text)
            },
          }}
          getMdeInstance={setEasyMDE}
        />
      </span>
    </StyledMarkdownEditor>
  )
}

const Spinner = styled(Icon)`
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.text.primary};
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  margin: ${({ theme }) => theme.spacing.xs};
  animation-fill-mode: forwards;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const StyledMarkdownEditor = styled.article<{ isPreviewActive?: boolean }>`
  position: relative;
  height: 100%;
  overflow: hidden;

  .editor-preview-side {
    display: none;
  }

  .editor-preview-active-side {
    flex: 0 0 50%;
    overflow: auto;
    padding: 0 ${({ theme }) => theme.spacing.xs};
    display: block;
  }

  .editor-preview-full {
    overflow: scroll !important;
    height: 100%;
    outline: 0;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 ${({ theme }) => theme.spacing.xs};
    background-color: ${({ theme }) => theme.colors.background.primary};
    width: 100%;
    z-index: 2;
    display: none;
  }

  .editor-preview-active {
    display: block;
  }

  .CodeMirror-sided {
    flex: 0 0 50%;
  }

  .EasyMDEContainer {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .MarkdownEditor-wrapper {
    height: 100%;
  }

  .CodeMirror-gutter-filler,
  .CodeMirror-scrollbar-filler {
    background-color: #d20707;
  }
  .CodeMirror-gutters {
    background-color: #f7f7f7;
    white-space: nowrap;
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }
  .CodeMirror-guttermarker {
    color: #000;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999;
  }
  .CodeMirror-cursor {
    border-left: 1px solid #000;
    border-right: none;
    width: 0;
  }
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1;
  }
  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }
  @-moz-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @-webkit-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }
  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: 0;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .cm-s-default .cm-header {
    color: #00f;
  }
  .cm-s-default .cm-quote {
    color: #090;
  }
  .cm-negative {
    color: #d44;
  }
  .cm-positive {
    color: #292;
  }
  .cm-header,
  .cm-strong {
    font-weight: 700;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }
  .cm-s-default .cm-keyword {
    color: #708;
  }
  .cm-s-default .cm-atom {
    color: #219;
  }
  .cm-s-default .cm-number {
    color: #164;
  }
  .cm-s-default .cm-def {
    color: #00f;
  }
  .cm-s-default .cm-variable-2 {
    color: #05a;
  }
  .cm-s-default .cm-type,
  .cm-s-default .cm-variable-3 {
    color: #085;
  }
  .cm-s-default .cm-comment {
    color: #a50;
  }
  .cm-s-default .cm-string {
    color: #a11;
  }
  .cm-s-default .cm-string-2 {
    color: #f50;
  }
  .cm-s-default .cm-meta {
    color: #555;
  }
  .cm-s-default .cm-qualifier {
    color: #555;
  }
  .cm-s-default .cm-builtin {
    color: #30a;
  }
  .cm-s-default .cm-bracket {
    color: #997;
  }
  .cm-s-default .cm-tag {
    color: #170;
  }
  .cm-s-default .cm-attribute {
    color: #00c;
  }
  .cm-s-default .cm-hr {
    color: #999;
  }
  .cm-s-default .cm-link {
    color: #00c;
  }
  .cm-s-default .cm-error {
    color: red;
  }
  .cm-invalidchar {
    color: red;
  }
  .CodeMirror-composing {
    border-bottom: 2px solid;
  }
  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }
  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: #fff;
  }
  .CodeMirror-scroll {
    box-sizing: border-box !important;
    overflow: scroll !important;
    height: 100%;
    outline: 0;
    position: relative;
    width: 100%;
    padding: 0 ${({ theme }) => theme.spacing.xs};
    display: ${({ isPreviewActive }) => (isPreviewActive ? 'none' : 'block')};
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 30px solid transparent;
    max-width: 80ch;
  }
  .CodeMirror-gutter-filler,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-vscrollbar {
    position: absolute;
    z-index: 6;
  }
  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    display: none !important;
  }
  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }
  .CodeMirror-gutter-filler {
    left: 0;
    bottom: 0;
  }
  .CodeMirror-gutters {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    z-index: 3;
  }
  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -30px;
  }
  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: 0 0 !important;
    border: none !important;
  }
  .CodeMirror-gutter-background {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
  }
  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4;
  }
  .CodeMirror-gutter-wrapper ::selection {
    background-color: transparent;
  }
  .CodeMirror-gutter-wrapper ::-moz-selection {
    background-color: transparent;
  }
  .CodeMirror-lines {
    cursor: text;
    min-height: 1px;
  }
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: 0 0;
    font-family: inherit;
    font-size: 14px;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: ${({ theme }) => theme.typographyStyles.html.lineHeight};
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }
  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }
  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }
  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    padding: 0.1px;
  }
  .CodeMirror-rtl pre {
    direction: rtl;
  }
  .CodeMirror-code {
    outline: 0;
  }
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber,
  .CodeMirror-scroll,
  .CodeMirror-sizer {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
  }
  .CodeMirror-measure pre {
    position: static;
  }
  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3;
  }
  div.CodeMirror-dragcursors {
    visibility: visible;
  }
  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }
  .CodeMirror-selected {
    background: #d9d9d9;
  }
  .CodeMirror-focused .CodeMirror-selected {
    background: #d7d4f0;
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }
  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: #d7d4f0;
  }
  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: #d7d4f0;
  }
  .cm-searching {
    background-color: #ffa;
    background-color: rgba(255, 255, 0, 0.4);
  }
  .cm-force-border {
    padding-right: 0.1px;
  }
  @media print {
    .CodeMirror div.CodeMirror-cursors {
      visibility: hidden;
    }
  }
  .cm-tab-wrap-hack:after {
    content: '';
  }
  span.CodeMirror-selectedtext {
    background: 0 0;
  }

  .CodeMirror {
    font-family: monospace;
    height: 100%;
    width: 100%;
    color: #000;
    direction: ltr;
    box-sizing: border-box;
    font: inherit;
    z-index: 1;
    word-wrap: break-word;
  }

  .cm-header-1 {
    font-size: ${({ theme }) => theme.typographyStyles.h1.fontSize};
    font-weight: ${({ theme }) => theme.typographyStyles.h1.fontWeight};
    line-height: ${({ theme }) => theme.typographyStyles.h1.lineHeight};
    margin-bottom: ${({ theme }) => theme.typographyStyles.h1.marginBottom};
    color: ${({ theme }) => theme.typographyStyles.h1.color};
  }
  .cm-header-2 {
    font-size: ${({ theme }) => theme.typographyStyles.h2.fontSize};
    font-weight: ${({ theme }) => theme.typographyStyles.h2.fontWeight};
    line-height: ${({ theme }) => theme.typographyStyles.h2.lineHeight};
    margin-bottom: ${({ theme }) => theme.typographyStyles.h2.marginBottom};
    color: ${({ theme }) => theme.typographyStyles.h2.color};
  }
  .cm-header-3 {
    font-size: ${({ theme }) => theme.typographyStyles.h3.fontSize};
    font-weight: ${({ theme }) => theme.typographyStyles.h3.fontWeight};
    line-height: ${({ theme }) => theme.typographyStyles.h3.lineHeight};
    margin-bottom: ${({ theme }) => theme.typographyStyles.h3.marginBottom};
    color: ${({ theme }) => theme.typographyStyles.h3.color};
  }
  .cm-header-4 {
    font-size: ${({ theme }) => theme.typographyStyles.h4.fontSize};
    font-weight: ${({ theme }) => theme.typographyStyles.h4.fontWeight};
    line-height: ${({ theme }) => theme.typographyStyles.h4.lineHeight};
    margin-bottom: ${({ theme }) => theme.typographyStyles.h4.marginBottom};
    color: ${({ theme }) => theme.typographyStyles.h4.color};
  }
  .cm-header-5 {
    font-size: ${({ theme }) => theme.typographyStyles.h5.fontSize};
    font-weight: ${({ theme }) => theme.typographyStyles.h5.fontWeight};
    line-height: ${({ theme }) => theme.typographyStyles.h5.lineHeight};
    margin-bottom: ${({ theme }) => theme.typographyStyles.h5.marginBottom};
    color: ${({ theme }) => theme.typographyStyles.h5.color};
  }
  .cm-header-6 {
    font-size: ${({ theme }) => theme.typographyStyles.h6.fontSize};
    font-weight: ${({ theme }) => theme.typographyStyles.h6.fontWeight};
    line-height: ${({ theme }) => theme.typographyStyles.h6.lineHeight};
    margin-bottom: ${({ theme }) => theme.typographyStyles.h6.marginBottom};
    color: ${({ theme }) => theme.typographyStyles.h6.color};
  }

  .cm-s-darcula {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }
  .cm-s-darcula.CodeMirror {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.typographyStyles.html.lineHeight};
  }

  .cm-s-darcula span.cm-meta {
    color: #bbb529;
  }
  .cm-s-darcula span.cm-number {
    color: #6897bb;
  }
  .cm-s-darcula span.cm-keyword {
    color: #cc7832;
    line-height: 1em;
    font-weight: bold;
  }
  .cm-s-darcula span.cm-def {
    color: #a9b7c6;
    font-style: italic;
  }
  .cm-s-darcula span.cm-variable {
    color: #a9b7c6;
  }
  .cm-s-darcula span.cm-variable-2 {
    color: #a9b7c6;
  }
  .cm-s-darcula span.cm-variable-3 {
    color: #9876aa;
  }
  .cm-s-darcula span.cm-type {
    color: #aabbcc;
    font-weight: bold;
  }
  .cm-s-darcula span.cm-property {
    color: #ffc66d;
  }
  .cm-s-darcula span.cm-operator {
    color: #a9b7c6;
  }
  .cm-s-darcula span.cm-string {
    color: #6a8759;
  }
  .cm-s-darcula span.cm-string-2 {
    color: #6a8759;
  }
  .cm-s-darcula span.cm-comment {
    color: #61a151;
    font-style: italic;
  }
  .cm-s-darcula span.cm-link {
    color: #cc7832;
  }
  .cm-s-darcula span.cm-atom {
    color: #cc7832;
  }
  .cm-s-darcula span.cm-error {
    color: #bc3f3c;
  }
  .cm-s-darcula span.cm-tag {
    color: #629755;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
  }
  .cm-s-darcula span.cm-attribute {
    color: #6897bb;
  }
  .cm-s-darcula span.cm-qualifier {
    color: #6a8759;
  }
  .cm-s-darcula span.cm-bracket {
    color: #a9b7c6;
  }
  .cm-s-darcula span.cm-builtin {
    color: #ff9e59;
  }
  .cm-s-darcula span.cm-special {
    color: #ff9e59;
  }
  .cm-s-darcula span.cm-matchhighlight {
    color: #ffffff;
    background-color: rgba(50, 89, 48, 0.7);
    font-weight: normal;
  }
  .cm-s-darcula span.cm-searching {
    color: #ffffff;
    background-color: rgba(61, 115, 59, 0.7);
    font-weight: normal;
  }

  .cm-s-darcula .CodeMirror-cursor {
    border-left: 1px solid #a9b7c6;
  }
  .cm-s-darcula .CodeMirror-activeline-background {
    background: #323232;
  }
  .cm-s-darcula .CodeMirror-gutters {
    background: #313335;
    border-right: 1px solid #313335;
  }
  .cm-s-darcula .CodeMirror-guttermarker {
    color: #ffee80;
  }
  .cm-s-darcula .CodeMirror-guttermarker-subtle {
    color: #d0d0d0;
  }
  .cm-s-darcula .CodeMirrir-linenumber {
    color: #606366;
  }
  .cm-s-darcula .CodeMirror-matchingbracket {
    background-color: #3b514d;
    color: #ffef28 !important;
    font-weight: bold;
  }

  .cm-s-darcula div.CodeMirror-selected {
    background: #214283;
  }

  .CodeMirror-hints.darcula {
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    color: #9c9e9e;
    background-color: #3b3e3f !important;
  }

  .CodeMirror-hints.darcula .CodeMirror-hint-active {
    background-color: #494d4e !important;
    color: #9c9e9e !important;
  }
`
