'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { UnitOfTime } from '@/lib/config'
import { unitOfTimeSchema } from '@/lib/validations/unitOfTime.schema'

import { NewChallengeFormStepButtons } from './NewChallengeFormStepButtons'

const newChallengeStep2FormSchema = z.object({
  revisionFrequencyNumber: z.number(),
  revisionFrequencyUnitOfTime: unitOfTimeSchema,
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyParts: z.boolean()
})

type NewChallengeStep2FormValues = z.infer<typeof newChallengeStep2FormSchema>

const defaultValues: Partial<NewChallengeStep2FormValues> = {
  revisionFrequencyNumber: 1,
  revisionFrequencyUnitOfTime: UnitOfTime.Week,
  includeRevisionBodyWeight: false,
  includeRevisionBodyPhotos: false,
  includeRevisionBodyParts: false
}

type Props = {
  onNext: (formData: NewChallengeStep2FormValues) => void;
  onPrevious: () => void;
}

export const NewChallengeStep2Form = ({ onNext, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="includeRevisionBodyWeight"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                    includeRevisionBodyWeight
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeRevisionBodyPhotos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                    includeRevisionBodyPhotos
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeRevisionBodyParts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      includeRevisionBodyParts
                    </FormLabel>
                    <FormDescription>
                      Receive emails for friend requests, follows, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <NewChallengeFormStepButtons
          isLoading={isLoading}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  )
}
