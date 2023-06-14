'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { WeekDay } from '@/lib/config'
import { weekDaySchema } from '@/lib/validations/weekDay.schema'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const weekDays = [
  { id: WeekDay.Monday, title: 'Lunes' },
  { id: WeekDay.Tuesday, title: 'Martes' },
  { id: WeekDay.Wednesday, title: 'Miércoles' },
  { id: WeekDay.Thursday, title: 'Jueves' },
  { id: WeekDay.Friday, title: 'Viernes' },
  { id: WeekDay.Saturday, title: 'Sábado' },
  { id: WeekDay.Sunday, title: 'Domingo' }
]

const newChallengeStep4FormSchema = z.object({
  weeklyTrainingDays: z.array(weekDaySchema).refine((value) => value.some((item) => item), {
    message: 'Tienes que seleccionar almenos uno.'
  })
})

type NewChallengeStep4FormValues = z.infer<typeof newChallengeStep4FormSchema>

const defaultValues: Partial<NewChallengeStep4FormValues> = {
  weeklyTrainingDays: []
}

type Props = {
  onNext: (formData: NewChallengeStep4FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep4Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeStep4FormValues>({
    resolver: zodResolver(newChallengeStep4FormSchema),
    defaultValues
  })

  async function onSubmit (formData: NewChallengeStep4FormValues) {
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
          name="weeklyTrainingDays"
          render={() => (
            <FormItem>
              { weekDays.map((item) => (
                <FormField
                  key={`weekdays_${item.id}`}
                  control={form.control}
                  name="weeklyTrainingDays"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={`weekday_${item.id}`}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  )
}
