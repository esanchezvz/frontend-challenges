import { CheckedState } from '@radix-ui/react-checkbox'
import { useCallback, useState } from 'react'

type TransferListState<T> = {
  listA: T[]
  listB: T[]
}

export const useTransferList = <T extends { id: string | number }>(initialList: T[]) => {
  const [state, setState] = useState<TransferListState<T>>({
    listA: initialList,
    listB: [],
  })
  const [selected, setSelected] = useState<T[]>([])

  const onSelect = useCallback((item: T) => {
    setSelected((prev) => {
      prev.push(item)
      return prev
    })
  }, [])

  const onDeselect = useCallback((item: T) => {
    setSelected((prev) => prev.filter((i) => i.id !== item.id))
  }, [])

  const onItemClick = useCallback(
    (item: T, selected: CheckedState) => {
      if (selected) {
        onSelect(item)
      } else {
        onDeselect(item)
      }
    },
    [onDeselect, onSelect],
  )

  const transferToA = useCallback(() => {
    const { listA: _a, listB: _b } = state
    const selectedIds = selected.map((s) => s.id)
    setState({
      listA: _a.concat(selected),
      listB: _b.filter((b) => !selectedIds.includes(b.id)),
    })
    setSelected([])
  }, [state, selected])

  const transferToB = useCallback(() => {
    const { listA: _a, listB: _b } = state
    const selectedIds = selected.map((s) => s.id)
    setState({
      listA: _a.filter((b) => !selectedIds.includes(b.id)),
      listB: _b.concat(selected),
    })
    setSelected([])
  }, [state, selected])

  return { ...state, onItemClick, transferToA, transferToB }
}
