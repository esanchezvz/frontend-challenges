import { CheckedState } from '@radix-ui/react-checkbox'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'

import { useTransferList } from '../use-transfer-list'

type TransferListProps<TListItem> = {
  list: TListItem[]
}

export type BaseListItem = {
  title: string
  id: string | number
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
}

const ListItem = ({ id, title, onChange }: ListItemProps) => {
  return (
    <div className="flex items-center gap-3 py-5 px-4 ">
      <Checkbox id={String(id)} className="cursor-pointer" onCheckedChange={onChange} />
      <label
        htmlFor={String(id)}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {title}
      </label>
    </div>
  )
}

const TransferList = <T extends BaseListItem>({ list }: TransferListProps<T>) => {
  const { listA, listB, onItemClick, transferToA, transferToB } = useTransferList(list)

  return (
    <div className="h-full flex gap-10 items-center justify-between">
      <ListContainer>
        {listA.map((item) => (
          <ListItem
            key={item.id}
            id={String(item.id)}
            title={item.title}
            onChange={(checked) => onItemClick(item, checked)}
          />
        ))}
      </ListContainer>
      <div className="flex flex-col gap-10 items-center justify-center">
        <Button>
          <ArrowRightIcon className="h-4 w-4" onClick={transferToB} />
        </Button>
        <Button>
          <ArrowLeftIcon className="h-4 w-4" onClick={transferToA} />
        </Button>
      </div>
      <ListContainer>
        {listB.map((item) => (
          <ListItem
            key={item.id}
            id={String(item.id)}
            title={item.title}
            onChange={(checked) => onItemClick(item, checked)}
          />
        ))}
      </ListContainer>
    </div>
  )
}

export default TransferList
