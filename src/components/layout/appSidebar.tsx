'use client'

import {
  AudioWaveform,
  Command,
  UserCog,
  GalleryVerticalEnd,
  PieChart,
  Users,
  LucideIcon,
} from 'lucide-react'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Actions, Subjects } from '@/lib/csal/csal'
import { useCan } from '@/lib/csal/useCan'

import { NavProjects } from './navProject'
import { NavUser } from './navUsers'


interface SidebarRoute {
  name: string;
  url: string;
  icon: LucideIcon;
  permission: {
    action: Actions;
    subject: Subjects;
  };
}

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
}

const projects: SidebarRoute[] = [
  {
    name: "Backend Users",
    url: "/dashboard/backend-user",
    icon: UserCog,
    permission: { action: "read", subject: "User" },
  },
  {
    name: "Subscription",
    url: "/dashboard/subscription",
    icon: PieChart,
    permission: { action: "read", subject: "Subscription" },
  },
  {
    name: "Frontend Users",
    url: "/dashboard/frontend-user",
    icon: Users,
    permission: { action: "read", subject: "User" },
  },
  {
    name: "Roles & Permission",
    url: "/dashboard/roles",
    icon: Users,
    permission: { action: "read", subject: "Role" },
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const ability = useCan()

  if (!ability) return null

  const allowedRoutes = projects.filter((route) =>
    ability.can(route.permission.action, route.permission.subject)
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-3 py-3">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Codeholic</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={allowedRoutes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
