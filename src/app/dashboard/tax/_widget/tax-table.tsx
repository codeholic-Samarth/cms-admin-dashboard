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
import { TaxModel } from '@/features/tax/tax.type'

import { taxListColumn } from './tax-column'

type Props = {
  data: TaxModel[]
  totalCount: number
  pagination: PaginationState
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>
  isLoading?: boolean
  onViewTax: (userId: string) => void
}

const TaxTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  isLoading,
  onViewTax,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(() => taxListColumn(onViewTax), [onViewTax])

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.taxuid,
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

export default TaxTable
