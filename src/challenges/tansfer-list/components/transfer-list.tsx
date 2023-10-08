import { CheckedState } from '@radix-ui/react-checkbox'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'

import { type BaseTransferListItem, useTransferList } from '../use-transfer-list'

type TransferListProps<TListItem> = {
  list: TListItem[]
}

type ListContainerProps = {
  children: React.ReactNode
}

const ListContainer = ({ children }: ListContainerProps) => {
  return <div className="h-full border flex-1 overflow-hidden overflow-y-auto rounded-md">{children}</div>
}

type ListItemProps = {
  id: string
  title: string
  onChange: (value: CheckedState) => void
  selected: boolean
}

const ListItem = ({ id, title, onChange, selected }: ListItemProps) => {
  return (
    <div className="flex items-center gap-3 py-5 px-4">
      <Checkbox id={String(id)} className="cursor-pointer" onCheckedChange={onChange} checked={selected} />
      <label
        htmlFor={String(id)}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {title}
      </label>
    </div>
  )
}

const TransferList = <T extends BaseTransferListItem>({ list }: TransferListProps<T>) => {
  const [state, dispatch] = useTransferList(list)

  const selected = state.selected.map((s) => s.id)

  return (
    <div className="flex gap-10 items-center justify-between h-full">
      <ListContainer>
        {state.left.map((item) => (
          <ListItem
            key={item.id}
            id={String(item.id)}
            title={item.title}
            onChange={() => dispatch({ type: 'toggle_selected', item })}
            selected={selected.includes(item.id)}
          />
        ))}
      </ListContainer>
      <div className="flex flex-col gap-10 items-center justify-center">
        <Button onClick={() => dispatch({ type: 'transfer_all_to_right' })}>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
        <Button onClick={() => dispatch({ type: 'transfer_to_right' })}>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        <Button onClick={() => dispatch({ type: 'transfer_to_left' })}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button onClick={() => dispatch({ type: 'transfer_all_to_left' })}>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
      </div>
      <ListContainer>
        {state.right.map((item) => (
          <ListItem
            key={item.id}
            id={String(item.id)}
            title={item.title}
            onChange={() => dispatch({ type: 'toggle_selected', item })}
            selected={selected.includes(item.id)}
          />
        ))}
      </ListContainer>
    </div>
  )
}

export default TransferList
