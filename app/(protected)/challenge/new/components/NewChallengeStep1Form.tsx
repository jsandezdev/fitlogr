'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
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
import { challengeDurationSchema } from '@/lib/validations/challengeDuration.schema'

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
  duration: challengeDurationSchema,
  startDate: z.date(),
  endDate: z.date()
})

type NewChallengeStep1FormValues = z.infer<typeof newChallengeStep1FormSchema>

const startDate = new Date()
const endDate = new Date()
endDate.setFullYear(startDate.getFullYear() + 1)

const defaultValues: Partial<NewChallengeStep1FormValues> = {
  duration: challengeDurations[0],
  startDate,
  endDate
}

type Props = {
  onNext: (formData: NewChallengeStep1FormValues) => void;
}

export const NewChallengeStep1Form = ({ onNext }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeStep1FormValues>({
    resolver: zodResolver(newChallengeStep1FormSchema),
    defaultValues
  })

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
          name="duration.id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duración</FormLabel>
              <Select
                onValueChange={field.onChange}
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

        <div className={`flex flex-row gap-2 ${form.getValues().duration?.id === 'other' ? '' : 'hidden'}`}>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Desde</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? (
                            format(field.value, 'PPP')
                          )
                          : (
                            <span>Pick a date</span>
                          )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
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
              <FormItem className="flex flex-col">
                <FormLabel>Hasta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? (
                            format(field.value, 'PPP')
                          )
                          : (
                            <span>Pick a date</span>
                          )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
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
