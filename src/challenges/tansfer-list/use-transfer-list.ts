import { useReducer } from 'react'

export type BaseTransferListItem = { id: string | number; title: string }

type TransferListState<T extends BaseTransferListItem> = {
  left: T[]
  right: T[]
  selected: T[]
}

type TransferListAction<T extends BaseTransferListItem> =
  | { type: 'transfer_to_left' }
  | { type: 'transfer_all_to_left' }
  | { type: 'transfer_to_right' }
  | { type: 'transfer_all_to_right' }
  | { type: 'toggle_selected'; item: T }

const toggleSelected = <T extends BaseTransferListItem>(prevSelected: T[], item: T) => {
  const found = prevSelected.find((s) => s.id === item.id)

  if (found) {
    return prevSelected.filter((s) => s.id !== item.id)
  }

  return prevSelected.concat([item])
}

const not = <T extends BaseTransferListItem>(a: readonly T[], b: readonly T[]) => {
  const ids = b.map((b) => b.id)
  return a.filter(({ id }) => !ids.includes(id))
}

const intersection = <T extends BaseTransferListItem>(a: readonly T[], b: readonly T[]) => {
  const ids = b.map((b) => b.id)
  return a.filter(({ id }) => ids.includes(id))
}

const transferListReducer = <T extends BaseTransferListItem>(
  state: TransferListState<T>,
  action: TransferListAction<T>,
) => {
  const output = { ...state }
  const rightChecked = intersection(output.selected, output.right)
  const leftChecked = intersection(output.selected, output.left)

  switch (action.type) {
    case 'toggle_selected':
      output.selected = toggleSelected(state.selected, action.item)
      break
    case 'transfer_to_right':
      output.right = output.right.concat(leftChecked)
      output.selected = not(output.selected, leftChecked)
      output.left = not(output.left, leftChecked)
      break
    case 'transfer_all_to_right':
      output.right = output.right.concat(output.left)
      output.left = []
      break
    case 'transfer_to_left':
      output.left = output.left.concat(rightChecked)
      output.selected = not(output.selected, rightChecked)
      output.right = not(output.right, rightChecked)
      break
    case 'transfer_all_to_left':
      output.left = output.left.concat(output.right)
      output.right = []
      break
  }

  return output
}

export const useTransferList = <T extends BaseTransferListItem>(initialList: T[]) => {
  const [state, dispatch] = useReducer(transferListReducer, {
    left: initialList,
    right: [],
    selected: [],
  })

  return [state, dispatch] as const
}
