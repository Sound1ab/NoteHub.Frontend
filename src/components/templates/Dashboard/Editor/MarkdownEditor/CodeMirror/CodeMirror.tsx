import { Editor, EditorFromTextArea, Position } from 'codemirror'
import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FONT } from '../../../../../../enums'
import { useCodeMirror } from '../../../../../../hooks/context/useCodeMirror'
import { useReadFile } from '../../../../../../hooks/file/useReadFile'
import { useReadThemeSettings } from '../../../../../../hooks/localState/useReadThemeSettings'
import { darken } from '../../../../../../utils/css/darken'
import {
  drawHorizontalRule,
  drawLink,
  drawTable,
  drawTableComponent,
  drawTodoListComponent,
  toggleBlockquote,
  toggleBold,
  toggleCodeBlock,
  toggleItalic,
  toggleOrderedList,
  toggleUnorderedList,
} from './actions'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HyperMd = require('hypermd')

export interface IActions {
  editor: EditorFromTextArea
  toggleOrderedList: () => void
  toggleCodeBlock: () => void
  toggleUnorderedList: () => void
  toggleItalic: () => void
  toggleBold: () => void
  toggleBlockquote: () => void
  drawHorizontalRule: () => void
  drawLink: () => void
  drawTable: () => void
  drawTableComponent: () => void
  drawTodoListComponent: () => void
}

export function CodeMirror() {
  const textArea = useRef<HTMLTextAreaElement | null>(null)
  const codeMirrorRef = useRef<EditorFromTextArea | null>(null)
  const {
    setActions,
    onEditorClick,
    onUpdateFile,
    onMarkdownCursorPosition,
  } = useCodeMirror()
  const { isFullWidth, font } = useReadThemeSettings()
  const { file } = useReadFile()
  const mountedRef = useRef(false)
  const hydratedRef = useRef(false)
  const cursorAppliedRef = useRef(true)

  const value = file?.content ?? ''

  const hydrate = useCallback((editor: Editor, value: string) => {
    if (hydratedRef.current) return
    const doc = editor.getDoc()
    const lastLine = doc.lastLine()
    const lastChar = doc.getLine(doc.lastLine()).length

    doc.replaceRange(
      value || '',
      { line: 0, ch: 0 },
      { line: lastLine, ch: lastChar }
    )

    hydratedRef.current = true
  }, [])

  const preserveCursor = useCallback((editor: Editor, position: Position) => {
    if (cursorAppliedRef.current) return

    const doc = editor.getDoc()

    doc.setCursor(position)

    cursorAppliedRef.current = true
  }, [])

  useEffect(() => {
    if (!textArea || !textArea.current || mountedRef.current) return

    const editor = HyperMd.fromTextArea(textArea.current, {
      lineNumbers: false,
      lineWrapping: true,
      viewportMargin: Infinity,
      foldGutter: false,
    })

    codeMirrorRef.current = editor

    setActions?.({
      editor,
      toggleOrderedList: () => toggleOrderedList(editor),
      toggleCodeBlock: () => toggleCodeBlock(editor),
      toggleUnorderedList: () => toggleUnorderedList(editor),
      toggleItalic: () => toggleItalic(editor),
      toggleBold: () => toggleBold(editor),
      toggleBlockquote: () => toggleBlockquote(editor),
      drawHorizontalRule: () => drawHorizontalRule(editor),
      drawLink: () => drawLink(editor),
      drawTable: () => drawTable(editor),
      drawTableComponent: () => drawTableComponent(editor),
      drawTodoListComponent: () => drawTodoListComponent(editor),
    })

    hydrate(editor, value)

    mountedRef.current = true

    editor.getDoc().clearHistory()
  }, [onUpdateFile, onMarkdownCursorPosition, setActions, hydrate, value])

  useEffect(() => {
    const editor = codeMirrorRef.current

    if (!editor) {
      return
    }

    const handleChange = (editor: Editor) => {
      if (!mountedRef.current) return

      const newValue = editor.getValue()

      if (newValue === value) {
        return
      }

      onUpdateFile?.(editor.getValue())
    }
    const handleCursorActivity = (editor: Editor) => {
      if (!mountedRef.current) return

      onMarkdownCursorPosition?.(editor.getCursor())
    }

    editor.on('change', handleChange)
    editor.on('cursorActivity', handleCursorActivity)

    return () => {
      editor.off('change', handleChange)
      editor.off('cursorActivity', handleCursorActivity)
    }
  }, [onUpdateFile, onMarkdownCursorPosition, value])

  useEffect(() => {
    const editor = codeMirrorRef.current

    if (!editor) return

    if (codeMirrorRef.current?.getValue() !== value) {
      hydratedRef.current = false
      cursorAppliedRef.current = false
    }

    const cursor = editor.getDoc().getCursor()

    hydrate(editor, value)

    preserveCursor(editor, cursor)
  }, [value, hydrate, preserveCursor])

  return (
    <StyledCodeMirror
      isFullWidth={isFullWidth}
      font={font}
      onClick={onEditorClick}
    >
      <textarea ref={textArea} />
    </StyledCodeMirror>
  )
}

