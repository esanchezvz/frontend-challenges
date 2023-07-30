import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table'
import { cn } from '@/utils/ui'

import { useUsers } from '../provider'
import { SortBy, SortOrder } from '../types'

const UsersTable = () => {
  const { users, removeUser, restore, setCountryFilter, sorting, countryFilter, sort } = useUsers()
  const [striped, setStriped] = useState(false)

  const SortIcon = !sorting.sortOrder ? null : sorting.sortOrder === SortOrder.ASC ? (
    <ArrowUpIcon className="h-4 w-4" />
  ) : (
    <ArrowDownIcon className="h-4 w-4" />
  )

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-5 mb-5">
        <Button size="sm" onClick={() => setStriped(!striped)}>
          {striped ? 'Remove Stripes' : 'Color Rows'}
        </Button>
        <Button size="sm" onClick={() => sort(SortBy.COUNTRY)}>
          {sorting.sortBy === SortBy.COUNTRY
            ? sorting.sortOrder === SortOrder.DESC
              ? 'Remove Country Sort'
              : 'Change Country Sort'
            : 'Sort by Country'}
        </Button>
        <Button size="sm" onClick={restore}>
          Restore Users
        </Button>
        <Input
          placeholder="Filter by country"
          className="max-w-[300px]"
          onChange={({ target: { value } }) => setCountryFilter(value || '')}
          value={countryFilter}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead className="cursor-pointer" onClick={() => sort(SortBy.FIRST_NAME)}>
              <span className="flex items-center gap-2">
                First Name {sorting.sortBy === SortBy.FIRST_NAME ? SortIcon : null}
              </span>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => sort(SortBy.LAST_NAME)}>
              <span className="flex items-center gap-2">
                Last Name {sorting.sortBy === SortBy.LAST_NAME ? SortIcon : null}
              </span>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => sort(SortBy.COUNTRY)}>
              <span className="flex items-center gap-2">
                Country {sorting.sortBy === SortBy.COUNTRY ? SortIcon : null}
              </span>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u, i) => {
            return (
              <TableRow
                key={u.id.value || u.email}
                className={cn({
                  'bg-muted': striped && i % 2 === 0,
                })}
              >
                <TableCell>
                  <img
                    src={u.picture.thumbnail}
                    alt={`${u.name.first} ${u.name.last}`}
                    className="rounded-full w-8"
                  />
                </TableCell>
                <TableCell>{u.name.first}</TableCell>
                <TableCell>{u.name.last}</TableCell>
                <TableCell>{u.location.country}</TableCell>
                <TableCell>
                  <Button size="icon" variant="destructive" onClick={() => removeUser(i)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
export default UsersTable
