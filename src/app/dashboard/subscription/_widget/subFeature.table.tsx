"use client"

import { getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'

import { DataGrid, DataGridContainer } from '@/components/ui/data-grid';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { SubscriptionFeature } from '@/features/subscription/subscription.types';

import { subFeatureColumn } from './subFeature.column';

const SubFeatureTable = ({ features }: {features: SubscriptionFeature[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: features,
        columns: subFeatureColumn(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: (_row, index) => String(index)
    })

  return (
    <div className="dark:bg-muted/30 p-4">
      <DataGrid
        table={table}
        recordCount={features?.length}
        tableLayout={{
          cellBorder: true,
          rowBorder: true,
          headerBackground: true,
          headerBorder: true,
        }}
      >
        <div className="w-full space-y-2.5">
          <div className="dark:bg-card rounded-lg">
            <DataGridContainer>
              <ScrollArea>
                <DataGridTable />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </DataGridContainer>
          </div>
          {/* <DataGridPagination className="pb-1.5" /> */}
        </div>
      </DataGrid>
    </div>
  )
}

export default SubFeatureTable
