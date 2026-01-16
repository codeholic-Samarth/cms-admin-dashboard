import { ColumnDef } from '@tanstack/react-table'

import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { SubscriptionFeature } from '@/features/subscription/subscription.types'

export const subFeatureColumn = (): ColumnDef<SubscriptionFeature>[] => [
  {
    id: 'index',
    header: '#',
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    size: 25,
  },
  {
    accessorKey: 'feature.feature_type',
    header: ({ column }) => <DataGridColumnHeader title="Feature" column={column} />,
    cell: (info) => info.getValue() as string,
    enableSorting: true,
  },
  {
    accessorKey: 'feature.feature_code',
    header: ({ column }) => <DataGridColumnHeader title="Feature Code" column={column} />,
    cell: (info) => info.getValue() as string,
    enableSorting: true,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataGridColumnHeader title="Quantity" column={column} />
    ),
    cell: ({ row }) => {
      const quantity = row.original.quantity
      return quantity === -1 ? 'Unlimited' : quantity
    },
    enableSorting: true,
  },
]
