import { ColumnDef, Row } from '@tanstack/react-table'
import { Check, Ellipsis } from 'lucide-react'
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
import { FrontendUser } from '@/features/user/frontendUser/frontendUser.type'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

type Props = {
  row: Row<FrontendUser>
  onViewSub: (usesuidrId: string) => void
}

function UsersActionsCell({ row, onViewSub }: Props) {
  const { copy } = useCopyToClipboard()
  const isActive = row.original.is_active

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
        <DropdownMenuItem onClick={() => onViewSub(row.original.uuid)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={
            isActive
              ? 'text-destructive focus:text-destructive'
              : 'text-chart-2 focus:text-chart-2'
          }
        >
          {isActive ? <>Deactivate</> : <>Activate</>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const frontendUserColumn = (
  onViewUser: (suid: string) => void,
): ColumnDef<FrontendUser>[] => [
  {
    accessorKey: 'username',
    header: ({ column }) => <DataGridColumnHeader title="Username" column={column} />,
    cell: ({ row }) => {
      return (
        <div className="flex items-start gap-3">
          <Avatar className="size-8">
            <AvatarFallback>{row.original.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-px">
            <div className="font-medium text-foreground truncate">
              {row.original.username}
            </div>
            <div className="text-muted-foreground truncate">{row.original.uuid}</div>
          </div>
        </div>
      )
    },
  },
  {
    id: 'subscription',
    header: ({ column }) => <DataGridColumnHeader title="Subscription Plan" column={column} />,
    cell: ({ row }) => {
      const subscription = row.original.subscription

      if (!subscription) {
        return (
          <Badge variant="outline" appearance={'light'}>
            N/A
          </Badge>
        )
      }

      return (
        <div className="font-medium text-foreground truncate">
          {row.original.subscription?.title}
        </div>
      )
    },
  },
  {
    accessorKey: 'email_verified_at',
    header: ({ column }) => <DataGridColumnHeader title="Email Varified" column={column} />,
    cell: ({ row }) => {
      const verified = row.getValue<string | null>('email_verified_at')

      return verified ? (
        <Badge className="gap-1" variant={"primary"} appearance={"light"}>
          Verified
        </Badge>
      ) : (
        <Badge variant="warning" className="gap-1" appearance={"light"}>
          Not Verified
        </Badge>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
    cell: ({ row }) => {
      const isActive = row.getValue<boolean>('is_active')

      return isActive ? (
        <Badge variant="success" appearance={"light"}>Active</Badge>
      ) : (
        <Badge variant="destructive" appearance={"light"}>Inactive</Badge>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => <DataGridColumnHeader title="Joined At" column={column} />,
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>('created_at'))

      return (
        <span className="text-sm text-muted-foreground">{date.toLocaleDateString()}</span>
      )
    },
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => null,
    cell: ({ row }) => <UsersActionsCell row={row} onViewSub={onViewUser} />,
    size: 60,
    enableSorting: false,
    enableHiding: false,
  },
]
