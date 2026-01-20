import { ColumnDef, Row } from '@tanstack/react-table'
import { Check, Ellipsis, SquareMinus, SquarePlus } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Currency,
  SubscriptionDetailResponse,
} from '@/features/subscription/subscription.types'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { priceFieldMap } from '@/lib/priceFields'

import SubFeatureTable from './subFeature.table'

type Props = {
  row: Row<SubscriptionDetailResponse>
  onViewSub: (usesuidrId: string) => void
  onEditSub: (suid: string) => void
  onToggleSub: (suid: string, isActive: boolean) => void
}

function UsersActionsCell({ row, onViewSub, onEditSub, onToggleSub }: Props) {
  const { copy } = useCopyToClipboard()
  const isActive = row.original.is_active

  const handleCopyId = async () => {
    const success = await copy(row.original.suid)

    if (!success) {
      toast.error('Failed to copy employee ID')
      return
    }

    toast.custom(
      () => (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Subscription ID copied: {row.original.suid}</AlertTitle>
        </Alert>
      ),
      { position: 'top-center' },
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" variant="ghost">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => onViewSub(row.original.suid)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditSub(row.original.suid)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onToggleSub(row.original.suid, isActive)}
          className={
            isActive
              ? 'text-destructive focus:text-destructive'
              : 'text-chart-2 focus:text-chart-2'
          }
        >
          {isActive ? (
            <>
              Deactivate
            </>
          ) : (
            <>
              Activate
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const subscriptionColumn = (
  currency: Currency,
  onViewUser: (suid: string) => void,
  onEditSub: (suid: string) => void,
  onToggleSub: (suid: string, isActive: boolean) => void,
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
    {
      id: 'actions',
      accessorKey: 'actions',
      header: () => null,
      cell: ({ row }) => (
        <UsersActionsCell
          row={row}
          onViewSub={onViewUser}
          onEditSub={onEditSub}
          onToggleSub={onToggleSub}
        />
      ),
      size: 60,
      enableSorting: false,
      enableHiding: false,
    },
  ]
}
