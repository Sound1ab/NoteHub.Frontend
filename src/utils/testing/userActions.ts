import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function openDropdown(nodeName: string) {
  await userEvent.click(screen.getByLabelText(`${nodeName} actions`))
}

export async function clickDropdownItem(item: string) {
  await act(async () => {
    await userEvent.click(screen.getByLabelText(item))
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
