import { Check, Copy, Trash2 } from 'lucide-react'
import React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TaxModelDetail } from '@/features/tax/tax.type'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

import TaxSetting from './taxSetting'

type Props = {
  tax: TaxModelDetail
  onDelete?: (tax: TaxModelDetail) => void
}

const TaxModalDetailCard = ({ tax, onDelete }: Props) => {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Card className="w-full max-w-full mx-auto rounded-2xl shadow-sm py-0">
      <CardContent className="py-6 px-0 h-[70%]">
        {/* ===== Header ===== */}
        <div className="relative px-5">
          {onDelete && (
            <Button
              appearance="ghost"
              mode="icon"
              size="icon"
              variant="destructive"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => onDelete(tax)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{tax.title.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-base font-semibold leading-none">{tax.title}</h2>

              <div className="flex items-center gap-1">
                <p className="text-xs text-muted-foreground truncate max-w-[180px] sm:max-w-[260px]">
                  {tax.taxuid}
                </p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => copy(tax.taxuid)}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-chart-2" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge
                  variant={tax.is_active ? 'success' : 'destructive'}
                  appearance="outline"
                >
                  {tax.is_active ? 'Active' : 'Inactive'}
                </Badge>

                {tax.is_deleted && (
                  <Badge variant="destructive" appearance="outline">
                    Deleted
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <Tabs defaultValue="overview" className="w-full h-full">

          <div className='px-5 mt-5'>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger> 
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="setting">Setting</TabsTrigger>
          </TabsList>
          </div>

          {/* ===== Overview ===== */}
          <TabsContent value="overview" className="pt-4 space-y-4 px-5">
            <div className="grid grid-cols-2 gap-y-8 text-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">Created By</p>
                <div>
                <p className="font-medium truncate">{tax.creator.username}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {tax.creator.email}
                </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Creator ID</p>
                <p className="font-medium truncate">{tax.creator.uuid}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(tax.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Updated At</p>
                <p className="font-medium">
                  {new Date(tax.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
                <Separator />

            <div className='space-y-4'>
              <div className='space-y-1'>
                <h3 className='text-md font-medium'>Regions</h3>
                <p className='text-sm text-muted-foreground'>These are the selected regions where this tax modal get applied.</p>
              </div>
            {tax.regions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No regions assigned</p>
            ) : (
              <div className="space-y-2 mt-2">
                {tax.regions.map((region) => (
                  <div
                    key={region.txruid}
                    className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{region.country}</p>
                      <p className="text-muted-foreground">
                        {region.state || 'All states'}
                      </p>
                    </div>
                    <Badge variant="outline">Region</Badge>
                  </div>
                ))}
              </div>
            )}
            </div>
          </TabsContent>

          {/* ===== Fields ===== */}
          <TabsContent value="fields" className="pt-4 space-y-3 px-5">
            {tax.fields.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tax fields defined</p>
            ) : (
              <div className="space-y-2">
                {tax.fields.map((field) => (
                  <div
                    key={field.txfuid}
                    className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{field.title}</p>
                      <p className="text-muted-foreground">Value: {field.value}</p>
                    </div>
                    <Badge variant="secondary" appearance="light">
                      Type {field.value_type}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

            {/* ======= Setting ======== */}
          <TabsContent value="setting" className="pt-4 flex-1 overflow-y-auto">
            <TaxSetting taxId={tax.taxuid} />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  )
}

export default TaxModalDetailCard
