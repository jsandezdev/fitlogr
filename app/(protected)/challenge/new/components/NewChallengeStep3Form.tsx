'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { WeekDay } from '@/lib/config'
import { weekDaySchema } from '@/lib/validations/weekDay.schema'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const newChallengeStep3FormSchema = z.object({
  weeklyTrainingDays: z.array(weekDaySchema).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.'
  })
})

type NewChallengeStep3FormValues = z.infer<typeof newChallengeStep3FormSchema>

const defaultValues: Partial<NewChallengeStep3FormValues> = {
  weeklyTrainingDays: []
}

type Props = {
  onNext: (formData: NewChallengeStep3FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep3Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeStep3FormValues>({
    resolver: zodResolver(newChallengeStep3FormSchema),
    defaultValues
  })

  async function onSubmit (formData: NewChallengeStep3FormValues) {
    setIsLoading(true)
    onNext(formData)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="weeklyTrainingDays"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Training days</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              { (Object.keys(WeekDay) as Array<WeekDay>).map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="weeklyTrainingDays"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item}
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
