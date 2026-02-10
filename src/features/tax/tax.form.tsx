import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { countries, getCountryName, getStateName, getStatesByCountry } from '@/lib/getCountryState'
import { parseAPIError } from '@/lib/parseApiError'

import { useCreateTaxModel } from './tax.hook'
import { taxCreateSchema, TaxCreateFormValues } from './tax.schema'

type Props = {
  onClose: () => void
}

const TAX_VALUE_TYPES = [
  { label: 'Percentage', value: 0 },
  { label: 'Flat Amount', value: 1 },
]

export function TaxCreateForm({ onClose }: Props) {
  const { mutateAsync, isPending } = useCreateTaxModel()

  const form = useForm<TaxCreateFormValues>({
    resolver: zodResolver(taxCreateSchema),
    defaultValues: {
      title: '',
      regions: [{ country: '', state: '' }],
      fields: [
        {
          title: '',
          value: 0,
          value_type: 1,
        },
      ],
    },
  })

  const {
    fields: taxFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'fields',
  })

  const selectedCountry = form.watch('regions.0.country')

  const states = useMemo(() => {
    if (!selectedCountry) return []
    return getStatesByCountry(selectedCountry)
  }, [selectedCountry])

const onSubmit = async (data: TaxCreateFormValues) => {
  const payload = {
    title: data.title,

    regions: data.regions.map(region => ({
      country: getCountryName(region.country),
      state: getStateName(region.country, region.state),
    })),

    fields: data.fields,
  }

  await mutateAsync(payload, {
    onSuccess: () => {
      toast.success('Tax created successfully')
      form.reset()
      onClose()
    },
    onError: (err) => {
      const msg = parseAPIError(err)
      toast.error(msg)
    },
  })
}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* ===== Basic Information ===== */}
      <div className="space-y-4 h-full">
        <h3 className="text-lg font-medium">Basic Information</h3>

        <FieldGroup>
          {/* ===== Tax Title ===== */}
          <Field>
            <FieldLabel htmlFor="title">Tax Title</FieldLabel>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input {...field} id="title" placeholder="GST / VAT / Sales Tax" />
              )}
            />
            <FieldDescription>{form.formState.errors.title?.message}</FieldDescription>
          </Field>
        </FieldGroup>
      </div>

      {/* ===== Region ===== */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Region</h3>

        <FieldGroup>
          {/* ===== Country ===== */}
          <Field>
            <FieldLabel>Country</FieldLabel>
            <Controller
              control={form.control}
              name="regions.0.country"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    // reset state when country changes
                    form.setValue('regions.0.state', '')
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" sideOffset={4} align="end">
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldDescription>
              {form.formState.errors.regions?.[0]?.country?.message}
            </FieldDescription>
          </Field>

          {/* ===== State (dependent) ===== */}
          <Field>
            <FieldLabel>State</FieldLabel>
            <Controller
              control={form.control}
              name="regions.0.state"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedCountry ? 'Select state' : 'Select country first'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" sideOffset={4} align="end">
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldDescription>
              {form.formState.errors.regions?.[0]?.state?.message}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </div>

      {/* ===== Tax Fields ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Tax Fields</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                title: '',
                value: 0,
                value_type: 1,
              })
            }
          >
            Add Field
          </Button>
        </div>

        {taxFields.map((item, index) => (
          <div key={item.id} className="rounded-lg border p-4 space-y-4">
            <FieldGroup>
              {/* ===== Field Title ===== */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel>Title</FieldLabel>
                  {taxFields.length !== 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      mode="icon"
                      size="sm"
                      className="w-fit px-2 bg-destructive/10 text-destructive cursor-pointer hover:bg-destructive/20"
                      onClick={() => remove(index)}
                      disabled={taxFields.length === 1}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
                <Controller
                  control={form.control}
                  name={`fields.${index}.title`}
                  render={({ field }) => <Input {...field} placeholder="CGST / SGST" />}
                />
                <FieldDescription>
                  {form.formState.errors.fields?.[index]?.title?.message}
                </FieldDescription>
              </Field>

              {/* ===== Field Value ===== */}
              <Field>
                <FieldLabel>Value</FieldLabel>
                <Controller
                  control={form.control}
                  name={`fields.${index}.value`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
                <FieldDescription>
                  {form.formState.errors.fields?.[index]?.value?.message}
                </FieldDescription>
              </Field>

              {/* ===== Value Type ===== */}
              <Field>
                <FieldLabel>Value Type</FieldLabel>
                <Controller
                  control={form.control}
                  name={`fields.${index}.value_type`}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TAX_VALUE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={String(type.value)}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldDescription>
                  {form.formState.errors.fields?.[index]?.value_type?.message}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        ))}
      </div>

      {/* ===== Submit ===== */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Tax'}
        </Button>
      </div>
    </form>
  )
}