const StyledCodeMirror = styled.article<{ isFullWidth: boolean; font: FONT }>`
  position: relative;

  .CodeMirror {
    height: auto;
  }

  .CodeMirror-sizer {
    position: relative;
    max-width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '90ch')};
    width: 100%;
    border-right-width: 0px !important;
  }

  .CodeMirror-scroll {
    box-sizing: border-box !important;
    outline: 0;
    position: relative;
    width: 100%;
    overflow: visible;
    display: flex;
    justify-content: center;
  }

  .CodeMirror-gutters {
    display: none;
  }

  .CodeMirror-lines {
    padding: 0;
  }

  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: 0 0;
    margin: 0;
    white-space: pre-wrap;
    word-wrap: normal;
    line-height: 1.5em;
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
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

  @font-face {
    font-family: 'HyperMD-Bullets';
    src: url('data:application/x-font-woff;charset=utf-8;base64,d09GRk9UVE8AAATYAAsAAAAABrQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAADLAAAAVkAAAFgkDDiyEZGVE0AAASsAAAAGwAAABx9TbkrR0RFRgAABIgAAAAiAAAAJgAnACpPUy8yAAABZAAAAEcAAABgVTNgQ2NtYXAAAALUAAAAQwAAAUoBRQLkaGVhZAAAAQgAAAAzAAAANgrgpUBoaGVhAAABPAAAAB4AAAAkBOsD+WhtdHgAAATIAAAAEAAAABALoAL5bWF4cAAAAVwAAAAGAAAABgAEUABuYW1lAAABrAAAASYAAAITC0mo3nBvc3QAAAMYAAAAEwAAACD/gwAzeJxjYGRgYABil5kPquP5bb4ycLMwgMCVWRq+ENpyHoMxAwNTNFMEkMvBwAQSBQAX2QkFAHicY2BkYGAyZtjFEMNsxQAETNEMjAyogAUAMnAB7AAAAABQAAAEAAB4nGNgYTZlnMDAysDANIvpDAMDQz+EZnzFYMTIARRlYOVkgAFGBiQQkOaawtDAoMWgy2z835ghhsn4vxuKGgUgZAQARsULIwB4nIWOMWvDMBSET4mT4g6lhC7dtBQSiI1kSgNZAw506FBIlk52YhyDsIPiDIGO/T39Lf01nXtyRJYOMcjv09O9ewfgDt8QOH+PePYsECL33MMNPj338YQfzwFCcet5gHvx4nnI/geVIgh5S7opxwIjvHnuca/x3McrvjwH1Px6HkCKB89DjMQSCzTY4wSLCiV2aCExxgYT1gQKGjNMyQYZlTmOwKLZn2xV7lo53kxkovRsKk3W5HxaoaZDxWNQYMtprOq2ak2xJb6zV9LBeVlei/JoMkJKZzfnqqWi6HbH3C4x5/nveu5rKiL+o0tSpE3dpo0tC5nESs7lZTtZq0hHLu61nGv2LA58d7kkvZ173FWXCevCHqqmlkrpWCklrxj+AequT5gAAHicY2BgYGaAYBkGRgYQcAHyGMF8FgYNIM0GpBkZmBi0GXT//wfytUD0/+v/r0HVAwEjGwOCQxAwMoHtG2YAAPijCSYAeJxjYGYAg/8NDMYMWAAAKBQBtgB4nEWOsUsCYRjG38+7y/O8zoxOIi8RXBLE0iWCtkYjLLBoNMsSJC2sKILIFuuDKIhKbBKDwDFovAgC5eb8AwqaCqql740TzBZ7nuU3Pb+HAM8DIUSKreZSufTSYgiIBQhE0AHoJqhZcJDDft7zbKm0ZM4zXW7JvEcC2+bsMKUdkK06xQ98FzQoOTSAHg3KTg1UjUR6gfsbHAAfBCYy2e311PJKzjuU8HvDI6HRgDcdzyxsdOz/N9qxgwwK8IT4ssflb6pjVCe6zuo6p7swiHfNYJfePFAxyurNqFXBBG6pGWYTYmvZZGFONO3nwtlUNX6/I86bnFAsXNILekurpcqN+DIuFK9PK7TdfHm3In7VhHQ1dZWkebp/tHcoKjiGYXxTJ0236Ywx54xhumrMxdRHU30QFPbaIJ/M4NgJ2lRmPJlGl/JT60O/SmWpITVkmRl2Zsjdv2uJiQgAAAB4nGNgZGBg4AFiMQY5BiYGRiBkBmIWoAgTEDNCMAAIgwBSAAB4nGNgYGBkAIIrkuH2YHqWhi+EtpwHADfuBa0AAgAAMwMzAOgDOgDiAzMA/A==')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  .cm-s-hypermd-light {
    --fs: ${({ theme }) =>
      theme.typographyStyles.html.fontSize}; //default font-size

    --editor-background: var(--background-primary);
    --editor-color: var(--text-primary);

    --line-height: ${({ theme }) => theme.typographyStyles.h1.lineHeight};
    --line-margin: ${({ theme }) => theme.spacing.xs};
    --line-padding: ${({ theme }) => theme.spacing.xxs};

    --footnote-padding: ${({ theme }) => theme.spacing.m};

    --quote-margin: ${({ theme }) => theme.spacing.xxxs};
    --quote-padding: ${({ theme }) => theme.spacing.s};

    --list-margin: ${({ theme }) => theme.spacing.xxs};
    --list-indent: ${({ theme }) => theme.spacing.xxxs};
    --list-bullet-width: ${({ theme }) => theme.spacing.l};
    --list-margin-after-line: ${({ theme }) => theme.spacing.xxs};
    --list-height: ${({ theme }) => theme.spacing.s};

    --table-border-style: 1px solid var(--accent-primary);
    --table-row1-height: ${({ theme }) => theme.spacing.xxs};
    --table-sep-width: ${({ theme }) => theme.spacing.xxs};
    --table-sep-image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOc+R8AAjcBmvywMWoAAAAASUVORK5CYII=';
    --table-row-1-image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAQAAAAziH6sAAAADklEQVR42mOc+Z9x5n8ACTkDM4ikM1IAAAAASUVORK5CYII=';

    --codeblock-border: 0px solid var(--accent-primary);
    --codeblock-padding: ${({ theme }) => theme.spacing.xxs};
    --codeblock-backgound: var(--background-secondary);
    --codeblock-padding: ${({ theme }) => theme.spacing.xs};
    --codeblock-begin-end-background: var(--background-tertiary);

    --hashtag-fontsize: ${({ theme }) => theme.typographyStyles.html.fontSize};
    --hashtag-padding-x: ${({ theme }) => theme.spacing.xxs};
    --hashtag-padding-y: 0;
    --hashtag-radius: ${({ theme }) => theme.spacing.xxs};

    --hr-color: var(--accent-primary);
    --hr-image: var(--table-row-1-image);
    --hr-padding: ${({ theme }) => theme.spacing.xxs};

    font-family: ${({ font }) => {
      switch (font) {
        case 'isDefault':
          return `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`
        case 'isSerif':
          return `Lyon-Text, Georgia, YuMincho, "Yu Mincho", "Hiragino Mincho ProN", "Hiragino Mincho Pro", "Songti TC", "Songti SC", "SimSun", "Nanum Myeongjo", NanumMyeongjo, Batang, serif;`
        case 'isMono':
          return `iawriter-mono, Nitti, Menlo, Courier, monospace;`
      }
    }};
    -webkit-font-smoothing: antialiased;

    //------------------------------------------------------------------

    line-height: var(--line-height);
    font-size: var(--fs);
    background: var(--editor-background);
    color: var(--editor-color);

    /// Fold-HTML

    .CodeMirror-linewidget,
    .hmd-fold-html {
      table {
        border-collapse: collapse;
        td,
        th {
          padding: 10px;
          border: 1px solid #ccc;
        }
      }

      kbd {
        font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
        display: inline-block;
        padding: 3px 5px;
        font-size: 90%;
        line-height: 1em;
        background-color: #fafbfc;
        border: solid 1px #c6cbd1;
        border-bottom-color: rgb(198, 203, 209);
        border-bottom-color: #959da5;
        border-radius: 3px;
        box-shadow: inset 0 -1px 0 #959da5;
        vertical-align: baseline;
      }

      a > img {
        border: 0;
      }
    }

    /// CodeMirror

    .cm-header,
    .cm-strong {
      font-weight: 600;
    }
    span.cm-quote {
      color: #666;
    }
    span.cm-meta {
      color: ${darken('--light-primary', 0.7)};
    }
    span.cm-keyword {
      line-height: 1em;
      font-weight: bold;
      color: #e74c3c;
    }
    span.cm-atom {
      color: #04aa51;
    }
    span.cm-number {
      color: #164;
    }
    span.cm-def {
      color: #04aa51;
    }
    span.cm-variable {
      color: var(--text-primary);
    }
    span.cm-variable-2 {
      color: #04aa51;
    }
    span.cm-variable-3 {
      color: #04aa51;
    }
    span.cm-property {
      color: var(--text-tertiary);
    }
    span.cm-operator {
      color: var(--text-secondary);
    }
    span.cm-comment {
      color: #4f9f5f;
    }
    span.cm-string {
      color: #04aa51;
    }
    span.cm-string-2 {
      color: #f50;
    }
    span.cm-qualifier {
      color: #555;
    }
    span.cm-builtin {
      color: #30a;
    }
    span.cm-bracket {
      color: #cc7;
    }
    span.cm-tag {
      color: #170;
    }
    span.cm-attribute {
      color: #04aa51;
    }
    span.cm-url {
      color: #4af;
    }
    span.cm-link {
      color: var(--accent-primary);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    span.cm-error {
      color: #f00;
    }
    span.cm-math {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      font-style: italic;
      background: rgba(#ffe, 0.4);
    }
    span.cm-formatting-math {
      color: #caa;
      font-weight: inherit;
    }

    .CodeMirror-activeline-background {
      background: #e8f2ff;
    }
    .CodeMirror-matchingbracket {
      outline: 1px solid grey;
      color: black !important;
    }

    .CodeMirror-linenumber {
      color: #ccc;
    }
    .CodeMirror-gutters {
      border-right: var(--line-margin) solid var(-editor-background);
      padding-right: 5px;
    }
    .CodeMirror-line {
      padding: 0;
    }
    .CodeMirror-code {
      padding-right: 0;
    }
    .CodeMirror-foldmarker {
      display: inline-block;
      vertical-align: middle;
    }

    .CodeMirror-cursor {
      border: 1px solid var(--editor-color);
    }

    /// Formatting Tokens, use monospace chars
    span {
      &.cm-formatting-em,
      &.cm-formatting-strong,
      &.cm-formatting-strikethrough,
      &.cm-formatting-code,
      &.cm-formatting-link,
      &.cm-formatting-image,
      &.cm-url {
        font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      }
    }

    /// TOC
    span.cm-hmd-toc {
      font-size: calc(var(--fs) * 2);
      color: #999;
    }

    /// OrgMode
    span.cm-hmd-orgmode-markup {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
    }

    /// Front Matter
    span.cm-hmd-frontmatter {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
    }

    pre.HyperMD-header {
      // see https://github.com/laobubu/HyperMD/issues/25
      line-height: var(--line-height) !important;
      font-family: inherit !important;
      margin-left: 0 !important;
      border-left: 0 !important;
      > span > span:first-child {
        margin-left: 0 !important;
      }
      padding-left: 0px !important;
      &:after {
        display: block;
        content: ' ';
        margin-top: 2px;
        height: 0px !important;
        background: #eee;
      }
    }

    /// Horizontal Rule

    div.HyperMD-hr-bg {
      left: 0;
      right: 0;
      border-top: ${({ theme }) => theme.spacing.xxxs} solid
        var(--accent-primary);
      transform: translateY(50%);
      background: none;
    }

    /// blockquote

    pre.HyperMD-quote {
      &:before {
        content: ' ';
        position: absolute;
        left: var(--quote-margin);
        top: 0;
        height: 100%;
        background: url('data:image/gif;base64,R0lGODlhIAABAIABAOjo6P///yH5BAEAAAEALAAAAAAgAAEAAAIHhI8Yy+1cAAA7')
          0 0;
        background-size: var(--quote-padding) 1px;
      }
    }

    ${() => {
      let hyperMdListLine = ``

      for (let i = 1; i < 10; i++) {
        hyperMdListLine = `
          ${hyperMdListLine}
          
          pre.HyperMD-quote-${i} {
            --padding-left: var(--quote-margin) + calc((var(--quote-padding)) * ${i});
            padding-left: var(--line-padding) + var(--padding-left);
      
            &:before {
              width: calc(var(--quote-padding) * ${i});
            }
      
            &.HyperMD-footnote {
              padding-left: var(--line-padding) + var(--padding-left) +
                var(--footnote-padding);
            }
      
            span.cm-formatting-quote {
              transform: translateZ(0); // avoid getting covered by pre:before
              display: inline-block;
              width: var(--quote-padding);
              &:first-child {
                margin-left: -calc(var(--quote-padding)) * ${i};
              }
            }
          }
        `
      }

      return hyperMdListLine
    }}

    span.cm-hmd-indent-in-quote {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
    }

    /// list

    span.cm-hmd-list-indent {
      display: inline-block;
      width: var(--list-indent);
      text-align: right;
      white-space: pre;
      box-sizing: border-box;
      border-right: 1px dashed #ccc;
      overflow: hidden;
      font-size: 0.5em;
      line-height: 200%;
    }

    pre.HyperMD-list-line {
      padding-top: var(--list-margin-after-line);
      min-height: var(--list-height);

      span.cm-formatting-list,
      span.cm-hmd-list-indent {
        text-align: right;
        white-space: pre;
        width: var(--list-bullet-width);
        float: left;
      }

      span.cm-hmd-list-indent {
        margin-left: -calc(var(--list-indent)) - var(--list-bullet-width);
      }

      &.HyperMD-list-line-nobullet {
        padding-top: initial;
        span.cm-hmd-list-indent {
          margin-left: -calc(var(--list-bullet-width));
        }
      }
    }

    ${() => {
      let hyperMdListLine = ``

      for (let i = 1; i < 10; i++) {
        hyperMdListLine = `
          ${hyperMdListLine}
          
          pre.HyperMD-list-line-${i} {
            padding-left:  calc(var(--line-padding) + var(--list-indent) * ${i} + var(--list-margin));
          }
        `
      }

      return hyperMdListLine
    }}

    span.cm-formatting-list {
      margin-left: -calc(var(--list-bullet-width));
      font-family: 'HyperMD-Bullets';
      color: #666;
      &.cm-list-2 {
        text-shadow: 0 1px #666, 0 -1px #666, 1px 0 #666, -1px 0 #666;
        color: #fff;
      }
    }

    span.cm-formatting-task // task list checkbox
    {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      white-space: pre;
      display: inline-block;
      height: 1em;
      line-height: 1em;
      min-width: 1em;
      text-align: center;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-position: center 0;
      cursor: pointer;

      &.cm-property {
        // checked
        background-position-y: -1em;
      }

      color: var(--text-primary);

      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAwCAMAAAA8VkqRAAAAclBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa4vOeAAAAJXRSTlMADcjpDswcLZOzsvOYBvWdbtvTX0D69+ORa1dRJCDtuaF7ZDkoQyuUXgAAAMhJREFUOMvt0reywjAUhOFjKxmcrgMZboL//V8Rm6GwkNUx0LClvhkVZ1fEZoqHqMwO7wuUSb0YxcJKxtLpxIt2SzJRykkQp5RgdAjaIKRJCEn6gWdA9OzRoqLVRscQnc9bdtXX/eyurOF7N3erLVDPwCGHxoVwamH1LwGUBfBbhrCvoLlMitL9DY8trLtJg7qoCj18VAN1OYE/YJBuDe1RJtBVo5wbqPb+GL5yWG1GLX0YZYw5iQ93yQ/yAHfZzu5qt/mxr97VFS15JGSVM0C6AAAAAElFTkSuQmCC');
      background-size: 1em;
      filter: invert();
    }

    /// footnote for link and image
    // note: footnote can be inside a blockquote
    pre.HyperMD-footnote {
      font-size: calc(var(--fs) * 0.85);
      padding-left: var(--line-padding) + var(--footnote-padding);

      > span > span:first-child {
        margin-left: -calc(var(--footnote-padding));
      }

      span.cm-hmd-footnote {
        color: #666;
        cursor: text;
        text-decoration: none;
      }
    }

    /// code block

    // pre.hmd-codeblock-start,
    // pre.hmd-codeblock-end
    // {

    // }
    pre.HyperMD-codeblock {
      line-height: 1.2;
      color: var(--accent-primary);
      //background-color: var(--code-block-background);

      // &.hmd-codeblock-indent {
      span.cm-inline-code {
        display: inherit;
        background-color: inherit;
        border: inherit;
        padding: inherit;
        font-size: inherit;
      }
    }

    // note: this is a background style
    div.HyperMD-codeblock-bg {
      left: 0;
      right: 0;
      background-color: var(--codeblock-backgound);
      border-left: var(--codeblock-border);
      border-right: var(--codeblock-border);
    }

    pre.HyperMD-codeblock {
      padding: 0 var(--codeblock-padding);
    }

    pre.HyperMD-codeblock-begin {
      padding: var(--codeblock-padding) var(--codeblock-padding) 0
        var(--codeblock-padding);
    }

    pre.HyperMD-codeblock-end {
      padding: 0 var(--codeblock-padding) var(--codeblock-padding)
        var(--codeblock-padding);
    }

    div.HyperMD-codeblock-begin-bg {
      border-top: var(--codeblock-border);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    div.HyperMD-codeblock-end-bg {
      border-bottom: var(--codeblock-border);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    div.HyperMD-codeblock-begin-bg,
    div.HyperMD-codeblock-end-bg {
      background-color: var(--codeblock-backgound);
    }

    /// link

    .cm-formatting-link + .cm-formatting-link-string,
    .cm-formatting-link + .cm-formatting-link-string + .cm-url,
    .cm-formatting-link
      + .cm-formatting-link-string
      + .cm-url
      + .cm-formatting-link-string,
    .cm-formatting-link + .cm-formatting-link-string + .cm-url + .cm-link,
    .cm-formatting-link
      + .cm-formatting-link-string
      + .cm-url
      + .cm-link
      + .cm-formatting-link-string {
      display: inline-block;
      font-size: 0.85em;
      vertical-align: text-top;
    }

    // change cursor for links if modifier keys pressed
    &.HyperMD-with-alt,
    &.HyperMD-with-ctrl {
      span.cm-url,
      span.cm-link,
      .cm-link + .CodeMirror-widget,
      span.cm-hashtag {
        cursor: pointer;
      }
    }

    span.hmd-link-icon {
      width: 0px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
      opacity: 0.4;
      &:hover {
        opacity: 1;
      }
      &:after {
        content: ''; //remove default stuff
      }
    }

    /// image

    img.hmd-image {
      vertical-align: middle;
      width: auto;
      max-width: 100%;
      height: auto;
      &.hmd-image-loading,
      &.hmd-image-error {
        min-width: 24px;
        min-height: 24px;
        background: #eeeeee url(hypermd-image-spin.gif) no-repeat center center;
      }
      &.hmd-image-error {
        background-image: url(hypermd-image-error.png);
      }
    }

    /// math blocks

    span.hmd-fold-math-placeholder {
      // when math is not fully rendered. a placeholder with raw Tex expression is presented
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      font-style: italic;
      background: rgba(#ffe, 0.4);
    }

    span.cm-math-2 {
      font-size: calc(1.1 * var(--fs));
    }

    /// other Markdown stuff

    span.cm-hmd-escape-backslash {
      color: #caa;
    }
    span.cm-hmd-escape-char {
      color: #666;
    }
    span.cm-hmd-footref {
      display: inline-block;
      font-size: 0.7em;
      vertical-align: text-top;
      background-color: rgba(#eee, 0.7);
      color: #999;
      margin-top: -0.2em;
    }

    span.cm-inline-code {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      color: #922;
      font-size: 90%;

      &:not(.cm-formatting):not(.cm-hmd-indented-code) {
        background-color: rgba(#eee, 0.5);
        border-radius: 4px;
        vertical-align: baseline;
        border: #ccc solid 1px;
        padding: 1px 0.4em;
      }

      &.hmd-hidden-token {
        font-size: 0;
      }
    }

    /// hyperMD stuff

    /// hashtag

    span.cm-hashtag {
      background-color: #999;
      background-color: rgba(#000, 0.3);
      color: #fff;
      font-size: var(--hashtag-fontsize);
      display: inline-block;
      vertical-align: middle;
      padding-top: var(--hashtag-padding-y);
      padding-bottom: var(--hashtag-padding-y);

      &.cm-hashtag-begin {
        padding-left: var(--hashtag-padding-x);
        border-radius: var(--hashtag-radius) 0 0 var(--hashtag-radius);
      }

      &.cm-hashtag-end {
        padding-right: var(--hashtag-padding-x);
        border-radius: 0 var(--hashtag-radius) var(--hashtag-radius) 0;
      }

      &.cm-hmd-escape-backslash {
        color: #fcc;
      }
    }

    span.cm-formatting-hashtag {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      color: #eee;
    }

    /// hypermd/addon/insert-file

    .hmd-file-uploading {
      outline: 2px dashed #ccc;
      outline-offset: -2px;
      animation: hmd-file-uploading-ani 1.5s linear infinite;
    }

    @keyframes hmd-file-uploading-ani {
      0%,
      100% {
        opacity: 0.4;
      }
      50% {
        opacity: 0.7;
      }
    }

    .hmd-file-uploaded {
      outline: 2px solid #6c3;
      outline-offset: -2px;
    }

    /// hypermd/addon/click

    .HyperMD-goback {
      width: 1px;
    }
    div.HyperMD-goback-button {
      padding-right: 15px; // not less than .CodeMirror-gutters padding-right
      border-radius: 0 10px 10px 0;
      display: inline-block;
      text-align: center;
      background-color: lighten(#4078c0, 20%);
      color: #f7f7f7;
      cursor: pointer;
      &:hover {
        color: transparent;
        text-align: left;
        &:before {
          position: absolute;
          padding-left: 5px;
          content: 'Back';
          color: #f7f7f7;
        }
      }
    }

    /// hpyermd table

    pre.HyperMD-table-row {
      > span {
        display: inline-block;
        border-top: var(--table-border-style);
        margin-right: calc(
          30px + var(--line-margin) * 2
        ); // leave space for hscroller
      }

      &.HyperMD-table-row-0,
      &.HyperMD-table-row-1,
      &.HyperMD-table-row-2 {
        > span {
          border-top: 0;
        }
      }

      span.cm-hmd-table-sep {
        font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
        width: var(--table-sep-width);
        text-align: center;
        box-sizing: content-box;
        font-weight: normal;

        &.cm-hmd-table-sep-dummy {
          width: 1em;
        }

        &:before {
          content: '|';
          color: transparent;
          top: 0;
          height: 100%;
          position: absolute;
          // border-left: var(--table-border-style);
          background: url(var(--table-sep-image)) repeat-y center 0px;
          pointer-events: none;
        }
      }

      &.HyperMD-table-row-0 {
        // title row
        font-weight: 600;
        span.cm-strong {
          font-weight: 800;
        }
      }

      .hmd-table-column-content {
        // do NOT delete padding, otherwise measuring will be inaccurate!
        // something about layout Grid and Block Formatting Contexts
        padding: calc(var(--table-row1-height) / 2) 1px;
      }

      &.HyperMD-table-row-1 {
        // :----: | :-----: | dash line
        line-height: var(--table-row1-height);

        > span {
          border-bottom: 0;
        }
        .hmd-table-column-content {
          padding: 1px;
        }
      }

      &.HyperMD-table-row-0 {
        > span {
          border-bottom: 0;
        }
        span.hmd-table-column-content {
          padding-bottom: 1px;
        }
      }

      &.HyperMD-table-row-2 {
        span.hmd-table-column-content {
          padding-top: 1px;
        }
      }
    }

    /// hypermd/addon/hover

    &.CodeMirror div.HyperMD-hover {
      > .HyperMD-hover-content {
        background-color: #000;
        background-color: rgba(#000, 0.7);
        border: 0;
        color: #fff;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 95%;
        min-width: 200px;
        a {
          color: inherit;
        }
        p {
          margin: 0.2em 0;
        }
        code {
          font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
          display: inline-block;
          font-size: 0.87em;
          border: 1px solid #999;
          border-radius: 2px;
          padding: 0px 4px;
        }
      }
      > .HyperMD-hover-indicator {
        content: ' ';
        display: block;
        width: 0px;
        margin-bottom: -5px;
        border: 5px solid transparent;
        border-top-color: #000;
        border-top-color: rgba(#000, 0.7);
      }
    }

    /// fold-html

    .hmd-fold-html-stub {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      display: inline-block;
      font-size: 67%;
      color: #999;
      vertical-align: middle;
      border: 1px solid #999;
      padding: 0 0.2em;
      border-radius: 5px;
      margin: 0 0.5em;
      background: #fafafa;
      cursor: pointer;

      &.omittable {
        display: none;
      }

      &:hover,
      &.highlight {
        // for non-inline HTML stub. Remind user where the stub is.
        color: #fff;
        border-color: #c30;
        background: #f40;
      }
    }

    .hmd-fold-html {
      position: relative;
      border: 1px solid #fff;

      &:hover {
        border: 1px dashed #999;

        .hmd-fold-html-stub.omittable {
          display: block;
          right: 0;
          bottom: 100%;
          margin: 0;
          position: absolute;
          z-index: 100;
        }
      }
    }

    /// fold-code

    .hmd-fold-code-stub {
      font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      display: inline-block;
      font-size: 67%;
      color: #999;
      vertical-align: middle;
      border: 1px solid #999;
      padding: 0 0.2em;
      border-radius: 5px;
      margin: 0 0.5em;
      background: #fafafa;
      cursor: pointer;

      &.omittable {
        display: none;
      }

      &:hover,
      &.highlight {
        // for non-inline HTML stub. Remind user where the stub is.
        color: #fff;
        border-color: #c30;
        background: #f40;
      }
    }

    .hmd-fold-code-image {
      text-align: center;
    }

    /// deal with floating elements

    pre.HyperMD-header,
    pre.HyperMD-footnote,
    pre.HyperMD-codeblock,
    pre.HyperMD-hr {
      clear: left;
    }

    /// hide-token
    span.hmd-hidden-token {
      &.cm-formatting-task {
        color: transparent !important;
      }
    }

    pre.hmd-inactive-line {
      // background: aqua;  // just for debug

      &.HyperMD-table-row-1 {
        // table line |:--------:|:-------:|
        color: transparent;
        text-shadow: none;
      }

      &.HyperMD-hr {
        color: transparent;
        background-color: transparent;
      }

      &.HyperMD-table-row-1 > span {
        background: url(var(--table-row-1-image)) repeat-x 0px center;
      }

      &.HyperMD-table-row {
        span.cm-hmd-table-sep {
          color: transparent;
          &.cm-hmd-table-sep-dummy:before {
            display: none;
          }
        }
      }

      span.cm-formatting-quote {
        color: transparent;
      }

      span.cm-hmd-escape-backslash,
      span.cm-formatting-header {
        font-size: 0 !important;
        display: inline;
      }

      span.cm-hmd-list-indent {
        border-right: 0;
      }
    }
  }
`
