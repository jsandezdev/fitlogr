'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const newChallengeStep5FormSchema = z.object({
  includeDietLog: z.boolean(),
  monthlyCheatMeals: z.number()
})

type NewChallengeStep5FormValues = z.infer<typeof newChallengeStep5FormSchema>

const defaultValues: Partial<NewChallengeStep5FormValues> = {
  includeDietLog: false,
  monthlyCheatMeals: 4
}

type Props = {
  onNext: (formData: NewChallengeStep5FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep5Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeStep5FormValues>({
    resolver: zodResolver(newChallengeStep5FormSchema),
    defaultValues
  })

  async function onSubmit (formData: NewChallengeStep5FormValues) {
    setIsLoading(true)
    onNext(formData)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="includeDietLog"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  includeDietLog
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the mobile settings page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className={!form.getValues().includeDietLog ? 'hidden' : '' }>
          <FormField
            control={form.control}
            name="monthlyCheatMeals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>monthlyCheatMeals</FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
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
