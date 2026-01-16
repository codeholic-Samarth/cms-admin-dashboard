'use client'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { DataGrid, DataGridContainer } from '@/components/ui/data-grid'
import { DataGridPagination } from '@/components/ui/data-grid-pagination'
import { DataGridTable } from '@/components/ui/data-grid-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Currency, SubscriptionDetailResponse } from '@/features/subscription/subscription.types'

import { subscriptionColumn } from './subscription.column'

type Props = {
  data: SubscriptionDetailResponse[]
  recordCount: number
  pagination: PaginationState
  onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>
  isLoading?: boolean
  currency: Currency
}

const SubscriptionTable = ({
  data,
  recordCount,
  pagination,
  onPaginationChange,
  isLoading,
  currency,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [expandedRows, setExpandedRows] = useState({})

  const columns = useMemo(
  () => subscriptionColumn(currency),
  [currency]
)

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.suid,
    getRowCanExpand: (row) => Boolean(row.original.features?.length),
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
            <div >
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

export default SubscriptionTable
