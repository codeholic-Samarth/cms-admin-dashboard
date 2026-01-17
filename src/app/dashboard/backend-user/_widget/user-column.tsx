'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Row } from '@tanstack/react-table'
import { Check, Ellipsis } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertTitle } from '@/components/ui/alert'
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
import { BackendUser } from '@/features/user/backendUsers/backendUser.types'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

type Props = {
  row: Row<BackendUser>
  onViewUser: (userId: string) => void
}

function UsersActionsCell({ row, onViewUser }: Props) {
  const { copy } = useCopyToClipboard()

  const handleCopyId = async () => {
    const success = await copy(row.original.uuid)

    if (!success) {
      toast.error('Failed to copy employee ID')
      return
    }

    toast.custom(
      () => (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Employee ID copied: {row.original.uuid}</AlertTitle>
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
        <DropdownMenuItem onClick={() => onViewUser(row.original.uuid)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const usersColumns = (
  onViewUser: (userId: string) => void,
): ColumnDef<BackendUser>[] => [
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataGridColumnHeader title="Username" column={column} />
    ),
    cell: ({ row }) => (
      <button
        className="font-medium text-primary hover:underline text-left cursor-pointer"
        onClick={() => onViewUser(row.original.uuid)}
      >
        {row.getValue('username')}
      </button>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataGridColumnHeader title="Email" column={column} />,
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'role.title',
    header: ({ column }) => <DataGridColumnHeader title="Role" column={column} />,
    cell: ({ row }) => <Badge variant="outline">{row.original.role?.title ?? '—'}</Badge>,
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('is_active')
      return (
        <Badge variant={isActive ? 'success' : 'destructive'} appearance={'outline'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'email_verified_at',
    header: ({ column }) => (
      <DataGridColumnHeader title="Email Verified" column={column} />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue('email_verified_at') ? 'Verified' : 'Not verified'}
      </span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataGridColumnHeader title="Joined At" column={column} />,
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
    cell: ({ row }) => <UsersActionsCell row={row} onViewUser={onViewUser} />,
    size: 60,
    enableSorting: false,
    enableHiding: false,
  },
]
