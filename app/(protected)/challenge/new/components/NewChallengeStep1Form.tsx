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
import { cn } from '@/lib/utils'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const newChallengeStep1FormSchema = z.object({
  startDate: z.date(),
  endDate: z.date()
})

type NewChallengeStep1FormValues = z.infer<typeof newChallengeStep1FormSchema>

const defaultValues: Partial<NewChallengeStep1FormValues> = {
  startDate: new Date(),
  endDate: new Date()
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

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
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
                      date > new Date() || date < new Date('1900-01-01')
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
              <FormLabel>End date</FormLabel>
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

        <NewChallengeFormStepButtons
          isLoading={isLoading}
        />
      </form>
    </Form>
  )
}
