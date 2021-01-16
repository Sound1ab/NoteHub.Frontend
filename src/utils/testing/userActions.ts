import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { wait } from '../../test-utils'

interface IUserAction {
  shouldWait?: number
}

export async function openDropdown(nodeName: string) {
  await userEvent.click(screen.getByLabelText(`${nodeName} actions`))
}

interface IClickDropdownItem {
  item: string
  shouldWait?: number
}

export async function clickDropdownItem({
  item,
  shouldWait,
}: IClickDropdownItem) {
  await act(async () => {
    await userEvent.click(screen.getByText(item))
    shouldWait && (await wait(shouldWait))
  })
}

export async function typeInInputAndSubmit(
  inputLabel: string,
  formLabel: string,
  inputText: string
) {
  const input = screen.getByLabelText(inputLabel)

  await act(async () => {
    await fireEvent.change(input, {
      target: { value: inputText },
    })

    const form = screen.getByLabelText(formLabel)

    await fireEvent.submit(form)
  })
}

export async function clickNode(nodeName: string) {
  await userEvent.click(await screen.findByText(nodeName))
}

export async function clickChevron() {
  await fireEvent.click(screen.getByLabelText('chevron'))
}

export async function clickContainer(container: Element) {
  await userEvent.click(container)
}

export async function clickAndDragFileOverFolder(
  filePath: string,
  folderPath: string
) {
  await act(async () => {
    await fireEvent.dragStart(screen.getByText(filePath))
    await fireEvent.dragEnter(screen.getByText(folderPath))
    await fireEvent.dragOver(screen.getByText(folderPath))
    await fireEvent.drop(screen.getByText(folderPath))
  })
}

export async function closeTab(tab: HTMLElement) {
  await act(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await userEvent.click(tab.querySelector('svg')!)
  })
}

export async function clickProfile({ shouldWait }: IUserAction) {
  await act(async () => {
    await fireEvent.click(screen.getByAltText('avatar'))
    shouldWait && (await wait(shouldWait))
  })
}

interface ITypeInTextArea extends IUserAction {
  text: string
}

export async function typeInTextArea({ shouldWait, text }: ITypeInTextArea) {
  await act(async () => {
    const [textAreaOne, textAreaTwo] = screen.getAllByRole('textbox')

    await userEvent.type(textAreaTwo || textAreaOne, text)

    shouldWait && (await wait(shouldWait))
  })
}
