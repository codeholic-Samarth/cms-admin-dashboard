import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'

import { DataGrid, DataGridContainer } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { BackendRole } from '@/features/roles/roles.types'

import { RolesColumn } from './roles-column'

type Props = {
  data: BackendRole[]
  recordCount: number
  pagination: PaginationState
  onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>
  isLoading?: boolean
  onViewRole: (ruid: string) => void
  onEditSub: (suid: string) => void
}

const RolesTable = ({
  data,
  recordCount,
  pagination,
  onPaginationChange,
  isLoading,
  onViewRole,
  onEditSub,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [expandedRows, setExpandedRows] = useState({})

  const columns = useMemo(
    () => RolesColumn(onViewRole, onEditSub),
    [onViewRole, onEditSub],
  )

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.ruid,
    getRowCanExpand: (row) => Boolean(row.original.permissions?.length),
    state: {
      sorting,
      pagination,
      expanded: expandedRows,
    },
    manualPagination: true,
    pageCount: Math.ceil(recordCount / pagination.pageSize),
    onPaginationChange,
    onSortingChange: setSorting,
    onExpandedChange: setExpandedRows,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <DataGrid
      table={table}
      recordCount={recordCount}
      isLoading={isLoading}
      tableLayout={{
        width: 'auto',
        columnsPinnable: true,
        columnsVisibility: true,
      }}
    >
      <div className="flex flex-col gap-3">
        <DataGridContainer>
          <ScrollArea className="w-full overflow-x-auto">
            <div>
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

export default RolesTable
