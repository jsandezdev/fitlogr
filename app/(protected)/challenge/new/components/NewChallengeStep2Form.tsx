'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UnitOfTime } from '@/lib/config'
import { unitOfTimeSchema } from '@/lib/validations/unitOfTime.schema'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const revisionFrequencies = [
  {
    id: '1w',
    label: 'Cada semana',
    unitOfTime: UnitOfTime.Week,
    amount: 1
  },
  {
    id: '2w',
    label: 'Cada 2 semanas',
    unitOfTime: UnitOfTime.Week,
    amount: 2
  },
  {
    id: '1m',
    label: 'Una vez al mes',
    unitOfTime: UnitOfTime.Month,
    amount: 1
  },
  {
    id: 'other',
    label: 'Otro',
    unitOfTime: null,
    amount: 0
  }
]

const newChallengeStep2FormSchema = z.object({
  revisionFrequencyId: z.string(),
  revisionFrequencyNumber: z.number().nullable(),
  revisionFrequencyUnitOfTime: unitOfTimeSchema.nullable()
}).superRefine((values, ctx) => {
  if (values.revisionFrequencyId === 'other') {
    if (!values.revisionFrequencyNumber) {
      ctx.addIssue({
        message: 'Campo obligatorio',
        code: z.ZodIssueCode.custom,
        path: ['revisionFrequencyNumber']
      })
    }
    if (!values.revisionFrequencyUnitOfTime) {
      ctx.addIssue({
        message: 'Campo obligatorio',
        code: z.ZodIssueCode.custom,
        path: ['revisionFrequencyUnitOfTime']
      })
    }
  }
  return true
})

type NewChallengeStep2FormValues = z.infer<typeof newChallengeStep2FormSchema>

const defaultValues: Partial<NewChallengeStep2FormValues> = {
  revisionFrequencyNumber: 1,
  revisionFrequencyUnitOfTime: UnitOfTime.Week
}

type Props = {
  onNext: (formData: NewChallengeStep2FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep2Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showOtherRevisionFrequency, setShowOtherRevisionFrequency] = useState<boolean>(false)

  const form = useForm<NewChallengeStep2FormValues>({
    resolver: zodResolver(newChallengeStep2FormSchema),
    defaultValues
  })

  async function onSubmit (formData: NewChallengeStep2FormValues) {
    setIsLoading(true)
    onNext(formData)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="revisionFrequencyId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setShowOtherRevisionFrequency(value === 'other')
                  if (value !== 'other') {
                    form.handleSubmit(onSubmit)()
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona uno..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  { revisionFrequencies.map((d) => (
                    <SelectItem key={`revision_frequency_${d.id}`} value={d.id}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={`flex flex-row gap-2 ${showOtherRevisionFrequency ? '' : 'hidden'}`}>
          <FormField
            control={form.control}
            name="revisionFrequencyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>revisionFrequencyNumber</FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="revisionFrequencyUnitOfTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>revisionFrequencyUnitOfTime</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { (Object.keys(UnitOfTime) as Array<UnitOfTime>).map((unitOfTime, index) => <SelectItem key={`revisionFrequencyUnitOfTime_${unitOfTime}`} value={unitOfTime}>{unitOfTime}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  )
}
