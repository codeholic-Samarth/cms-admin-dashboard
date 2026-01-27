import { ColumnDef, Row } from '@tanstack/react-table'
import { Check, Ellipsis, SquareMinus, SquarePlus } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BackendRole } from '@/features/roles/roles.types'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

import RolesPermissionTable from './roles-permission-table'

type Props = {
  row: Row<BackendRole>
  onViewRole: (ruid: string) => void
  onEditRole: (ruid: string) => void
}

function UsersActionsCell({ row, onViewRole, onEditRole }: Props) {
  const { copy } = useCopyToClipboard()

  const handleCopyId = async () => {
    const success = await copy(row.original.ruid)

    if (!success) {
      toast.error('Failed to copy employee ID')
      return
    }

    toast.custom(
      () => (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Subscription ID copied: {row.original.ruid}</AlertTitle>
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
        <DropdownMenuItem onClick={() => onViewRole(row.original.ruid)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditRole(row.original.ruid)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const RolesColumn = (
  onViewRole: (ruid: string) => void,
  onEditRole: (ruid: string) => void,
): ColumnDef<BackendRole>[] => {
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
        expandedContent: (role: BackendRole) => (
          <RolesPermissionTable permission={role.permissions} />
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
              <div className="text-muted-foreground truncate">{row.original.ruid}</div>
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
      accessorKey: 'created_at',
      header: ({ column }) => <DataGridColumnHeader title="Created At" column={column} />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.getValue<string>('created_at')).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => <DataGridColumnHeader title="Updated At" column={column} />,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.getValue<string>('updated_at')).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: () => null,
      cell: ({ row }) => (
        <UsersActionsCell row={row} onViewRole={onViewRole} onEditRole={onEditRole} />
      ),
      size: 60,
      enableSorting: false,
      enableHiding: false,
    },
  ]
}
