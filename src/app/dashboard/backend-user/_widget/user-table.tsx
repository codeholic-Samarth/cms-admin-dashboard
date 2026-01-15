'use client'

import {
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Dispatch, SetStateAction, useState } from 'react'

import { DataGrid, DataGridContainer } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { BackendUser } from '@/features/user/backendUsers/backendUser.types'

import { usersColumns } from './user-column'

type Props = {
  data: BackendUser[]
  totalCount: number
  pagination: PaginationState
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>
  isLoading?: boolean
  onViewUser: (userId: string) => void
}

const UserTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  isLoading,
  onViewUser,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'username', desc: true },
  ])

  const table = useReactTable({
    data,
    columns: usersColumns(onViewUser),
    getRowId: (row) => row.uuid,

    state: {
      pagination,
      sorting,
    },

    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),

    columnResizeMode: 'onChange',

    onPaginationChange,
    onSortingChange: (updater) => {
      setSorting(updater)
      onPaginationChange((prev) => ({ ...prev, pageIndex: 0 }))
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={totalCount}
      isLoading={isLoading}
      tableLayout={{
        width: 'auto',
        columnsPinnable: true,
        columnsResizable: true,
      }}
    >
      <div className="flex flex-col gap-3">
        <DataGridContainer>
          <ScrollArea className="w-full overflow-x-auto">
            <div className="min-w-max">
              <DataGridTable />
            </div>
            <ScrollBar orientation="horizontal" className="mt-2" />
          </ScrollArea>
        </DataGridContainer>

        <DataGridPagination />
      </div>
    </DataGrid>
  )
}

export default UserTable
