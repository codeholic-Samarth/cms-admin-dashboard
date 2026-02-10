import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  countries,
  getCountryName,
  getStateName,
  getStatesByCountry,
} from '@/lib/getCountryState'
import { parseAPIError } from '@/lib/parseApiError'

import { useAddTaxRegion } from './tax.hook'
import { TaxRegionCreateFormValues, taxRegionCreateSchema } from './tax.schema'

type Props = {
  taxId: string
}

export function TaxRegionCreateForm({ taxId }: Props) {
  const { mutateAsync, isPending } = useAddTaxRegion()

  const form = useForm<TaxRegionCreateFormValues>({
    resolver: zodResolver(taxRegionCreateSchema),
    defaultValues: {
      tax_id: taxId,
      country: '',
      state: '',
    },
  })

  const selectedCountry = form.watch('country')

  const states = useMemo(() => {
    if (!selectedCountry) return []
    return getStatesByCountry(selectedCountry)
  }, [selectedCountry])

  const onSubmit = async (data: TaxRegionCreateFormValues) => {
    const payload = {
      tax_id: data.tax_id,
      country: getCountryName(data.country),
      state: getStateName(data.country, data.state),
    }

    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Region added successfully')
        form.reset({ tax_id: taxId, country: '', state: '' })
      },
      onError: (err) => {
        toast.error(parseAPIError(err))
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* ===== Region ===== */}
      <div className="mt-4">
        <FieldGroup className='gap-3'>
          {/* ===== Country ===== */}
          <Field className='gap-2'>
            <FieldLabel>Country</FieldLabel>
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    form.setValue('state', '')
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" sideOffset={4}>
                    {countries.map((country) => (
                      <SelectItem
                        key={country.isoCode}
                        value={country.isoCode}
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldDescription>
              {form.formState.errors.country?.message}
            </FieldDescription>
          </Field>

          {/* ===== State ===== */}
          <Field className='gap-2'>
            <FieldLabel>State</FieldLabel>
            <Controller
              control={form.control}
              name="state"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedCountry
                          ? 'Select state'
                          : 'Select country first'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" sideOffset={4}>
                    {states.map((state) => (
                      <SelectItem
                        key={state.isoCode}
                        value={state.isoCode}
                      >
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldDescription>
              {form.formState.errors.state?.message}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </div>

      {/* ===== Actions ===== */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          // onClick={onClose}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Region'}
        </Button>
      </div>
    </form>
  )
}
