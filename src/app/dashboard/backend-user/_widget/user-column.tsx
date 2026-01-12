'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Row } from '@tanstack/react-table'
import { Check, Ellipsis } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
}

function UsersActionsCell({ row }: Props) {
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const usersColumns: ColumnDef<BackendUser>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => <div className="font-medium">{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'role.title',
    header: 'Role',
    cell: ({ row }) => <Badge variant="outline">{row.original.role?.title ?? '—'}</Badge>,
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('is_active')
      return (
        <Badge variant={isActive ? 'success' : 'destructive'} appearance={"outline"}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'email_verified_at',
    header: 'Email Verified',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue('email_verified_at') ? 'Verified' : 'Not verified'}
      </span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.getValue<string>('created_at')).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => <UsersActionsCell row={row} />,
    size: 60,
    enableSorting: false,
    enableHiding: false,
  },
]
