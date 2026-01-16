import { ColumnDef } from '@tanstack/react-table'
import { SquareMinus, SquarePlus } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import {
  Currency,
  SubscriptionDetailResponse,
} from '@/features/subscription/subscription.types'
import { priceFieldMap } from '@/lib/priceFields'

import SubFeatureTable from './subFeature.table'

export const subscriptionColumn = (
  currency: Currency,
): ColumnDef<SubscriptionDetailResponse>[] => {
  const { price, sale, symbol } = priceFieldMap[currency]
  
  return [
  {
    id: 'expand',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          onClick={row.getToggleExpandedHandler()}
          mode="icon"
          size="sm"
          variant="ghost"
        >
          {row.getIsExpanded() ? <SquareMinus /> : <SquarePlus />}
        </Button>
      ) : null
    },
    size: 25,
    enableResizing: false,
    meta: {
      expandedContent: (row: SubscriptionDetailResponse) => (
        <SubFeatureTable features={row.features} />
      ),
    },
  },
  {
    accessorKey: 'title',
    id: 'title',
    header: ({ column }) => <DataGridColumnHeader title="Title" column={column} />,
    cell: ({ row }) => {
      return (
        <div className="">
          <div className="space-y-px">
            <div className="font-medium text-foreground">{row.original.title}</div>
            <div className="text-muted-foreground truncate">{row.original.suid}</div>
          </div>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'creator',
    id: 'creator',
    header: ({ column }) => <DataGridColumnHeader title="Creator" column={column} />,
    cell: ({ row }) => {
      return (
        <div className="flex items-start gap-3">
          <Avatar className="size-8">
            <AvatarFallback>{row.original.creator.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-px">
            <div className="font-medium text-foreground truncate">
              {row.original.creator.username}
            </div>
            <div className="text-muted-foreground truncate">
              {row.original.creator.email}
            </div>
          </div>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'price',
    header: ({ column }) => (
      <DataGridColumnHeader title={`Price (${currency})`} column={column} />
    ),
    cell: ({ row }) => (
      <>
        {symbol}
        {row.original[price as keyof SubscriptionDetailResponse]}
      </>
    ),
  },
   {
      id: 'sale_price',
      header: ({ column }) => (
        <DataGridColumnHeader title={`Sale Price (${currency})`} column={column} />
      ),
      cell: ({ row }) => (
        <>
          {symbol}
          {row.original[sale as keyof SubscriptionDetailResponse]}
        </>
      ),
    },
  {
    accessorKey: 'is_active',
    id: 'status',
    header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
    cell: ({ row }) => {
      const isActive = row.original.is_active

      return (
        <Badge variant={isActive ? 'success' : 'destructive'} appearance="light">
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'validity',
    id: 'validity',
    header: ({ column }) => <DataGridColumnHeader title="Validity" column={column} />,
    cell: ({ row }) => {
      const validity = row.original.validity

      if (validity === -1) {
        return <span className="font-medium text-primary">Unlimited</span>
      }

      return (
        <span>
          {validity} {validity === 1 ? 'day' : 'days'}
        </span>
      )
    },
    enableSorting: true,
    enableHiding: true,
    size: 120,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataGridColumnHeader title="Created At" column={column} />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.getValue<string>('created_at')).toLocaleDateString()}
      </span>
    ),
  },
]
}
