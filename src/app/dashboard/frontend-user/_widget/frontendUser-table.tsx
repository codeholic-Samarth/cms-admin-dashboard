import {
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { DataGrid, DataGridContainer } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { FrontendUser } from '@/features/user/frontendUser/frontendUser.type'

import { frontendUserColumn } from './frontendUser-column'

type Props = {
  data: FrontendUser[]
  totalCount: number
  pagination: PaginationState
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>
  isLoading?: boolean
  onViewUser: (userId: string) => void
}

const FrontendUserTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  isLoading,
  onViewUser,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'username', desc: true }])

  const columns = useMemo(() => frontendUserColumn(onViewUser), [onViewUser])

  const table = useReactTable({
    data,
    columns,
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

export default FrontendUserTable
