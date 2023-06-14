'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const newChallengeStep7FormSchema = z.object({
  name: z.string()
})

type NewChallengeStep7FormValues = z.infer<typeof newChallengeStep7FormSchema>

const defaultValues: Partial<NewChallengeStep7FormValues> = {
  name: 'My challenge'
}

type Props = {
  onNext: (formData: NewChallengeStep7FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep7Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<NewChallengeStep7FormValues>({
    resolver: zodResolver(newChallengeStep7FormSchema),
    defaultValues
  })

  async function onSubmit (formData: NewChallengeStep7FormValues) {
    setIsLoading(true)
    onNext(formData)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
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
