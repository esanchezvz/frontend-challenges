import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { APIResult, SortBy, SortOrder, SortState, User } from './types'

type UsersContext = {
  users: User[]
  loading: boolean
  restore: () => void
  sorting: SortState
  sort: (sortBy: SortBy) => void
  setCountryFilter: React.Dispatch<React.SetStateAction<string>>
  countryFilter: string
  removeUser: (index: number) => void
}

const Context = createContext<UsersContext>({
  users: [],
  loading: false,
  restore: () => {},
  sorting: {
    sortBy: null,
    sortOrder: null,
  },
  countryFilter: '',
  sort: () => {},
  removeUser: () => {},
  setCountryFilter: () => {},
})

type ProviderProps = {
  children: React.ReactNode
}

const UsersProvider = ({ children }: ProviderProps) => {
  const initialUsers = useRef<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [countryFilter, setCountryFilter] = useState('')
  const [sorting, setSorting] = useState<SortState>({
    sortBy: null,
    sortOrder: SortOrder.ASC,
  })
  const [loading, setLoading] = useState(false)
  const restore = useCallback(() => setUsers(initialUsers.current), [])

  const sortedUsers = useMemo(() => {
    if (!sorting.sortBy || !sorting.sortOrder) return users

    const sortingMap: Record<SortBy, (a: User, b: User) => number> = {
      [SortBy.COUNTRY]: (a: User, b: User) =>
        sorting.sortOrder === SortOrder.ASC
          ? a.location.country.localeCompare(b.location.country)
          : b.location.country.localeCompare(a.location.country),
      [SortBy.FIRST_NAME]: (a: User, b: User) =>
        sorting.sortOrder === SortOrder.ASC
          ? a.name.first.localeCompare(b.name.first)
          : b.name.first.localeCompare(a.name.first),
      [SortBy.LAST_NAME]: (a: User, b: User) =>
        sorting.sortOrder === SortOrder.ASC
          ? a.name.last.localeCompare(b.name.last)
          : b.name.last.localeCompare(a.name.last),
    }

    return users.concat([]).sort(sortingMap[sorting.sortBy])
  }, [users, sorting])

  const filteredUsers = useMemo(() => {
    return !!countryFilter
      ? sortedUsers.filter((u) => u.location.country.toLowerCase().includes(countryFilter.toLowerCase()))
      : sortedUsers
  }, [sortedUsers, countryFilter])

  const removeUser = useCallback(
    (index: number) => {
      setUsers(filteredUsers.filter((_, i) => i !== index))
    },
    [filteredUsers],
  )

  const handleSorting = useCallback(
    (sortBy: SortBy) => {
      if (sorting.sortBy === sortBy) {
        if (sorting.sortOrder === SortOrder.ASC) {
          setSorting({ ...sorting, sortOrder: SortOrder.DESC })
        } else {
          setSorting({ sortBy: null, sortOrder: null })
        }

        return
      }

      setSorting({ sortBy, sortOrder: SortOrder.ASC })
    },
    [sorting],
  )

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://randomuser.me/api?results=100')
        const apiResult = (await res.json()) as APIResult

        setUsers(apiResult.results)
        initialUsers.current = apiResult.results
      } catch (err) {
        console.error(err)
      }

      setLoading(false)
    }

    fetchUsers()
  }, [])

  const providerValue: UsersContext = useMemo(
    () => ({
      users: filteredUsers,
      loading,
      restore,
      sorting,
      sort: handleSorting,
      removeUser,
      setCountryFilter,
      countryFilter,
    }),
    [filteredUsers, loading, restore, sorting, handleSorting, removeUser, countryFilter],
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

export default UsersProvider

export const useUsers = () => useContext(Context)
