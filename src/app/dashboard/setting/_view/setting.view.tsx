/* eslint-disable no-restricted-imports */
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthProfile } from '@/features/profile/profile.hook'

import { ChangePasswordCard } from '../_widget/generalCard'
import ProfileDetailCard from '../_widget/profileCard'

type TabKey = 'general' | 'account'

const SettingsPageView = () => {
  const { data, isError } = useAuthProfile()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const tabParam = searchParams.get('tab')
  const initialTab: TabKey = tabParam === 'account' ? 'account' : 'general'

  const [tab, setTab] = React.useState<TabKey>(initialTab)

  // Sync tab when URL changes (back/forward navigation)
  React.useEffect(() => {
    const next: TabKey = searchParams.get('tab') === 'account' ? 'account' : 'general'
    setTab(next)
  }, [searchParams])

  const handleTabChange = (value: string) => {
    const next: TabKey = value === 'account' ? 'account' : 'general'
    setTab(next)
    router.replace(`${pathname}?tab=${next}`)
  }

  // if (isLoading) return <SettingsSkeleton />
  if (isError) return <p className="text-sm text-destructive">Failed to load settings</p>
  if (!data) return null

  return (
    <div className="flex flex-col gap-6">
      {/* ===== Page Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, roles, and account status.
          </p>
        </div>

        {/* <AddUser /> */}
      </div>

      <Separator />

      {/* ===== Table Card ===== */}
      <div className="flex w-full max-w-7xl mx-auto flex-col gap-6">
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="pt-4">
            {/* <GeneralSettingsView /> */}
            <ChangePasswordCard />
          </TabsContent>

          <TabsContent value="account" className="pt-4">
            <ProfileDetailCard profile={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SettingsPageView
