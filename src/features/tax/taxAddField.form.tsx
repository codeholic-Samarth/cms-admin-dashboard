import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { parseAPIError } from '@/lib/parseApiError'

import { useAddTaxField } from './tax.hook'
import { TaxFieldCreateFormValues, taxFieldCreateSchema } from './tax.schema'


type Props = {
  taxId: string
}

const TAX_VALUE_TYPES = [
  { label: 'Percentage', value: 0 },
  { label: 'Flat Amount', value: 1 },
]

export function TaxFieldCreateForm({ taxId }: Props) {
  const { mutateAsync, isPending } = useAddTaxField()

  const form = useForm<TaxFieldCreateFormValues>({
    resolver: zodResolver(taxFieldCreateSchema),
    defaultValues: {
      tax_id: taxId,
      title: '',
      value: 0,
      value_type: 1,
    },
  })

  const onSubmit = async (data: TaxFieldCreateFormValues) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.success('Tax field added successfully')
        form.reset({
          tax_id: taxId,
          title: '',
          value: 0,
          value_type: 1,
        })
        
      },
      onError: (err) => {
        toast.error(parseAPIError(err))
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* ===== Fields ===== */}
      <FieldGroup className='gap-3'>
        {/* ===== Title ===== */}
        <Field className='gap-2'>
          <FieldLabel>Title</FieldLabel>
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <Input {...field} placeholder="CGST / SGST / VAT" />
            )}
          />
          <FieldDescription>
            {form.formState.errors.title?.message}
          </FieldDescription>
        </Field>

        {/* ===== Value ===== */}
        <Field className='gap-2'>
          <FieldLabel>Value</FieldLabel>
          <Controller
            control={form.control}
            name="value"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="0"
                onChange={(e) =>
                  field.onChange(Number(e.target.value))
                }
              />
            )}
          />
          <FieldDescription>
            {form.formState.errors.value?.message}
          </FieldDescription>
        </Field>

        {/* ===== Value Type ===== */}
        <Field className='gap-2'>
          <FieldLabel>Value Type</FieldLabel>
          <Controller
            control={form.control}
            name="value_type"
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={(v) =>
                  field.onChange(Number(v))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TAX_VALUE_TYPES.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={String(type.value)}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldDescription>
            {form.formState.errors.value_type?.message}
          </FieldDescription>
        </Field>
      </FieldGroup>

      {/* ===== Actions ===== */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
        //   onClick={onClose}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Field'}
        </Button>
      </div>
    </form>
  )
}
