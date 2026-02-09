import { ColumnDef, Row } from '@tanstack/react-table'
import { Check, Ellipsis } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TaxModel } from '@/features/tax/tax.type'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

type Props = {
  row: Row<TaxModel>
  onView: (taxuid: string) => void
}

export function TaxActionsCell({ row, onView }: Props) {
  const { copy } = useCopyToClipboard()
  const isActive = row.original.is_active

  const handleCopyId = async () => {
    const success = await copy(row.original.taxuid)

    if (!success) {
      toast.error('Failed to copy Tax ID')
      return
    }

    toast.custom(
      () => (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Tax ID copied: {row.original.taxuid}</AlertTitle>
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
        <DropdownMenuItem onClick={() => onView(row.original.taxuid)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={
            isActive
              ? 'text-destructive focus:text-destructive'
              : 'text-chart-2 focus:text-chart-2'
          }
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const taxListColumn = (
  onViewTax: (taxuid: string) => void,
): ColumnDef<TaxModel>[] => [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataGridColumnHeader title="Tax Title" column={column} />
    ),
    cell: ({ row }) => (
      <div className="space-y-px">
        <div className="font-medium text-foreground truncate">
          {row.original.title}
        </div>
        <div className="text-muted-foreground truncate text-sm">
          {row.original.taxuid}
        </div>
      </div>
    ),
  },
  {
    id: 'creator',
    header: ({ column }) => (
      <DataGridColumnHeader title="Created By" column={column} />
    ),
    cell: ({ row }) => {
      const creator = row.original.creator

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback>
              {creator.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-px">
            <div className="font-medium text-foreground truncate">
              {creator.username}
            </div>
            <div className="text-muted-foreground truncate text-sm">
              {creator.email}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataGridColumnHeader title="Status" column={column} />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('is_active')

      return isActive ? (
        <Badge variant="success" appearance="light">
          Active
        </Badge>
      ) : (
        <Badge variant="destructive" appearance="light">
          Inactive
        </Badge>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataGridColumnHeader title="Created At" column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('created_at'))

      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: () => null,
    cell: ({ row }) => (
      <TaxActionsCell row={row} onView={onViewTax} />
    ),
    size: 60,
    enableSorting: false,
    enableHiding: false,
  },
]
