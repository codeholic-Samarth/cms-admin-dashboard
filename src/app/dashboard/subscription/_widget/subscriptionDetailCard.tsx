'use client'

import { Check, Copy, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SubscriptionDetailResponse } from '@/features/subscription/subscription.types'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

import { PriceRow } from './priceRow'

type Props = {
  subscription: SubscriptionDetailResponse
}

const SubscriptionDetailCard = ({ subscription }: Props) => {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* ===============================
         * Header
         * =============================== */}
        <div className="relative">
          <Button
            appearance="ghost"
            mode="icon"
            size="icon"
            variant="destructive"
            className="absolute right-0 top-0 h-9 w-9"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-none">
              {subscription.title}
            </h2>

            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                {subscription.suid}
              </p>

              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => copy(subscription.suid)}
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="flex gap-2 pt-1">
              <Badge variant="secondary">Subscription</Badge>
              <Badge
                variant={subscription.is_active ? 'success' : 'destructive'}
                appearance="outline"
              >
                {subscription.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>

        {/* ===============================
         * Tabs
         * =============================== */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          {/* ===============================
           * Overview
           * =============================== */}
          <TabsContent value="overview" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-y-6 text-sm">
              <div>
                <p className="text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(subscription.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Validity</p>
                <p className="font-medium">
                  {subscription.validity === -1
                    ? 'Unlimited'
                    : `${subscription.validity} days`}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Created By</p>
                <p className="font-medium">
                  {subscription.creator.username}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium truncate">
                  {subscription.creator.email}
                </p>
              </div>
            </div>

            {subscription.description && (
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm leading-relaxed">
                  {subscription.description}
                </p>
              </div>
            )}
          </TabsContent>

          {/* ===============================
           * Pricing
           * =============================== */}
          <TabsContent value="pricing" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <PriceRow
                label="INR"
                price={subscription.price_inr}
                sale={subscription.sale_price_inr}
              />
              <PriceRow
                label="USD"
                price={subscription.price_usd}
                sale={subscription.sale_price_usd}
              />
              <PriceRow
                label="EUR"
                price={subscription.price_euro}
                sale={subscription.sale_price_euro}
              />
              <PriceRow
                label="GBP"
                price={subscription.price_pond}
                sale={subscription.sale_price_pond}
              />
            </div>
          </TabsContent>

          {/* ===============================
           * Features
           * =============================== */}
          <TabsContent value="features" className="pt-4 space-y-3">
            {subscription.features.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No features added
              </p>
            )}

            {subscription.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {feature.feature.feature_type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {feature.feature.feature_code}
                  </p>
                </div>

                <Badge variant="outline">
                  {feature.quantity === -1
                    ? 'Unlimited'
                    : feature.quantity}
                </Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default SubscriptionDetailCard
