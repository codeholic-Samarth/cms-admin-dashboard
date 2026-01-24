import { ColumnDef } from '@tanstack/react-table'

import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header'
import { BackendPermission } from '@/features/roles/roles.types'

export const permissionColumn = (): ColumnDef<BackendPermission>[] => [
  {
    id: 'index',
    header: '#',
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    size: 15,
  },
  {
    accessorKey: 'permission.permission',
    header: ({ column }) => <DataGridColumnHeader title="Permission Name" column={column} />,
    cell: (info) => info.getValue() as string,
    enableSorting: true,
  },
  {
    accessorKey: 'permission.type',
    header: ({ column }) => <DataGridColumnHeader title="Permission Type" column={column} />,
    cell: (info) => info.getValue() as string,
    enableSorting: true,
  },
  {
    accessorKey: 'permission.codename',
    header: ({ column }) => (
      <DataGridColumnHeader title="Permission Codename" column={column} />
    ),
    cell: (info) => info.getValue() as string,
    enableSorting: true,
  },
]
