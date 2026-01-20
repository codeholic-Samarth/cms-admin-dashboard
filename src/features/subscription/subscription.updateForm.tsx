import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { Controller, Resolver, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { parseAPIError } from '@/lib/parseApiError'

import { useSubscriptionFeatures, useUpdateSubscription } from './subscription.hook'
import {
  UpdateSubscriptionFormValues,
  updateSubscriptionSchema,
} from './subscription.schema'
import {
  SubscriptionDetailResponse,
  UpdateSubscriptionPayload,
} from './subscription.types'

type Props = {
  subData: SubscriptionDetailResponse
  onClose: () => void
}

const SubscriptionUpdateForm = ({ subData, onClose }: Props) => {
  const { data: featureData } = useSubscriptionFeatures()
  const [selectedFeature, setSelectedFeature] = useState<string>('')
  const { mutateAsync, isPending } = useUpdateSubscription()

  const form = useForm<UpdateSubscriptionFormValues>({
    resolver: zodResolver(
      updateSubscriptionSchema,
    ) as Resolver<UpdateSubscriptionFormValues>,
    defaultValues: {},
  })

  useEffect(() => {
    if (!subData) return

    form.reset({
      title: subData.title,
      description: subData.description,

      price_inr: subData.price_inr,
      sale_price_inr: subData.sale_price_inr,

      price_usd: subData.price_usd,
      sale_price_usd: subData.sale_price_usd,

      price_pond: subData.price_pond,
      sale_price_pond: subData.sale_price_pond,

      price_euro: subData.price_euro,
      sale_price_euro: subData.sale_price_euro,

      validity: subData.validity,

      features: subData.features.map((f) => ({
        feature_code: f.feature.feature_code,
        quantity: f.quantity,
      })),
    })
  }, [subData, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features',
  })

  const onSubmit = async (values: UpdateSubscriptionFormValues) => {
    const { features, ...rest } = values

    // Remove undefined fields
    const cleanedValues = Object.fromEntries(
      Object.entries(rest).filter(([_, value]) => value !== undefined),
    ) as Omit<UpdateSubscriptionPayload, 'suid' | 'features'>

    const payload: UpdateSubscriptionPayload = {
      suid: subData.suid,
      ...cleanedValues,
      ...(features && {
        features: features.map((f) => ({
          feature_code: f.feature_code,
          quantity: f.quantity,
        })),
      }),
    }

    await mutateAsync(payload, {
      onSuccess: (data) => {
        toast.success('Subscription updated successfully')
        form.reset({
          title: data.title,
          description: data.description,

          price_inr: data.price_inr,
          sale_price_inr: data.sale_price_inr,

          price_usd: data.price_usd,
          sale_price_usd: data.sale_price_usd,

          price_pond: data.price_pond,
          sale_price_pond: data.sale_price_pond,

          price_euro: data.price_euro,
          sale_price_euro: data.sale_price_euro,

          validity: data.validity,

          features: data.features.map((f) => ({
            feature_code: f.feature.feature_code,
            quantity: f.quantity,
          })),
        })
        onClose()
      },
      onError: (err) => {
        const msg = parseAPIError(err)
        toast.error(msg)
      }
    })
  }

  return (
    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input {...field} id="title" placeholder="Basic Plan" />
              )}
            />
            <FieldDescription>{form.formState.errors.title?.message}</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Short description about the plan"
                  className="resize-none min-h-[180px]"
                />
              )}
            />
            <FieldDescription>
              {form.formState.errors.description?.message}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pricing</h3>

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* INR */}
          <Field>
            <FieldLabel>Price (INR)</FieldLabel>
            <Controller
              control={form.control}
              name="price_inr"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          <Field>
            <FieldLabel>Sale Price (INR)</FieldLabel>
            <Controller
              control={form.control}
              name="sale_price_inr"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          {/* USD */}
          <Field>
            <FieldLabel>Price (USD)</FieldLabel>
            <Controller
              control={form.control}
              name="price_usd"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          <Field>
            <FieldLabel>Sale Price (USD)</FieldLabel>
            <Controller
              control={form.control}
              name="sale_price_usd"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          {/* EUR */}
          <Field>
            <FieldLabel>Price (EUR)</FieldLabel>
            <Controller
              control={form.control}
              name="price_euro"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          <Field>
            <FieldLabel>Sale Price (EUR)</FieldLabel>
            <Controller
              control={form.control}
              name="sale_price_euro"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          {/* GBP */}
          <Field>
            <FieldLabel>Price (GBP)</FieldLabel>
            <Controller
              control={form.control}
              name="price_pond"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>

          <Field>
            <FieldLabel>Sale Price (GBP)</FieldLabel>
            <Controller
              control={form.control}
              name="sale_price_pond"
              render={({ field }) => <Input {...field} type="number" placeholder="0" />}
            />
          </Field>
        </FieldGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Validity</h3>

        <FieldGroup>
          <Field>
            <FieldLabel>Validity (days)</FieldLabel>
            <Controller
              control={form.control}
              name="validity"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter number of days or -1 for unlimited"
                />
              )}
            />
          </Field>
        </FieldGroup>
      </div>

      <Separator />

      {/* ===============================
       * Features
       * =============================== */}
      <div className="space-y-4">
        {/* Add Feature */}

        <FieldGroup className="grid grid-cols-1 gap-4 ">
          <Field>
            <div className="space-y-1">
              <FieldLabel className="text-lg font-medium">Feature</FieldLabel>
              <FieldDescription>Select a feature to add it to the plan</FieldDescription>
            </div>

            <Select
              value={selectedFeature}
              onValueChange={(value) => {
                const alreadyAdded = fields.some((f) => f.feature_code === value)

                if (!alreadyAdded) {
                  append({ feature_code: value, quantity: -1 })
                }

                // reset select
                setSelectedFeature('')
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select feature" />
              </SelectTrigger>

              <SelectContent>
                {featureData?.map((feature) => (
                  <SelectItem
                    key={feature.feature_code}
                    value={feature.feature_code}
                    disabled={fields.some((f) => f.feature_code === feature.feature_code)}
                  >
                    {feature.feature_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        {/* Selected Features */}
        <div className="space-y-3">
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">No features added yet</p>
          )}

          {fields.map((field, index) => {
            const featureMeta = featureData?.find(
              (f) => f.feature_code === field.feature_code,
            )

            return (
              <div key={field.id}>
                {/* Remove */}
                <div className="flex items-end md:justify-end">
                  <Button
                    appearance={'ghost'}
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="text-destructive mb-1"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-2">
                  {/* Feature name */}
                  <div className="space-y-1">
                    <FieldLabel className="text-xs text-muted-foreground">
                      Feature
                    </FieldLabel>
                    <div className="text-sm font-medium">
                      {featureMeta?.feature_type ?? field.feature_code}
                    </div>
                  </div>

                  {/* Quantity */}
                  <Field className="md:col-span-1">
                    <FieldLabel className="text-xs text-muted-foreground">
                      Quantity (-1 = Unlimited)
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name={`features.${index}.quantity`}
                      render={({ field }) => (
                        <Input {...field} type="number" placeholder="-1" />
                      )}
                    />
                  </Field>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ===============================
       * Actions
       * =============================== */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
        <DrawerClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DrawerClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Subscription'}
        </Button>
      </div>
    </form>
  )
}

export default SubscriptionUpdateForm
