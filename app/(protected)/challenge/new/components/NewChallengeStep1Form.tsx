'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { UnitOfTime } from '@/lib/config'
import { cn } from '@/lib/utils'

import { useNewChallengeFormState } from '../hooks/useNewChallengeFormState'
import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const challengeDurations = [
  {
    id: '1m',
    label: '1 mes',
    unitOfTime: UnitOfTime.Month,
    amount: 1
  },
  {
    id: '2m',
    label: '2 meses',
    unitOfTime: UnitOfTime.Month,
    amount: 2
  },
  {
    id: '3m',
    label: '3 meses',
    unitOfTime: UnitOfTime.Month,
    amount: 3
  },
  {
    id: '4m',
    label: '4 meses',
    unitOfTime: UnitOfTime.Month,
    amount: 4
  },
  {
    id: '6m',
    label: '6 meses',
    unitOfTime: UnitOfTime.Month,
    amount: 6
  },
  {
    id: '1y',
    label: '1 año',
    unitOfTime: UnitOfTime.Year,
    amount: 1
  },
  {
    id: 'other',
    label: 'Otro',
    unitOfTime: null,
    amount: 0
  }
]

const newChallengeStep1FormSchema = z.object({
  // duration: challengeDurationSchema,
  durationId: z.string(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable()
}).superRefine((values, ctx) => {
  if (values.durationId === 'other') {
    if (!values.startDate) {
      ctx.addIssue({
        message: 'Campo obligatorio',
        code: z.ZodIssueCode.custom,
        path: ['startDate']
      })
    }
    if (!values.endDate) {
      ctx.addIssue({
        message: 'Campo obligatorio',
        code: z.ZodIssueCode.custom,
        path: ['endDate']
      })
    }
    if (values.startDate && values.endDate && values.startDate >= values.endDate) {
      ctx.addIssue({
        message: 'Debe ser mayor que la fecha de inicio',
        code: z.ZodIssueCode.custom,
        path: ['endDate']
      })
    }
  }
  return true
})

type NewChallengeStep1FormValues = z.infer<typeof newChallengeStep1FormSchema>

type Props = {
  onNext: (formData: NewChallengeStep1FormValues) => void;
}

export const NewChallengeStep1Form = ({ onNext }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showOtherDuration, setShowOtherDuration] = useState<boolean>(false)
  const [newChallengeData, setNewChallengeData] = useNewChallengeFormState()

  const defaultValues = {
    startDate: newChallengeData.startDate || null,
    endDate: newChallengeData.endDate || null
  }

  if (newChallengeData.durationId) defaultValues.durationId = newChallengeData.durationId

  const form = useForm<NewChallengeStep1FormValues>({
    resolver: zodResolver(newChallengeStep1FormSchema),
    defaultValues
  })

  useEffect(() => {
    // To prevent hydration problems with date inputs as defaultValues
    if (!form.getValues().startDate) form.setValue('startDate', new Date())
  }, [])

  async function onSubmit (formData: NewChallengeStep1FormValues) {
    setIsLoading(true)
    onNext(formData)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* <div>
          <p>Form values:</p>
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
        </div>

        <div>
          <p>Form Errors:</p>
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        </div> */}

        <FormField
          control={form.control}
          name="durationId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setShowOtherDuration(value === 'other')
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
                  { challengeDurations.map((d) => (
                    <SelectItem key={`duration_${d.id}`} value={d.id}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={`flex flex-row gap-2 ${showOtherDuration ? '' : 'hidden'}`}>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Desde</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? (
                            format(field.value, 'dd/MM/yyyy')
                          )
                          : (
                            <span>Selecciona una fecha</span>
                          )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      weekStartsOn={1}
                      mode="single"
                      selected={field.value !== null ? field.value : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Hasta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? (
                            format(field.value, 'dd/MM/yyyy')
                          )
                          : (
                            <span>Selecciona una fecha</span>
                          )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      weekStartsOn={1}
                      mode="single"
                      selected={field.value !== null ? field.value : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <NewChallengeFormStepButtons
          isLoading={isLoading}
        />
      </form>
    </Form>
  )
}
